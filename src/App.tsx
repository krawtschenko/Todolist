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
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todoListID1 = v1()
    let todoListID2 = v1()
    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'What to learn', filter: 'All'},
        {id: todoListID2, title: 'What to buy', filter: 'All'}
    ])
    let [tasks, setTasks] = useState<TaskStateType>({
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
        //Igor
        // setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== id)})
        //Дістаємо потрібний нам масив по ключу todoListId
        const todoListTask = tasks[todoListId]
        //Перезапишемо в обʼєкті масив з видаленою таскою
        tasks[todoListId] = todoListTask.filter(task => task.id !== id)
        //Записуємо в стейт копію обʼєкта, вже з видаленою таскою
        setTasks({...tasks})
    }
    const addTask = (title: string, todoListId: string) => {
        // Створюємо нову таску з обрізаними пробілами в тайтлі
        const newTask = {id: v1(), title: title.trim(), isDone: false}
        //Igor
        // setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
        const todoListTask = tasks[todoListId]
        tasks[todoListId] = [newTask, ...todoListTask]
        setTasks({...tasks})
    }
    const removeTodoList = (id: string) => {
        //Сетаємо тудуліст, але вже відфільтрований
        setTodoLists([...todoLists.filter(todoList => todoList.id !== id)])
        //Також видаляємо таски з цього тудуліста
        delete tasks[id]
    }
    const addTodoList = (title: string) => {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {id: newTodoListID, title: title.trim(), filter: 'All'}
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
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        //Igor
        // setTasks({...tasks, [todoListId]: tasks[todoListId].map(task => task.id === taskId ? {...task, isDone} : task)})
        const todolistTask = tasks[todoListId]
        //Записуємо в змінну таску, в якій id = тому id по якому ми клікнули
        const task = todolistTask.find(task => task.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
//--------------------------------------------------------------------

// Update-------------------------------------------------------------
    const updateTaskTitle = (todoListId: string, taskId: string, title: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(task => task.id === taskId ? {...task, title: title} : task)
        })
    }
    const updateTodoListTitle = (todoListId: string, title: string) => {
        setTodoLists(todoLists.map(todoList => todoList.id === todoListId ? {...todoList, title: title} : todoList))
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

export default App;
