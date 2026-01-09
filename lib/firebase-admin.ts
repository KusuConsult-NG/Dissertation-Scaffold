import "server-only";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// You should set these env vars in your deployments
// For local dev with no service account, we can attempt default creds or mock if strictly public
// But for custom tokens we NEED a service account or an emulated env.

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    : undefined;

const firebaseAdminConfig = {
    credential: serviceAccount ? cert(serviceAccount) : undefined,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

// Initialize only once
let app;
let adminAuth: any;
let adminDb: any;

try {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
        ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
        : undefined;

    const firebaseAdminConfig = {
        credential: serviceAccount ? cert(serviceAccount) : undefined,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    };

    app = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];
    adminAuth = getAuth(app);
    adminDb = getFirestore(app);
} catch (error) {
    console.error("Firebase Admin Initialization Error:", error);
    // We don't crash here, but downstream usage will fail gracefully
}

export { adminAuth, adminDb };
