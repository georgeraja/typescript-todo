import React from "react";
import { render } from "react-dom";
// import { AppRoutes } from "./AppRoutes";
import { AppState } from "../store/rootReducer";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import AppRoutes from "./AppRoutes";

const AuthRoutes = () => {
  const { isAuthenticated } = useSelector((state: AppState) => state.todo);
  return (
    <>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<AppRoutes />} />
        </Routes>
      )}
    </>
  );
};

export default AuthRoutes;
