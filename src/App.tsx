import React, {useState} from 'react';
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

export type FilterType = 'All' | 'Active' | 'Completed'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()
    let todolistID3 = v1()
    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
        {id: todolistID3, title: 'What to do', filter: 'All'},
    ])
    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID3]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'PHP', isDone: true},
            {id: v1(), title: 'SQL', isDone: false},
            {id: v1(), title: '3D MAX', isDone: false}
        ]
    })

// Buttons------------------------------------------------------------
    const removeTask = (id: string, todolistId: string) => {
        //Igor
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== id)})
        //Дістаємо потрібний нам масив по ключу todolistId
        const todolistTask = tasks[todolistId]
        //Перезапишемо в обʼєкті масив з видаленою таскою
        tasks[todolistId] = todolistTask.filter(task => task.id !== id)
        //Записуємо в стейт копію обʼєкта, вже з видаленою таскою
        setTasks({...tasks})
    }
    const addTask = (title: string, todolistId: string) => {
        // Створюємо нову таску з обрізаними пробілами в тайтлі
        const newTask = {id: v1(), title: title.trim(), isDone: false}
        //Igor
        // setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
        const todolistTask = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTask]
        setTasks({...tasks})
    }
    const removeTodolist = (id: string) => {
        //Сетаємо тудуліст, але вже відфільтрований
        setTodoLists([...todoLists.filter(todolist => todolist.id !== id)])
        //Також видаляємо таски з цього тудуліста
        delete tasks[id]
    }
    const addTodoList = (title: string) => {
        const newTodoListID = v1()
        const newTodoList: TodolistType = {id: newTodoListID, title: title.trim(), filter: 'All'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoListID]: []})
    }
//--------------------------------------------------------------------

// Filter-------------------------------------------------------------
    const changeFilter = (filterValue: FilterType, todolistId: string) => {
        //Записуємо в змінну тудуліст, в якому id = тому id по якому ми клікнули
        const todolist = todoLists.find(todolist => todolist.id === todolistId)
        if (todolist) {
            //Змінюємо значення фільтра в обраному тудулісті
            todolist.filter = filterValue
            //Записуємо в стейт тудулісти, серед яких один модефікований
            setTodoLists([...todoLists])
        }
        // Igor
        // setTodoLists(todoLists.map(elem => elem.id === todolistId ? {...elem, filter: filterValue} : elem))
    }
//--------------------------------------------------------------------

// Checkbox-----------------------------------------------------------
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        //Igor
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)})
        const todolistTask = tasks[todolistId]
        //Записуємо в змінну таску, в якій id = тому id по якому ми клікнули
        const task = todolistTask.find(task => task.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
//--------------------------------------------------------------------

// Update-------------------------------------------------------------
    const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title: title} : task)
        })
    }
    const updateTodoListTitle = (todolistId: string, title: string) => {
        setTodoLists(todoLists.map(todoList => todoList.id === todolistId ? {...todoList, title: title} : todoList))
    }
//--------------------------------------------------------------------

    return (
        <div className={'App'}>
            {/*Header*/}
            <AppBar position="static" style={{background: '#228B22'}}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
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
                            <Grid item key={todolist.id}>
                                <Paper elevation={12} style={{padding: '10px'}}>
                                    <Todolist id={todolist.id}
                                              title={todolist.title}
                                              tasks={tasksFilter}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              filter={todolist.filter}
                                              removeTodolist={removeTodolist}
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

export default App;
