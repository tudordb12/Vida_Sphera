import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

// Sign up with email and password
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign in with email and password
export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign in with Google
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // Here you can handle adding user details to Firestore or elsewhere
  return user;
};

// Sign out
export const doSignOut = () => {
  return auth.signOut();
};

// Password reset
export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// Change password
export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

// Send email verification
export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,  // Update this URL based on your project
  });
};

// Function to check authentication status
export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};