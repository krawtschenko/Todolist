import React from 'react';
import './App.css';
import Todolist from "./components/Todolist";

function App() {
  const title1 = 'Hallo!',
    title2 = 'Hello World'

  const tasks1 = [
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "ReactJS", isDone: false },
  ]
  const tasks2 = [
    { id: 1, title: "Hello world", isDone: true },
    { id: 2, title: "I am Happy", isDone: false },
    { id: 3, title: "Yo", isDone: false }
  ]

  return (
    <>
      <Todolist title={title1} tasks={tasks1}/>
      <Todolist title={title2} tasks={tasks2}/>
    </>
  );
}

export default App;
