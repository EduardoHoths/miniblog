import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCobrHVImppIclSnbpdgn3X90lON7--c0k",
  authDomain: "miniblog-d1b17.firebaseapp.com",
  projectId: "miniblog-d1b17",
  storageBucket: "miniblog-d1b17.appspot.com",
  messagingSenderId: "21051576022",
  appId: "1:21051576022:web:363c6c21ab374da30f0377",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
