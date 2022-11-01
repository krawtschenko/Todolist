import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType, IdType} from "../App";
import Button from "./Button";

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
    const filterTask = (filterValue: FilterType) => {
        setFilter(filterValue)
    }

    if (filter === 'Active') {
        tasksFilter = props.tasks.filter(elem => !elem.isDone)
    }

    if (filter === 'Completed') {
        tasksFilter = props.tasks.filter(elem => elem.isDone)
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

    const classButtonAll = filter === 'All' ? 'activeFilter' : ''
    const classButtonActive = filter === 'Active' ? 'activeFilter' : ''
    const classButtonCompleted = filter === 'Completed' ? 'activeFilter' : ''
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

    const getElementFromState = tasksFilter.map((task) => {
        return (
            <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={(event) => onCheckboxHandler(task.id, event.currentTarget.checked)}
                />
                <span>{task.title}</span>
                <Button name={'X'} callback={() => removeTask(task.id)}/>
            </li>
        )
    })

    return (
        <div>
            <div>
                <input className={error ? 'error' : ''}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                />
                <Button name={'+'} callback={addTaskHandler}/>
                {error && <div className={'errorMessage'}>{error}</div>}
            </div>
            <ul>
                {getElementFromState}
            </ul>
            <div>
                <Button className={classButtonAll} name={'All'} callback={() => filterTask('All')}/>
                <Button className={classButtonActive} name={'Active'} callback={() => filterTask('Active')}/>
                <Button className={classButtonCompleted} name={'Completed'} callback={() => filterTask('Completed')}/>
            </div>
        </div>
    )
}

export default Todolist
