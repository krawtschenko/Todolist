import React, {useCallback} from "react";
import "./App.css";
import Todolist from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {Paper} from "@mui/material";
import {
    changeTodoListFilterAC, changeTodoListTitleAC, FilterType, TodoListDomainType,
} from "./state/reducers/todoListsReducer";
import {
    addTaskAC,
    addTodolistAC,
    changeTaskStatusAC,
    removeTaskAC,
    removeTodolistAC,
    updateTaskTitleAC,
} from "./state/reducers/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolist-api";

export type TaskStateType = {
    [key: string]: Array<TaskType>;
};

function App() {
    // Отримуємо із state тудулісти
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>((state) => state.todoLists
    );
    // Отримуємо із state таски
    const tasks = useSelector<AppRootStateType, TaskStateType>((state) => state.tasks
    );

    // Записуємо метод dispatch із Редакса в змінну
    const dispatch = useDispatch();

    // Buttons------------------------------------------------------------
    // Видаляємо таску
    const removeTask = useCallback(
        (id: string, todoListId: string) => {
            dispatch(removeTaskAC(id, todoListId));
        }, [dispatch]
    );

    // Додаємо таску
    const addTask = useCallback(
        (title: string, todoListId: string) => {
            dispatch(addTaskAC(title, todoListId));
        }, [dispatch]
    );

    // Видаляємо тудуліст
    const removeTodoList = useCallback(
        (todoListId: string) => {
            const action = removeTodolistAC(todoListId);
            dispatch(action);
        }, [dispatch]
    );

    // Додаємо тудуліст
    const addTodoList = useCallback(
        (title: string) => {
            const action = addTodolistAC(title);
            dispatch(action);
        }, [dispatch]
    );
    //--------------------------------------------------------------------

    // Filter-------------------------------------------------------------
    // Фільтруємо в тудулісті таски
    const changeFilter = useCallback(
        (filterValue: FilterType, todolistId: string) => {
            dispatch(changeTodoListFilterAC(todolistId, filterValue));
        }, [dispatch]
    );
    //--------------------------------------------------------------------

    // Checkbox-----------------------------------------------------------
    // Змінюємо чекбокс в тасках
    const changeTaskStatus = useCallback(
        (taskId: string, status: TaskStatuses, todoListId: string) => {
            dispatch(changeTaskStatusAC(taskId, status, todoListId));
        }, [dispatch]
    );
    //--------------------------------------------------------------------

    // Update-------------------------------------------------------------
    // Змінюємо текст в тасках
    const updateTaskTitle = useCallback(
        (todoListId: string, taskId: string, title: string) => {
            dispatch(updateTaskTitleAC(taskId, title, todoListId));
        }, [dispatch]
    );

    // Змінюємо текст в тудулістах
    const updateTodoListTitle = useCallback(
        (todoListId: string, title: string) => {
            dispatch(changeTodoListTitleAC(todoListId, title));
        }, [dispatch]
    );
    //--------------------------------------------------------------------

    return (
        <div className={"App"}>
            {/*Header*/}
            <AppBar position="static" style={{background: "#228B22"}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" sx={{flexGrow: 1}}>
                        TodoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                {/*Інпут і кнопка для додавання TodoList*/}
                <Grid container style={{margin: "20px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                {/*TodoLists*/}
                <Grid container spacing={2}>
                    {todoLists.map((todolist) => {
                        // Тут зберігаємо таски даного тудуліста
                        const allTodolistTasks = tasks[todolist.id];

                        return (
                            <Grid item key={todolist.id}>
                                <Paper elevation={12} style={{padding: "10px"}}>
                                    <Todolist
                                        id={todolist.id}
                                        title={todolist.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={todolist.filter}
                                        removeTodolist={removeTodoList}
                                        updateTaskTitle={updateTaskTitle}
                                        updateTodoListTitle={updateTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
