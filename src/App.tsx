import React, {useState} from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import {v1} from "uuid";

export type IdType = string;
export type FilterType = 'All' | 'Active' | 'Completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML ", isDone: true},
        {id: v1(), title: "CSS ", isDone: true},
        {id: v1(), title: "Java Script ", isDone: false},
        {id: v1(), title: "React ", isDone: false},
    ])

// Add new task to main state ---------------------------------------------
    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }
// Add new task to main state ---------------------------------------------

//Change checkbox ---------------------------------------------------------
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const task = tasks.find(task => task.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }
//Change checkbox ---------------------------------------------------------

    return (
        <>
            <Todolist tasks={tasks}
                      setTasks={setTasks}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
            />
        </>
    );
}

export default App;
