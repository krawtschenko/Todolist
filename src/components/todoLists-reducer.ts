import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";

export const todoListsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(todoList => todoList.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            const newTodoList: TodolistType = {id: v1(), title: action.payload.title, filter: 'All'}
            return [...state, newTodoList]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(todoList => todoList.id === action.payload.id ? {
                ...todoList,
                title: action.payload.title
            } : todoList)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(todoList => todoList.id === action.payload.id ? {
                ...todoList,
                filter: action.payload.filter
            } : todoList)
        }
        default:
            throw new Error("I don't understand this type")
    }
}

type ActionsType =
    ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>

export const removeTodoListAC = (todoListID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todoListID
        }
    } as const
}
export const addTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title: title
        }
    } as const
}
export const changeTodoListTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title
        }
    } as const
}
export const changeTodoListFilterAC = (id: string, filter: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        }
    } as const
}