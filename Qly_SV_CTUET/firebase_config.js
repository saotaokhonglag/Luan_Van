import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDvj9O62Zo2pmFI6Dk9QYYGZS6b-CIXup0",
  authDomain: "quanlydvsinhvien-137c1.firebaseapp.com",
  projectId: "quanlydvsinhvien-137c1",
  storageBucket: "quanlydvsinhvien-137c1.appspot.com",
  messagingSenderId: "396840886832",
  appId: "1:396840886832:web:51ced4e9dba71fd19003f5",
  measurementId: "G-T24Z9Y675L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
