import { adminDb } from "./firebase-admin";
import { User } from "./firestore";

const USERS_COLLECTION = "users";

/**
 * Get user by email using Admin SDK (bypasses security rules)
 */
export async function getUser(email: string): Promise<User | null> {
    // If adminDb didn't initialize (e.g. missing credentials), return null
    // But typically we want to log this error.
    if (!adminDb) {
        console.error("[AdminDB] Database not initialized. Check FIREBASE_SERVICE_ACCOUNT_KEY.");
        return null;
    }

    try {
        const usersRef = adminDb.collection(USERS_COLLECTION);
        const snapshot = await usersRef.where("email", "==", email).get();

        if (snapshot.empty) {
            return null;
        }

        const doc = snapshot.docs[0];
        const data = doc.data();

        // Convert Firestore Timestamps to Dates or ISO strings if needed, 
        // but for now we pass them as is or cast to any.
        return {
            id: doc.id,
            ...data,
        } as User;
    } catch (error) {
        console.error("[AdminDB] Error getting user:", error);
        return null;
    }
}

/**
 * Create user using Admin SDK
 */
export async function createUser(userData: Omit<User, "id">): Promise<User | null> {
    if (!adminDb) {
        console.error("[AdminDB] Database not initialized. Check FIREBASE_SERVICE_ACCOUNT_KEY.");
        return null;
    }

    try {
        const usersRef = adminDb.collection(USERS_COLLECTION);

        // Double-check existence to prevent duplicates
        const existing = await getUser(userData.email);
        if (existing) return existing;

        const newUser = {
            ...userData,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const docRef = await usersRef.add(newUser);

        return {
            id: docRef.id,
            ...newUser,
        } as User;
    } catch (error) {
        console.error("[AdminDB] Error creating user:", error);
        return null;
    }
}
