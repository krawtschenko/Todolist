import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from "./Button";
import {FilterType, TaskType} from "../App";

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (filterValue: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterType
    removeTodolist: (id: string) => void
}

function Todolist(props: TodolistPropsType) {
    const [title, setTitle] = useState('') // Те що всередині інпута
    const [error, setError] = useState<string | null>(null) // Для класу "Помилка"

    const onClickAddTaskHandler = () => {
        if (title.trim() !== '') { // Якшо відрізаємо спейси на початку і в кінці і залишається не пустий рядок
            props.addTask(title, props.id)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => { // При зміні середини інпута виконується функція
        setError(null)
        setTitle(event.currentTarget.value) // Записуємо, те що ввели в інпуті, в тайтл, який передаємо в велью інпута
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => { // Коли натискаємо будь яку кнопку в інпуті
        if (event.key === 'Enter') { // Якшо кнопка ентер
            onClickAddTaskHandler()
        }
    }

    const classButtonAll = props.filter === 'All' ? 'activeFilter' : ''
    const classButtonActive = props.filter === 'Active' ? 'activeFilter' : ''
    const classButtonCompleted = props.filter === 'Completed' ? 'activeFilter' : ''

    const elementsForList = props.tasks.map((task) => {
        return (
            <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={(event) => props.changeTaskStatus(task.id, event.currentTarget.checked, props.id)}
                />
                <span>{task.title}</span>
                <Button name={'✖'} callback={() => props.removeTask(task.id, props.id)}/>
            </li>
        )
    })

    return (
        <div>
            {props.title}
            <Button name={'✖'} callback={() => {props.removeTodolist(props.id)}}/>
            <div>
                <input className={error ? 'error' : ''}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                />
                <Button name={'+'} callback={onClickAddTaskHandler}/>
                {error && <div className={'errorMessage'}>{error}</div>}
            </div>
            <ul>
                {elementsForList}
            </ul>
            <div>
                <Button className={classButtonAll} name={'All'} callback={() => props.changeFilter('All', props.id)}/>
                <Button className={classButtonActive} name={'Active'} callback={() => props.changeFilter('Active', props.id)}/>
                <Button className={classButtonCompleted} name={'Completed'}
                        callback={() => props.changeFilter('Completed', props.id)}/>
            </div>
        </div>
    )
}

export default Todolist
