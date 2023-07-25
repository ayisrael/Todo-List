import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { actions } from "../features/todoSlice";
import { ADD_TASK } from "../service/apiService";
import { Button, Grid, Input } from "@mui/material";

const AddTodo: React.FC =()=> {
  const dispatch = useDispatch();
  const newVal = useRef<HTMLInputElement | null>(null);
  const [addTaskMutation, { data }] = useMutation(ADD_TASK);

  useEffect(() => {
    if (data) {
      dispatch(actions.addTask(data.addTask));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const addNewTask = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newVal.current) {
      try {
        const taskName = newVal.current.value;
        await addTaskMutation({ variables: { name: taskName } });
        newVal.current.value = "";
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  return (
    <form onSubmit={addNewTask}>
      <Grid container spacing={12}>
        <Grid item xs={6}>
          <Input inputRef={newVal} placeholder="Placeholder" required />
        </Grid>
        <Grid item xs>
          <Button type="submit" variant="contained">
            ADD TODO
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddTodo;
