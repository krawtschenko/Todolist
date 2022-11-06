import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from "./Button";
import {FilterType, ObjectType} from "../App";

type TodolistPropsType = {
    tasks: Array<ObjectType>
    removeTask: (id: string) => void
    filterTask: (filterValue: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: string
}

function Todolist(props: TodolistPropsType) {
    const [title, setTitle] = useState('') // Те що всередині інпута
    const [error, setError] = useState<string | null>(null) // Для класу "Помилка"

    const onClickAddTaskHandler = () => {
        if (title.trim() !== '') { // Якшо відрізаємо спейси на початку і в кінці і залишається не пустий рядок
            props.addTask(title)
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
                       onChange={(event) => props.changeTaskStatus(task.id, event.currentTarget.checked)}
                />
                <span>{task.title}</span>
                <Button name={'✖'} callback={() => props.removeTask(task.id)}/>
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
                <Button name={'+'} callback={onClickAddTaskHandler}/>
                {error && <div className={'errorMessage'}>{error}</div>}
            </div>
            <ul>
                {elementsForList}
            </ul>
            <div>
                <Button className={classButtonAll} name={'All'} callback={() => props.filterTask('All')}/>
                <Button className={classButtonActive} name={'Active'} callback={() => props.filterTask('Active')}/>
                <Button className={classButtonCompleted} name={'Completed'}
                        callback={() => props.filterTask('Completed')}/>
            </div>
        </div>
    )
}

export default Todolist
