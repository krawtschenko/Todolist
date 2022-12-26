import React, {useReducer} from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import {v1} from "uuid";
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
import {changeTodoListFilterAC, changeTodoListTitleAC, todoListsReducer} from "./state/reducers/todoListsReducer";
import {
    addTaskAC,
    addTodolistAC, changeTaskStatusAC,
    removeTaskAC,
    removeTodolistAC,
    tasksReducer, updateTaskTitleAC
} from "./state/reducers/tasksReducer";

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

function AppWithReducers () {
    let todoListID1 = v1()
    let todoListID2 = v1()
    let [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
        {id: todoListID1, title: 'What to learn', filter: 'All'},
        {id: todoListID2, title: 'What to buy', filter: 'All'}
    ])
    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todoListID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

// Buttons------------------------------------------------------------
    const removeTask = (id: string, todoListId: string) => {
        dispatchToTasks(removeTaskAC(id, todoListId))
    }
    const addTask = (title: string, todoListId: string) => {
        dispatchToTasks(addTaskAC(title, todoListId))
    }
    const removeTodoList = (todoListId: string) => {
        const action = removeTodolistAC(todoListId)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
    const addTodoList = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
//--------------------------------------------------------------------

// Filter-------------------------------------------------------------
    const changeFilter = (filterValue: FilterType, todolistId: string) => {
        dispatchToTodoLists(changeTodoListFilterAC(todolistId, filterValue))
    }
//--------------------------------------------------------------------

// Checkbox-----------------------------------------------------------
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListId))
    }
//--------------------------------------------------------------------

// Update-------------------------------------------------------------
    const updateTaskTitle = (todoListId: string, taskId: string, title: string) => {
        dispatchToTasks(updateTaskTitleAC(taskId, title, todoListId))
    }
    const updateTodoListTitle = (todoListId: string, title: string) => {
        dispatchToTodoLists(changeTodoListTitleAC(todoListId, title))
    }
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
                <Grid container spacing={3}>
                    {todoLists.map(todolist => {
                        const allTodolistTasks = tasks[todolist.id]
                        // Тут зберігаємо відфільтровані таски
                        let tasksFilter = allTodolistTasks

                        if (todolist.filter === 'Active') {
                            tasksFilter = allTodolistTasks.filter(elem => !elem.isDone)
                        }
                        if (todolist.filter === 'Completed') {
                            tasksFilter = allTodolistTasks.filter(elem => elem.isDone)
                        }

                        return (
                            <Grid item xs={3} key={todolist.id}>
                                <Paper elevation={12} style={{padding: '3px'}}>
                                    <Todolist id={todolist.id}
                                              title={todolist.title}
                                              tasks={tasksFilter}
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

export default AppWithReducers;
