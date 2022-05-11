import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import Users from "./components/Users/UsersList";
import Scheduler from "./components/Scheduler/Scheduler";
import Materials from "./components/Materials/Materials";
import English from "./components/Materials/English";
import Welding from "./components/Materials/Welding";
import Soccer from "./components/Materials/Soccer";
import UsersList from "./components/Users/UsersList";
import Header from "./components/Layout/Header";
import AuthForm from "./components/Auth/AuthForm";
import { Row } from "react-bootstrap";

const firebaseConfig = {
  apiKey: "AIzaSyDiB5TXZeYdlQ0nc-T3aj7AGveRDdPBq8g",
  authDomain: "training-company-7275e.firebaseapp.com",
  projectId: "training-company-7275e",
  storageBucket: "training-company-7275e.appspot.com",
  messagingSenderId: "2523724554",
  appId: "1:2523724554:web:8f92c5ee153d631d7d58f3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export let uid = null;

export const loginUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const logoutUser = () => {
  signOut(auth)
    .then(() => {
    })
    .catch((error) => {
    });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
  } else {
    uid = null;
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    {uid == null && <AuthForm />}
    <Row>
      <Header />
    </Row>
      <Routes>
        <Route exact path="" element={<App />}>
          <Route path="/" element={<UsersList />} />
          <Route path="/UsersList" element={<UsersList />} />
          <Route path="/Scheduler" element={<Scheduler />} />
          <Route path="/Materials" element={<Materials />} />
          <Route path="/English" element={<English />} />
          <Route path="/Welding" element={<Welding />} />
          <Route path="/Soccer" element={<Soccer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
