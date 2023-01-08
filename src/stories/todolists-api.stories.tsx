import React, {useEffect, useState} from 'react'
import {taskAPI, todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

// TodoLists
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTodolist()
            .then(response => setState(response.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('HEARTHSTONE')
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '74ca0bc7-f0c3-4bda-bf17-6d9e2a88f92d'
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId)
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = ''
    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, 'WarCraft')
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

// Tasks
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '843ed069-6dd3-4cee-b9d7-1b919de7b08a'
        taskAPI.getTasks(todoListId)
            .then(response => setState(response.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '843ed069-6dd3-4cee-b9d7-1b919de7b08a'
        taskAPI.createTask(todoListId, 'VARIAN')
            .then(response => setState(response.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '843ed069-6dd3-4cee-b9d7-1b919de7b08a'
    const taskId = 'a2547394-5263-4b86-a6f6-883575f59f2a'
    useEffect(() => {
        taskAPI.deleteTask(todolistId, taskId)
            .then(response => setState(response.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '843ed069-6dd3-4cee-b9d7-1b919de7b08a'
    const taskId = '28b7e70f-59d7-415f-83aa-ddb6d06189ea'
    const model = {
        title: 'JAINA',
        description: 'WAR',
        status: 2,
        priority: 2,
        startDate: '',
        deadline: ''
    }
    useEffect(() => {
        taskAPI.updateTask(todolistId, taskId, model)
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

