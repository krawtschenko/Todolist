import React from "react";
import {FilterType, TaskType} from "../App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Checkbox from "@mui/material/Checkbox";

type TodolistPropsType = {
    id: string;
    title: string;
    filter: FilterType;
    tasks: Array<TaskType>;
    removeTask: (id: string, todolistId: string) => void;
    changeFilter: (filterValue: FilterType, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
    removeTodolist: (id: string) => void;
    updateTaskTitle: (todolistId: string, taskId: string, title: string) => void;
    updateTodoListTitle: (todolistId: string, title: string) => void;
};

function Todolist(props: TodolistPropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    };
    const removeTodoList = () => {
        props.removeTodolist(props.id);
    };
    const updateTodoListTitleHandler = (title: string) => {
        props.updateTodoListTitle(props.id, title);
    };
    // Якшо виносмо за return
    // Функція для змінення title в todoList
    // const updateTaskTitleHandler = (title: string, taskId: string) => {
    //     props.updateTitle(props.id, taskId, title)
    // }

    // Buttons------------------------------------------------------------
    const classButtonAll = props.filter === "All" ? "contained" : "outlined";
    const classButtonActive =
        props.filter === "Active" ? "contained" : "outlined";
    const classButtonCompleted =
        props.filter === "Completed" ? "contained" : "outlined";

    const onAllClickHandler = () => {
        props.changeFilter("All", props.id);
    };
    const onActiveClickHandler = () => {
        props.changeFilter("Active", props.id);
    };
    const onCompletedClickHandler = () => {
        props.changeFilter("Completed", props.id);
    };
    //--------------------------------------------------------------------

    return (
        <div>
            <h3 style={{margin: "0"}}>
                <EditableSpan
                    value={props.title}
                    onChange={updateTodoListTitleHandler}
                />
                <IconButton onClick={removeTodoList}>
                    <DeleteIcon style={{color: "darkred"}}/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {props.tasks.map((task) => {
                    // Функція для змінення title в task
                    const updateTaskTitleHandler = (title: string) => {
                        props.updateTaskTitle(props.id, task.id, title);
                    };
                    const onChangeTaskStatusHandler = (
                        event: React.ChangeEvent<HTMLInputElement>
                    ) => {
                        props.changeTaskStatus(
                            task.id,
                            event.currentTarget.checked,
                            props.id
                        );
                    };
                    return (
                        <div key={task.id} className={task.isDone ? "isDone" : ""}>
                            <Checkbox
                                checked={task.isDone}
                                onChange={(event) => onChangeTaskStatusHandler(event)}
                            />
                            {/*Якшо виносмо за return*/}
                            {/*<EditableSpan onChange={(newTitle) => updateTaskTitleHandler(newTitle, task.id)} value={task.title}/>*/}
                            <EditableSpan
                                onChange={updateTaskTitleHandler}
                                value={task.title}
                            />
                            <IconButton
                                color="primary"
                                onClick={() => props.removeTask(task.id, props.id)}
                            >
                                <DeleteIcon style={{color: "darkred"}}/>
                            </IconButton>
                        </div>
                    );
                })}
            </div>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button
                    variant={classButtonAll}
                    onClick={onAllClickHandler}
                    color={"primary"}
                >
                    All
                </Button>
                <Button
                    variant={classButtonActive}
                    onClick={onActiveClickHandler}
                    color="warning"
                >
                    Active
                </Button>
                <Button
                    variant={classButtonCompleted}
                    onClick={onCompletedClickHandler}
                    color="success"
                >
                    Completed
                </Button>
            </ButtonGroup>
        </div>
    );
}

export default Todolist;
