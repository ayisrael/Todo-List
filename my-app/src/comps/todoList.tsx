import { useDispatch, useSelector } from "react-redux";
import { Grid, Paper, styled } from "@mui/material";
import AddTodo from "./addToDo";
import { GET_TASKS } from "../service/apiService";
import { actions } from "../features/todoSlice";
import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { RootState } from "../index";
import TodoItem from "./todoItem";

export interface TaskProps {
  task: { name: string; id: number; iscompleted: boolean };
}

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state: RootState) => state.todoSlice.todoList);
  const { loading, error, data } = useQuery(GET_TASKS);

  useEffect(() => {
    if (data && todoList.length === 0) {
      dispatch(actions.setTodoList(data.tasks));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Grid container spacing={6}>
      <Grid item xs={5} style={{ margin: "0 auto" }}>
        <h1>Todo List</h1>
        <Item>
          {loading ? (
            <p>Loading tasks...</p>
          ) : error ? (
            <p>Error loading tasks. Please try again.</p>
          ) : todoList ? (
            todoList.map(
              (task: { name: string; id: number; iscompleted: boolean }) => (
                <TodoItem task={task} key={task.name} />
              )
            )
          ) : (
            <p>No tasks found.</p>
          )}
          <AddTodo />
        </Item>
      </Grid>
    </Grid>
  );
};

export default TodoList;
