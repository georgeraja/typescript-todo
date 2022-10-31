import React, { useState } from "react";
import { Row, Col, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "./store/rootReducer";
import { signInRequest } from "./store/todo/actions";

const SignIn = () => {
  const [values, setValues] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    emailError: string;
    passwordError: string;
  }>({
    emailError: "",
    passwordError: "",
  });

  const { email, password } = values;
  const obj = { email, password };
  const { signInLoader } = useSelector((state: AppState) => state.todo);
  console.log("SIGN IN LOADER", signInLoader);
  const dispatch = useDispatch();
  const history = useNavigate();

  const onHandleSubmit = (obj: { email: string; password: string }) => {
    const { email, password } = obj;
    if (!email.trim().length || !password.trim().length) {
      if (!email.trim().length) {
        setErrors((errors) => ({
          ...errors,
          emailError: "Please Enter Email",
        }));
      }

      if (!password.trim().length) {
        setErrors((errors) => ({
          ...errors,
          passwordError: "Please Enter Password",
        }));
      }
      return;
    } else {
      dispatch(
        signInRequest({ email, password }, () => {
          history("/");
        })
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ emailError: "", passwordError: "" });
  };
  return (
    <Row justify="center" style={{ height: "100vh" }} align="middle">
      <Col
        span={8}
        style={{
          background: "grey",
          height: "100%",
        }}
      >
        <Row
          justify="center"
          gutter={[0, 20]}
          align="middle"
          style={{ marginTop: "10rem" }}
        >
          <Col span={20}>
            <h1>Please Login</h1>
          </Col>
          <Col span={20}>
            <Input
              onChange={(e) => handleChange(e)}
              name="email"
              value={email}
              placeholder="Enter Email"
              style={{ borderRadius: "10px", height: "50px" }}
            />
            <label style={{ color: "black" }}>{errors.emailError}</label>
          </Col>
          <Col span={20}>
            <Input
              onChange={(e) => handleChange(e)}
              name="password"
              value={password}
              type="password"
              placeholder="Password..."
              style={{ borderRadius: "10px", height: "50px" }}
            />
            <label style={{ color: "black" }}>{errors.passwordError}</label>
          </Col>
          <Col span={8} style={{ borderRadius: "10px" }}>
            <Button
              loading={signInLoader}
              style={{ width: "100%", borderRadius: "10px", height: "50px" }}
              onClick={() => onHandleSubmit(obj)}
            >
              Sign in
            </Button>
          </Col>
          <Col span={24}>
            <p>
              New User? Create a new account{" "}
              <span
                onClick={() => history("/sign-up")}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Signup
              </span>
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SignIn;
