import React from "react";

type TodolistPropsType = {
  title: string
  tasks: ObjectType[]
}

type ObjectType = {
  id: number,
  title: string,
  isDone: boolean
}

function Todolist(props: TodolistPropsType) {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input/>
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map((elem, index) => {
          return (
            <li key={index}><input type="checkbox" defaultChecked={elem.isDone}/> <span>{elem.title}</span></li>
          )
        })}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
}

export default Todolist
