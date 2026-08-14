
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";  

const firebaseConfig = {
  apiKey: "AIzaSyBXpGj_-ewuNl706yOMCdrdNVbtjM0Nq_g",
  authDomain: "project-68f83.firebaseapp.com",
  projectId: "project-68f83",
  storageBucket: "project-68f83.appspot.com", 
  messagingSenderId: "197814944134",
  appId: "1:197814944134:web:fc9907fdec8271a8676c07",
  measurementId: "G-GPDNYL9QP5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
