import {Checkbox,IconButton,ListItem,ListItemButton, ListItemIcon,ListItemText} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { TOGGLE_TASK, DELETE_TASK } from "../service/apiService";
import { TaskProps } from "./todoList";
import { actions } from "../features/todoSlice";
import { useDispatch } from "react-redux";


 const TodoItem: React.FC <TaskProps>=( {task})=> {
  const dispatch = useDispatch();
  const [checked] = useState(task.iscompleted);
  const [deleteTaskMutation] = useMutation(DELETE_TASK);
  const [toggleTaskMutation] = useMutation(TOGGLE_TASK);

  const handleToggle = () => {
    toggleTaskMutation({ variables: { id: task.id } });
    dispatch(actions.toggleTask(task.id));
  };

  const handleDelete = () => {
    deleteTaskMutation({ variables: { id: task.id } });
    dispatch(actions.deleteTask(task.id));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <Checkbox edge="start" checked={checked} onChange={handleToggle} />
        </ListItemIcon>
        <ListItemText
          primary={task.name}
          style={{
            fontStyle: checked ? "italic" : "normal",
            textDecorationLine: checked ? "line-through" : "none",
            color: checked ? "gray" : "black",
          }}
        />
        <IconButton onClick={handleDelete} edge="end" aria-label="delete">
          <DeleteIcon style={{ color: "red" }} />
        </IconButton>
      </ListItemButton>
    </ListItem>
  );
}
export default TodoItem;