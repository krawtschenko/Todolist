import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType, IdType} from "../App";

type TodolistPropsType = {
    title: string
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

    let [newTitle, setNewTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const addTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTitle} onKeyDown={onKeyPressHandler} onChange={onChangeHandler}/>
                <button onClick={
                    addTaskHandler
                }>+
                </button>
            </div>
            <ul>
                {tasksFilter.map((elem) => {
                    const removeTaskHandler = () => {
                        removeTask(elem.id)
                    }
                    return (
                        <li key={elem.id}><input type="checkbox" defaultChecked={elem.isDone}/>
                            <span>{elem.title}</span>
                            <button onClick={removeTaskHandler}>X
                            </button>
                        </li>
                    )
                })}
            </ul>
            <button onClick={() =>
                removeAllTasks()
            }>DELETE ALL TASKS
            </button>
            <div>
                <button onClick={() =>
                    filterTask("Three")
                }>
                    Give me the first three
                </button>
                <button onClick={() =>
                    filterTask('All')
                }>All
                </button>
                <button onClick={() =>
                    filterTask('Active')
                }>Active
                </button>
                <button onClick={() =>
                    filterTask('Completed')
                }>Completed
                </button>
            </div>
        </div>
    )
}

export default Todolist
