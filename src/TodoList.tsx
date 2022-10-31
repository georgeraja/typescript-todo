import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "antd";
import { Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ITodo } from "./store/todo/types";
import Todo from "./Todo";
import { AppState } from "./store/rootReducer";
import {
  fetchTodoRequest,
  addTodoRequest,
  signOutRequest,
} from "./store/todo/actions";

type Example = {
  name: string;
  _id: string;
};
const TodoList = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  useEffect(() => {
    dispatch(fetchTodoRequest());
  }, []);

  const [values, setValues] = useState<{ name: string }>({
    name: "",
  });

  const [errors, setErrors] = useState<{ nameError: string }>({
    nameError: "",
  });
  const { name } = values;

  const obj = { name };

  const { todos, loading, addLoader } = useSelector(
    (state: AppState) => state.todo
  );

  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ name: e.target.value });
    setErrors({ nameError: "" });
  };

  const handleSubmit = (obj: { name: string }) => {
    const { name } = obj;
    if (!name.trim().length) {
      setErrors((errors) => ({
        ...errors,
        nameError: "Please Enter Todo ",
      }));
      return;
    } else {
      dispatch(
        addTodoRequest({ name: values.name }, () => {
          dispatch(fetchTodoRequest());
          setValues({ name: "" });
        })
      );
    }
  };

  return (
    <Row
      justify="center"
      style={{ border: "1px solid black", background: "grey", height: "100vh" }}
      align="middle"
    >
      <Col span={10}>
        <Row justify="space-between" gutter={[20, 30]} align="middle">
          <Col span={20}>
            <h1 style={{ color: "white" }}>Todo List</h1>
          </Col>
          <Col span={4}>
            <Button
              onClick={() => {
                localStorage.removeItem("todoauth");
                window.location.reload();
                history("/sign-in");
              }}
            >
              Logout
            </Button>
          </Col>
          <Col span={14}>
            <Input
              placeholder="Enter Todo..."
              value={values.name}
              onChange={(e) => {
                handleAdd(e);
              }}
              style={{
                borderRadius: "10px",
                height: "50px",
              }}
            />
            <label style={{ color: "black" }}>{errors.nameError}</label>
          </Col>
          <Col span={6}>
            <Button
              style={{
                width: "100%",
                borderRadius: "10px",
                height: "50px",
                background: "pink",
              }}
              loading={addLoader}
              onClick={() => handleSubmit(obj)}
            >
              Add
            </Button>
          </Col>
          <Col span={24}>
            <Row justify="center" gutter={[0, 20]}>
              {(todos as []).map((item: Example) => {
                return (
                  <Col span={24}>
                    <Todo name={item.name} _id={item._id} />
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default TodoList;
