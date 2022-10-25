import React, {useState} from "react";
import {FilterType, IdType} from "../App";
import Input from "./Input";
import Button from "./Button";

type TodolistPropsType = {
    tasks: Array<ObjectType>
    setTasks: (tasks: Array<ObjectType>) => void
    addTask: (newTitle: string) => void
}

type ObjectType = {
    id: string
    title: string
    isDone: boolean
}

function Todolist(props: TodolistPropsType) {
    let tasksFilter = props.tasks
    let [filter, setFilter] = useState<FilterType>('All')
    let [newTitle, setNewTitle] = useState('')

    if (filter === 'Active') {
        tasksFilter = props.tasks.filter(elem => !elem.isDone)
    }

    if (filter === 'Completed') {
        tasksFilter = props.tasks.filter(elem => elem.isDone)
    }

    if (filter === 'Three') {
        tasksFilter = props.tasks.filter((elem, index) => index === 0 || index === 1 || index === 2)
    }

    const filterTask = (filterValue: FilterType) => {
        setFilter(filterValue)
    }

    const removeAllTasks = () => {
        props.setTasks([])
    }

    const removeTask = (id: IdType) => {
        props.setTasks(props.tasks.filter(elem => elem.id !== id))
    }

    const addTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }

    return (
        <div>
            <div>
                <Input newTitle={newTitle} setNewTitle={setNewTitle} addTaskHandler={addTaskHandler}/>
                <Button name={'+'} callback={addTaskHandler}/>
            </div>
            <ul>
                {tasksFilter.map((elem) => {
                    return (
                        <li key={elem.id}><input type="checkbox" defaultChecked={elem.isDone}/>
                            <span>{elem.title}</span>
                            <Button name={'X'} callback={() => removeTask(elem.id)}/>
                        </li>
                    )
                })}
            </ul>
            <Button name={'Remove All'} callback={removeAllTasks}/>
            <div>
                <Button name={'Give me the first three'} callback={() => filterTask('Three')}/>
                <Button name={'All'} callback={() => filterTask('All')}/>
                <Button name={'Active'} callback={() => filterTask('Active')}/>
                <Button name={'Completed'} callback={() => filterTask('Completed')}/>
            </div>
        </div>
    )
}

export default Todolist
