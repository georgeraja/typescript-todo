import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import TodoList from "../TodoList";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
