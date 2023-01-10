import {v1} from "uuid";
import {TaskStateType} from "../../App";
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/todolist-api";

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter(elem => elem.id !== action.taskID)
            }
        case "ADD-TASK":
            // const newTask: TaskType = {id: v1(), title: action.title.trim(), isDone: false}
            const newTask: TaskType = {
                description: '',
                title: action.title.trim(),
                status: TaskStatuses.new,
                priority: TaskPriorities.low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: action.todoListID,
                order: 0,
                addedDate: ''
            }
            return {...state, [action.todoListID]: [newTask, ...state[action.todoListID]]}
        case "CHANGE-STATUS":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(elem => elem.id === action.taskID ? {
                    ...elem,
                    status: action.status
                } : elem)
            }
        case "UPDATE-TITLE":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(elem => elem.id === action.taskID ? {
                    ...elem,
                    title: action.newTitle
                } : elem)
            }
        case "ADD-TODOLIST":
            return {...state, [action.newTodoListID]: []}
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state, [action.todoListID]: [...state[action.todoListID]]}
            delete stateCopy[action.todoListID]
            return stateCopy
        default:
            return state
    }
}

type ActionsType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC> | ReturnType<typeof updateTaskTitleAC>
    | ReturnType<typeof addTodolistAC> | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>

export const removeTaskAC = (taskID: string, todoListID: string) => {
    return {
        type: "REMOVE-TASK",
        taskID,
        todoListID
    } as const
}

export const addTaskAC = (title: string, todoListID: string) => {
    return {
        type: "ADD-TASK",
        title,
        todoListID
    } as const
}

export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todoListID: string) => {
    return {
        type: "CHANGE-STATUS",
        taskID,
        status,
        todoListID
    } as const
}

export const updateTaskTitleAC = (taskID: string, newTitle: string, todoListID: string) => {
    return {
        type: "UPDATE-TITLE",
        taskID,
        newTitle,
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

export const removeTodolistAC = (todoListID: string) => {
    return {
        type: "REMOVE-TODOLIST",
        todoListID
    } as const
}

