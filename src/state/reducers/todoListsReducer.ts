import {v1} from "uuid";
import {TodoListType} from "../../api/todolist-api";

export type FilterType = "All" | "Active" | "Completed";
// Тип TodoListType + filter: FilterType
export type TodoListDomainType = TodoListType & {
    filter: FilterType
}

const initialState: Array<TodoListDomainType> = []

export const todoListsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(todoList => todoList.id !== action.todoListID)
        }
        case 'ADD-TODOLIST': {
            const newTodoList: TodoListDomainType = {
                id: action.newTodoListID,
                title: action.newTitle,
                filter: 'All',
                order: 1,
                addedDate: ''
            }
            return [newTodoList, ...state]
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
            return state
    }
}

type ActionsType =
    ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>

export const removeTodoListAC = (todoListID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todoListID
    } as const
}
export const addTodolistAC = (newTitle: string) => {
    return {
        type: "ADD-TODOLIST",
        newTitle,
        newTodoListID: v1()
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
