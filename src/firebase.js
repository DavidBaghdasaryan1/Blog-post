import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_vJb42i-VM2-NzKbmT3hykzcMHSGDP9Q",
  authDomain: "blogpost-59dc3.firebaseapp.com",
  projectId: "blogpost-59dc3",
  storageBucket: "blogpost-59dc3.appspot.com",
  messagingSenderId: "673176442848",
  appId: "1:673176442848:web:ef99f719be9e4d686abd85",
  measurementId: "G-46YNRH9NLB",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
