// Firestore-backed database
// This replaces the in-memory implementation with persistent Firestore storage

import { getUser as getFirestoreUser, updateUser as updateFirestoreUser } from "./firestore";

// Re-export Firestore functions with same signatures for compatibility
export const getUser = getFirestoreUser;
export const updateUser = updateFirestoreUser;

// Note: The users array is no longer used.
// All data is now stored in Firestore.
// Run initializeDefaultUser() from lib/firestore.ts to create the test user.
