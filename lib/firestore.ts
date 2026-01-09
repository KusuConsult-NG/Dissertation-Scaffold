import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    query,
    where,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface User {
    id: string;
    email: string;
    name: string;
    password: string; // In production, this should be hashed
    image: string | null;
    bio: string;
    title: string;
    plan: string;
    createdAt?: any;
    state?: string;
    lga?: string;
    institution?: string;
    researchLevel?: string;
    researchArea?: string;
    connectedTools?: string[];
}

const USERS_COLLECTION = "users";

/**
 * Get user by email
 */
export async function getUser(email: string): Promise<User | null> {
    try {
        const usersRef = collection(db, USERS_COLLECTION);
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }

        const userData = querySnapshot.docs[0].data();
        return {
            id: querySnapshot.docs[0].id,
            ...userData,
        } as User;
    } catch (error) {
        console.error("[Firestore] Error getting user by email:", error);
        return null;
    }
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string): Promise<User | null> {
    try {
        const userDoc = await getDoc(doc(db, USERS_COLLECTION, userId));

        if (!userDoc.exists()) {
            return null;
        }

        return {
            id: userDoc.id,
            ...userDoc.data(),
        } as User;
    } catch (error) {
        console.error("[Firestore] Error getting user by ID:", error);
        return null;
    }
}

/**
 * Update user document
 */
export async function updateUser(
    email: string,
    data: Partial<User>
): Promise<User | null> {
    try {
        // First, find the user by email
        const user = await getUser(email);

        if (!user) {
            console.error("[Firestore] User not found for update:", email);
            return null;
        }

        // Update the document
        const userRef = doc(db, USERS_COLLECTION, user.id);
        await updateDoc(userRef, {
            ...data,
            updatedAt: serverTimestamp(),
        });

        // Return updated user
        return await getUserById(user.id);
    } catch (error) {
        console.error("[Firestore] Error updating user:", error);
        return null;
    }
}

/**
 * Create new user document
 */
export async function createUser(userData: Omit<User, "id">): Promise<User | null> {
    try {
        // Check if user already exists
        const existingUser = await getUser(userData.email);
        if (existingUser) {
            console.error("[Firestore] User already exists:", userData.email);
            return existingUser;
        }

        // Create new user document with auto-generated ID
        const userRef = doc(collection(db, USERS_COLLECTION));
        const newUser = {
            ...userData,
            createdAt: serverTimestamp(),
        };

        await setDoc(userRef, newUser);

        return {
            id: userRef.id,
            ...newUser,
        } as User;
    } catch (error) {
        console.error("[Firestore] Error creating user:", error);
        return null;
    }
}

/**
 * Initialize default user (for development)
 */
export async function initializeDefaultUser(): Promise<void> {
    try {
        const existingUser = await getUser("user@example.com");

        if (!existingUser) {
            // Creating default user
            await createUser({
                email: "user@example.com",
                name: "Dr. Researcher",
                password: "password", // In production, hash this!
                image: null,
                bio: "Researching the intersection of quantum computing mechanics and ethical policy frameworks.",
                title: "Postdoctoral Fellow, Quantum Ethics",
                plan: "free",
                connectedTools: [],
            });

        }
    } catch (error) {
        console.error("[Firestore] Error initializing default user:", error);
    }
}
