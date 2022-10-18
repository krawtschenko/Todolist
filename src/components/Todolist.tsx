import React, {useState} from "react";
import {FilterType, IdType} from "../App";

type TodolistPropsType = {
    title: string
    tasks: ObjectType[]
    removeTask: (id: IdType) => void
    removeAllTasks: () => void
}

type ObjectType = {
    id: number
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
        tasksFilter = props.tasks.filter(elem => elem.id === 1 || elem.id === 2 || elem.id === 3)
    }

    const filterTask = (filterValue: FilterType) => {
        setFilter(filterValue)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksFilter.map((elem) => {
                    return (
                        <li key={elem.id}><input type="checkbox" defaultChecked={elem.isDone}/>
                            <span>{elem.title}</span>
                            <button onClick={() => {
                                props.removeTask(elem.id)
                            }}>X
                            </button>
                        </li>
                    )
                })}
            </ul>
            <button onClick={() => {props.removeAllTasks()}}>DELETE ALL TASKS</button>
            <div>
                <button onClick={() => {
                    filterTask("Three")
                }}>
                    Give me the first three
                </button>
                <button onClick={() => {
                    filterTask('All')
                }}>All
                </button>
                <button onClick={() => {
                    filterTask('Active')
                }}>Active
                </button>
                <button onClick={() => {
                    filterTask('Completed')
                }}>Completed
                </button>
            </div>
        </div>
    )
}

export default Todolist
