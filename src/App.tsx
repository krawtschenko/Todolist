import React, {useState} from 'react';
import './App.css';
import Todolist from "./components/Todolist";

export type IdType = number;
export type FilterType = 'All' | 'Active' | 'Completed'

function App() {
    const title = 'Hallo!'

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML ", isDone: true},
        {id: 2, title: "CSS ", isDone: true},
        {id: 3, title: "Java Script ", isDone: false},
        {id: 4, title: "React ", isDone: false},
    ])

    const removeTask = (id: IdType) => {
        setTasks(tasks.filter(elem => elem.id !== id))
    }

    const removeAllTasks = () => {
        setTasks([])
    }

    return (
        <>
            <Todolist title={title} tasks={tasks} removeTask={removeTask} removeAllTasks={removeAllTasks}/>
        </>
    );
}

export default App;
