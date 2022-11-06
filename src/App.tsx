import React, {useState} from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import {v1} from "uuid";

export type FilterType = 'All' | 'Active' | 'Completed'
export type ObjectType = {
    id: string
    title: string
    isDone: boolean
}

function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "Java Script", isDone: false},
        {id: v1(), title: "React", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterType>('All')

// Buttons------------------------------------------------------------
    const removeTask = (id: string) => {
        const filteredTasks = tasks.filter(elem => elem.id !== id)
        setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
            const newTask = {id: v1(), title: title.trim(), isDone: false} // Створюємо нову таску з обрізаними пробілами в тайтлі
            setTasks([newTask, ...tasks]) // Додаємо нову таску і все шо було в тасках раніше
    }
//--------------------------------------------------------------------

// Filter-------------------------------------------------------------
    let tasksFilter = tasks // Тут зберігаємо відфільтровані таски

    const filterTask = (filterValue: FilterType) => {
        setFilter(filterValue)
    }

    if (filter === 'Active') {
        tasksFilter = tasks.filter(elem => !elem.isDone)
    }

    if (filter === 'Completed') {
        tasksFilter = tasks.filter(elem => elem.isDone)
    }
//--------------------------------------------------------------------

// Checkbox-----------------------------------------------------------
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const task = tasks.find(task => task.id === taskId) // Записуємо в змінну таску, в якій id = тому id по якому ми клікнули
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }
//--------------------------------------------------------------------


    return (
        <Todolist tasks={tasksFilter}
                  removeTask={removeTask}
                  filterTask={filterTask}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}
                  filter={filter}
        />
    );
}

export default App;
