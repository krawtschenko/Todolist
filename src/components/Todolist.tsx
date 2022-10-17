import React, {useState} from "react";
import {FilterType, IdType} from "../App";

type TodolistPropsType = {
  title: string
  tasks: ObjectType[]
  removeTask: (id: IdType) => void
}

type ObjectType = {
  id: number
  title: string
  isDone: boolean
}

function Todolist(props: TodolistPropsType) {

  let tasksFilter = props.tasks
  let [filter, setFilter] = useState<FilterType> ('All')

  if (filter === 'Active') {
    tasksFilter = props.tasks.filter(elem => !elem.isDone)
  }

  if (filter === 'Completed') {
    tasksFilter = props.tasks.filter(elem => elem.isDone)
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
            <li key={elem.id}><input type="checkbox" defaultChecked={elem.isDone}/> <span>{elem.title}</span>
              <button onClick={() => {
                props.removeTask(elem.id)
              }}>X
              </button>
            </li>
          )
        })}
      </ul>
      <div>
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
