import React, { useState } from "react";
import { Row, Col, Input, Button, Popconfirm } from "antd";
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import { AppState } from "./store/rootReducer";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteTodoRequest,
  fetchTodoRequest,
  updateTodoRequest,
} from "./store/todo/actions";

type TodoProps = {
  name: string;
  _id: string;
};

const Todo = (props: TodoProps) => {
  const dispatch = useDispatch();
  const { updateLoader } = useSelector((state: AppState) => state.todo);
  const [values, setValues] = useState({
    name: props.name,
    isUpdate: false,
  });
  return (
    <Row
      style={{
        height: "80px",
        borderRadius: "10px",
        background: "cyan",
      }}
      align="middle"
    >
      <Col span={values.isUpdate ? 14 : 12}>
        {values.isUpdate ? (
          <Row justify="center">
            <Col span={16}>
              <Input
                defaultValue={props.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setValues({ ...values, name: e.target.value });
                }}
                style={{ width: "100%", height: "40px", borderRadius: "10px" }}
              />
            </Col>
          </Row>
        ) : (
          <h2>{props.name}</h2>
        )}
      </Col>
      {!values.isUpdate ? (
        <Col span={12}>
          <Row>
            <Col
              span={12}
              onClick={() => {
                setValues({ ...values, isUpdate: true });
              }}
            >
              <AiFillEdit style={{ cursor: "pointer" }} />
            </Col>
            <Col
              span={12}
              onClick={() => {
                dispatch(
                  deleteTodoRequest({ id: props._id }, () => {
                    dispatch(fetchTodoRequest());
                  })
                );
              }}
            >
              <AiFillDelete style={{ cursor: "pointer" }} />
            </Col>
          </Row>
        </Col>
      ) : (
        <Row justify="center" gutter={[20, 0]}>
          <Col>
            <Button
              loading={updateLoader}
              style={{
                backgroundColor: "green",
                color: "white",
                borderRadius: "10px",
              }}
              onClick={() => {
                dispatch(
                  updateTodoRequest(
                    { _id: props._id, name: values.name },
                    () => {
                      dispatch(fetchTodoRequest());
                    }
                  )
                );
                setValues({ ...values, isUpdate: false });
              }}
            >
              Update
            </Button>
          </Col>
          <Col>
            <Button
              style={{
                backgroundColor: "red",
                color: "white",
                borderRadius: "10px",
              }}
              onClick={() => {
                setValues({ ...values, isUpdate: false });
              }}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      )}
    </Row>
  );
};

export default Todo;
