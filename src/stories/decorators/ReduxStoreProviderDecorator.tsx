import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, legacy_createStore} from 'redux'
import {v1} from 'uuid'
import {AppRootStateType} from '../../state/store'
import {tasksReducer} from "../../state/reducers/tasksReducer";
import {todoListsReducer} from "../../state/reducers/todoListsReducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'All', order: 0, addedDate: ''},
        {id: 'todolistId2', title: 'What to buy', filter: 'All', order: 1, addedDate: ''}
    ],
    tasks: {
        'todolistId1': [
            {
                description: '',
                title: 'HTML&CSS',
                status: TaskStatuses.completed,
                priority: TaskPriorities.low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'JS',
                status: TaskStatuses.completed,
                priority: TaskPriorities.low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: 'todolistId1',
                order: 1,
                addedDate: ''
            }
        ],
        'todolistId2': [
            {
                description: '',
                title: 'Milk',
                status: TaskStatuses.completed,
                priority: TaskPriorities.low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: 'todolistId2',
                order: 1,
                addedDate: ''
            },
            {
                description: '',
                title: 'Potato',
                status: TaskStatuses.completed,
                priority: TaskPriorities.low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: 'todolistId2',
                order: 2,
                addedDate: ''
            }
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState)

export const ReduxStoreProviderDecorator = (story: any) => (
    <Provider
        store={storyBookStore}>{story()}
    </Provider>)
