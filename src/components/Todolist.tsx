import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from "./Button";
import {v1} from "uuid";

type IdType = string;
type FilterType = 'All' | 'Active' | 'Completed'
type ObjectType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    tasks: Array<ObjectType>
    setTasks: (tasks: Array<ObjectType>) => void
}

function Todolist(props: TodolistPropsType) {
    let tasksFilter = props.tasks // Тут зберігаємо відфільтровані таски
    const [filter, setFilter] = useState<FilterType>('All')
    const [title, setTitle] = useState('') // Те що всередині інпута
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

    const addTask = () => { // Якшо відрізаємо спейси на початку і в кінці і залишається не пустий рядок
        if (title.trim() !== '') {
            const newTask = {id: v1(), title: title.trim(), isDone: false} // Створюємо нову таску з обрізаними пробілами в тайтлі
            props.setTasks([newTask, ...props.tasks]) // Додаємо нову таску і все шо було в тасках раніше
            setTitle('') // Чистимо середину інпута
        } else {
            setError('Title is required')
        }
    }

    const classButtonAll = filter === 'All' ? 'activeFilter' : ''
    const classButtonActive = filter === 'Active' ? 'activeFilter' : ''
    const classButtonCompleted = filter === 'Completed' ? 'activeFilter' : ''
// For buttons -------------------------------------------------------------

// For input ---------------------------------------------------------------
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => { // При зміні середини інпута виконується функція
        setError(null)
        setTitle(event.currentTarget.value) // Записуємо, те що ввели в інпуті, в тайтл, який передаємо в велью інпута
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => { // Коли натискаємо будь яку кнопку в інпуті
        if (event.key === 'Enter') { // Якшо кнопка ентер
            addTask()
        }
    }
// For input ---------------------------------------------------------------

// For checkbox ------------------------------------------------------------
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const task = props.tasks.find(task => task.id === taskId) // Записуємо в змінну таску, в якій id = тому id по якому ми клікнули
        if (task) {
            task.isDone = isDone
            props.setTasks([...props.tasks])
        }
    }
// For checkbox ------------------------------------------------------------

    const elementsForList = tasksFilter.map((task) => {
        return (
            <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={(event) => changeTaskStatus(task.id, event.currentTarget.checked)}
                />
                <span>{task.title}</span>
                <Button name={'✖'} callback={() => removeTask(task.id)}/>
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
                <Button name={'+'} callback={addTask}/>
                {error && <div className={'errorMessage'}>{error}</div>}
            </div>
            <ul>
                {elementsForList}
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
