import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { initializeFirestore, persistentLocalCache } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJXKNDMnDX8ZGxcHI-doMYjOCyu1wfQdo",
  authDomain: "dulcekids-4c9c1.firebaseapp.com",
  projectId: "dulcekids-4c9c1",
  storageBucket: "dulcekids-4c9c1.firebasestorage.app",
  messagingSenderId: "114574871121",
  appId: "1:114574871121:web:31aa51d55f78e50bfa8670",
  measurementId: "G-RF5T4EQ29K"
};

const app = initializeApp(firebaseConfig);


export const db = initializeFirestore(app, {
  localCache: persistentLocalCache()
});

export const auth = getAuth(app);
export const storage = getStorage(app);
