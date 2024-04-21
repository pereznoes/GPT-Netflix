// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrFXZJKUp1qYbJXu2Zu734YEi_Io7BwpQ",
  authDomain: "netflix-gpt-39504.firebaseapp.com",
  projectId: "netflix-gpt-39504",
  storageBucket: "netflix-gpt-39504.appspot.com",
  messagingSenderId: "253673966593",
  appId: "1:253673966593:web:f4d53b4082b1c3d849c400",
  measurementId: "G-LJTBXM9XSC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
