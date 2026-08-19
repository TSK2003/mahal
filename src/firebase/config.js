import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg_D7FdStVr0Qs5zMRp1wrq2_OFdvvTVw",
  authDomain: "mahal-a8800.firebaseapp.com",
  projectId: "mahal-a8800",
  storageBucket: "mahal-a8800.firebasestorage.app",
  messagingSenderId: "647859700729",
  appId: "1:647859700729:web:b606f69341b6a0f14ab328",
  measurementId: "G-55GZNZ812H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Safe Analytics Initialization
export let analytics = null;
if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      // Analytics not supported in this environment
    });
}

export default app;
