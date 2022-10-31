import React from "react";
import "./App.css";
import TodoList from "./TodoList";
import SignIn from "./SignIn";
import AuthRoutes from "./config/AuthRoutes";

function App() {
  return (
    <div className="App">
      {/* <TodoList /> */}
      {/* <SignIn /> */}
      <AuthRoutes />
    </div>
  );
}

export default App;
