import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType, IdType} from "../App";
import Button from "./Button";
import style from './Todolist.module.css'

type ObjectType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    tasks: Array<ObjectType>
    setTasks: (tasks: Array<ObjectType>) => void
    addTask: (newTitle: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

function Todolist(props: TodolistPropsType) {
    let tasksFilter = props.tasks
    const [filter, setFilter] = useState<FilterType>('All')
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


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
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
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

// For checkbox ------------------------------------------------------------
    const onCheckboxHandler = (taskId: string, isDone: boolean) => {
        props.changeTaskStatus(taskId, isDone)
    }
// For checkbox ------------------------------------------------------------

    const getElementFromState = tasksFilter.map((elem) => {
        return (
            <li key={elem.id}>
                <input type="checkbox"
                       checked={elem.isDone}
                       onChange={(event) => onCheckboxHandler(elem.id, event.currentTarget.checked)}
                />
                <span>{elem.title}</span>
                <Button name={'X'} callback={() => removeTask(elem.id)}/>
            </li>
        )
    })

    return (
        <div>
            <div>
                <input className={error ? style.error : ''}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                />
                <Button name={'+'} callback={addTaskHandler}/>
                {error && <div className={style.errorMessage}>{error}</div>}
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
