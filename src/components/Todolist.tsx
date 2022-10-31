import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType, IdType} from "../App";
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
    let [title, setTitle] = useState('')

// For filter --------------------------------------------------------------
    if (filter === 'Active') {
        tasksFilter = props.tasks.filter(elem => !elem.isDone)
    }

    if (filter === 'Completed') {
        tasksFilter = props.tasks.filter(elem => elem.isDone)
    }

    const filterTask = (filterValue: FilterType) => {
        setFilter(filterValue)
    }
// For filter --------------------------------------------------------------


// For buttons -------------------------------------------------------------
    const removeTask = (id: IdType) => {
        props.setTasks(props.tasks.filter(elem => elem.id !== id))
    }

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }
// For buttons -------------------------------------------------------------

// For input ---------------------------------------------------------------
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
// For input ---------------------------------------------------------------

    const getElementFromState = tasksFilter.map((elem) => {
        return (
            <li key={elem.id}><input type="checkbox" defaultChecked={elem.isDone}/>
                <span>{elem.title}</span>
                <Button name={'X'} callback={() => removeTask(elem.id)}/>
            </li>
        )
    })

    return (
        <div>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>
                <Button name={'+'} callback={addTaskHandler}/>
            </div>
            <ul>
                {getElementFromState}
            </ul>
            <div>
                <Button name={'All'} callback={() => filterTask('All')}/>
                <Button name={'Active'} callback={() => filterTask('Active')}/>
                <Button name={'Completed'} callback={() => filterTask('Completed')}/>
            </div>
        </div>
    )
}

export default Todolist
