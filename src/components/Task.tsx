import React, {useCallback} from "react";
import Checkbox from "@mui/material/Checkbox";
import EditableSpan from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskStatuses, TaskType} from "../api/todolist-api";

type TaskPropsType = {
    task: TaskType;
    todoListId: string;
    updateTaskTitle: (todolistId: string, taskId: string, title: string) => void;
    changeTaskStatus: (
        taskId: string,
        status: TaskStatuses,
        todolistId: string
    ) => void;
    removeTask: (id: string, todolistId: string) => void;
};

export const Task = React.memo((props: TaskPropsType) => {
    // Функція для змінення title в task
    const updateTaskTitleHandler = useCallback(
        (title: string) => {
            props.updateTaskTitle(props.todoListId, props.task.id, title);
        }, [props.updateTaskTitle, props.todoListId, props.task.id]
    );

    // Функція для змінення чекбокса в task
    const onChangeTaskStatusHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = event.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.completed : TaskStatuses.new, props.todoListId);
    };

    return (
        <div className={props.task.status === TaskStatuses.completed ? "isDone" : ""}>
            <Checkbox
                checked={props.task.status === TaskStatuses.completed}
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
                <DeleteIcon style={{color: "darkred"}}/>
            </IconButton>
        </div>
    );
});
