import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyD_uIs8oQoNk_-FxKcx526v_c_vDqSRRGg",
  authDomain: "flowboard-e4670.firebaseapp.com",
  projectId: "flowboard-e4670",
  storageBucket: "flowboard-e4670.appspot.com",
  messagingSenderId: "854773721342",
  appId: "1:854773721342:web:b2366d5f131daf28fa9daf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const fbFunctions = getFunctions(app);

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectFunctionsEmulator(fbFunctions, "localhost", 5001);
}