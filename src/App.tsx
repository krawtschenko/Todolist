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

    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }
    return (
        <>
            <Todolist tasks={tasks} setTasks={setTasks} addTask={addTask}/>
        </>
    );
}

export default App;
