import React, {useCallback} from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {Paper} from "@mui/material";
import {changeTodoListFilterAC, changeTodoListTitleAC} from "./components/reducers/todoListsReducer";
import {
    addTaskAC,
    addTodolistAC, changeTaskStatusAC,
    removeTaskAC,
    removeTodolistAC,
    updateTaskTitleAC
} from "./components/reducers/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterType = 'All' | 'Active' | 'Completed'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

// Buttons------------------------------------------------------------
    const removeTask = useCallback((id: string, todoListId: string) => {
        dispatch(removeTaskAC(id, todoListId))
    }, [])
    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }, [])
    const removeTodoList = useCallback((todoListId: string) => {
        const action = removeTodolistAC(todoListId)
        dispatch(action)
    }, [])
    const addTodoList = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [])
//--------------------------------------------------------------------

// Filter-------------------------------------------------------------
    const changeFilter = useCallback((filterValue: FilterType, todolistId: string) => {
        dispatch(changeTodoListFilterAC(todolistId, filterValue))
    }, [])
//--------------------------------------------------------------------

// Checkbox-----------------------------------------------------------
    const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }, [])
//--------------------------------------------------------------------

// Update-------------------------------------------------------------
    const updateTaskTitle = useCallback((todoListId: string, taskId: string, title: string) => {
        dispatch(updateTaskTitleAC(taskId, title, todoListId))
    }, [])
    const updateTodoListTitle = useCallback((todoListId: string, title: string) => {
        dispatch(changeTodoListTitleAC(todoListId, title))
    }, [])
//--------------------------------------------------------------------

    return (
        <div className={'App'}>
            {/*Header*/}
            <AppBar position="static" style={{background: '#228B22'}}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
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
                <Grid container style={{margin: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                {/*TodoLists*/}
                <Grid container spacing={2}>
                    {todoLists.map(todolist => {
                        // Тут зберігаємо таски даного тудуліста
                        const allTodolistTasks = tasks[todolist.id]
                        // Тут зберігаємо відфільтровані таски
                        // let tasksFilter = allTodolistTasks
                        //
                        // if (todolist.filter === 'Active') {
                        //     tasksFilter = allTodolistTasks.filter(elem => !elem.isDone)
                        // }
                        // if (todolist.filter === 'Completed') {
                        //     tasksFilter = allTodolistTasks.filter(elem => elem.isDone)
                        // }

                        return (
                            <Grid item key={todolist.id}>
                                <Paper elevation={12} style={{padding: '10px'}}>
                                    <Todolist id={todolist.id}
                                              title={todolist.title}
                                              tasks={allTodolistTasks}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              filter={todolist.filter}
                                              removeTodolist={removeTodoList}
                                              updateTaskTitle={updateTaskTitle}
                                              updateTodoListTitle={updateTodoListTitle}/>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
