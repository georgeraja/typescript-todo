import React, { useState } from "react";
import { Row, Col, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "./store/rootReducer";
import { signUpRequest } from "./store/todo/actions";

const SignUp = () => {
  const [values, setValues] = useState<{
    fullName: string;
    email: string;
    password: string;
  }>({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    fullNameError: string;
    emailError: string;
    passwordError: string;
  }>({
    fullNameError: "",
    emailError: "",
    passwordError: "",
  });

  const { email, password, fullName } = values;
  const { signUpLoader } = useSelector((state: AppState) => state.todo);
  const obj = { email, password, fullName };
  const dispatch = useDispatch();
  const history = useNavigate();

  const onHandleSubmit = (obj: {
    email: string;
    password: string;
    fullName: string;
  }) => {
    const { email, password, fullName } = obj;
    if (
      !email.trim().length ||
      !password.trim().length ||
      !fullName.trim().length
    ) {
      if (!email.trim().length) {
        setErrors((errors) => ({
          ...errors,
          emailError: "Please Enter Email",
        }));
      }

      if (!fullName.trim().length) {
        setErrors((errors) => ({
          ...errors,
          fullNameError: "Please Enter full Name",
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
        signUpRequest({ email, password, fullName }, () => {
          history("/sign-in");
        })
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ fullNameError: "", emailError: "", passwordError: "" });
  };
  return (
    <Row justify="center" style={{ height: "100vh" }}>
      <Col span={8} style={{ background: "grey", height: "100%" }}>
        <Row justify="center" gutter={[0, 20]} style={{ marginTop: "10rem" }}>
          <Col span={20}>
            <h1>Please Sign Up</h1>
          </Col>
          <Col span={20}>
            <Input
              onChange={(e) => handleChange(e)}
              name="fullName"
              value={fullName}
              placeholder="Enter Your Full Name"
              style={{ borderRadius: "10px", height: "50px" }}
            />
            <label style={{ color: "black" }}>{errors.fullNameError}</label>
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
              loading={signUpLoader}
              onClick={() => onHandleSubmit(obj)}
              style={{ width: "100%", borderRadius: "10px", height: "50px" }}
            >
              Sign Up
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SignUp;
