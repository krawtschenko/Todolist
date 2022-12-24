import React, {useCallback} from "react";
import {FilterType, TaskType} from "../App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import {Task} from "./Task";

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

const Todolist = React.memo((props: TodolistPropsType) => {
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id]);
    const removeTodoList = () => {
        props.removeTodolist(props.id);
    };
    // Міняємо заголовок тудуліста
    const updateTodoListTitleHandler = useCallback((title: string) => {
        props.updateTodoListTitle(props.id, title);
    }, [props.updateTodoListTitle, props.id]);

    // Buttons------------------------------------------------------------
    const classButtonAll = props.filter === "All" ? "contained" : "outlined";
    const classButtonActive =
        props.filter === "Active" ? "contained" : "outlined";
    const classButtonCompleted =
        props.filter === "Completed" ? "contained" : "outlined";

    // Міняємо статус тудуліста на All
    const onAllClickHandler = useCallback(() => {
        props.changeFilter("All", props.id);
    }, [props.changeFilter, props.id]);
    // Міняємо статус тудуліста на Active
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("Active", props.id);
    }, [props.changeFilter, props.id]);
    // Міняємо статус тудуліста на Completed
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("Completed", props.id);
    }, [props.changeFilter, props.id]);
    //--------------------------------------------------------------------

    // Filters------------------------------------------------------------
    // Тут зберігаємо відфільтровані таски
    let tasksFilter = props.tasks
    // Якшо у тудуліста свойство filter = Active, то фільтруємо
    if (props.filter === 'Active') {
        tasksFilter = props.tasks.filter(elem => !elem.isDone)
    }
    // Якшо у тудуліста свойство filter = Completed, то фільтруємо
    if (props.filter === 'Completed') {
        tasksFilter = props.tasks.filter(elem => elem.isDone)
    }
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
                {tasksFilter.map((task) => {
                    return (
                        <Task key={task.id}
                              task={task}
                              todoListId={props.id}
                              updateTaskTitle={props.updateTaskTitle}
                              changeTaskStatus={props.changeTaskStatus}
                              removeTask={props.removeTask}
                        />
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
})

export default Todolist;
