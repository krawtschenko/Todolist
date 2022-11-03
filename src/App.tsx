import React, {useState} from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import {v1} from "uuid";

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML ", isDone: true},
        {id: v1(), title: "CSS ", isDone: true},
        {id: v1(), title: "Java Script ", isDone: false},
        {id: v1(), title: "React ", isDone: false},
    ])

    return (
        <Todolist tasks={tasks} setTasks={setTasks}/>
    );
}

export default App;
