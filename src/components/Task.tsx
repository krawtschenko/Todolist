import React, { useCallback } from "react";
import { TaskType } from "../AppWithRedux";
import Checkbox from "@mui/material/Checkbox";
import EditableSpan from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

type TaskPropsType = {
  task: TaskType;
  todoListId: string;
  updateTaskTitle: (todolistId: string, taskId: string, title: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void;
  removeTask: (id: string, todolistId: string) => void;
};

export const Task = React.memo((props: TaskPropsType) => {
  // Функція для змінення title в task
  const updateTaskTitleHandler = useCallback(
    (title: string) => {
      props.updateTaskTitle(props.todoListId, props.task.id, title);
    },
    [props.updateTaskTitle, props.todoListId, props.task.id]
  );

  // Функція для змінення чекбокса в task
  const onChangeTaskStatusHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.changeTaskStatus(
      props.task.id,
      event.currentTarget.checked,
      props.todoListId
    );
  };

  return (
    <div className={props.task.isDone ? "isDone" : ""}>
      <Checkbox
        checked={props.task.isDone}
        onChange={(event) => onChangeTaskStatusHandler(event)}
      />
      <EditableSpan
        onChange={updateTaskTitleHandler}
        value={props.task.title}
      />
      <IconButton
        color="primary"
        onClick={() => props.removeTask(props.task.id, props.todoListId)}
      >
        <DeleteIcon style={{ color: "darkred" }} />
      </IconButton>
    </div>
  );
});
