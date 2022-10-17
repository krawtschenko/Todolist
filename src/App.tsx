import React, {useState} from 'react';
import './App.css';
import Todolist from "./components/Todolist";

export type IdType = number;
export type FilterType = 'All' | 'Active' | 'Completed'

function App() {
  const title = 'Hallo!'

  let [tasks, setTasks] = useState([
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "ReactJS", isDone: false},
    {id: 4, title: "ReactJS", isDone: false},
  ])

  const removeTask = (id: IdType) => {
    setTasks(tasks.filter(elem => elem.id !== id))
  }

  return (
    <>
      <Todolist title={title} tasks={tasks} removeTask={removeTask}/>
    </>
  );
}

export default App;
