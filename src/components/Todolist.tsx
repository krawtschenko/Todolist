import React from "react";
import Button from "./Button";
import {FilterType, TaskType} from "../App";
import {AddItemForm} from "./AddItemForm";

type TodolistPropsType = {
    id: string
    title: string
    filter: FilterType
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (filterValue: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
}

function Todolist(props: TodolistPropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const removeTodoList = () => {
        props.removeTodolist(props.id)
    }

// Buttons------------------------------------------------------------
    const classButtonAll = props.filter === 'All' ? 'activeFilter' : ''
    const classButtonActive = props.filter === 'Active' ? 'activeFilter' : ''
    const classButtonCompleted = props.filter === 'Completed' ? 'activeFilter' : ''

    const onAllClickHandler = () => {
        props.changeFilter('All', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('Active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('Completed', props.id)
    }
//--------------------------------------------------------------------

    return (
        <div>
            <h3>
                {props.title}
                <Button name={'✖'} callback={removeTodoList}/>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map((task) => {
                    return (
                        <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={(event) => props.changeTaskStatus(task.id, event.currentTarget.checked, props.id)}/>
                            <span>{task.title}</span>
                            <Button name={'✖'} callback={() => props.removeTask(task.id, props.id)}/>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button className={classButtonAll} name={'All'} callback={onAllClickHandler}/>
                <Button className={classButtonActive} name={'Active'} callback={onActiveClickHandler}/>
                <Button className={classButtonCompleted} name={'Completed'} callback={onCompletedClickHandler}/>
            </div>
        </div>
    )
}

export default Todolist
