import {
    addTaskAC,
    addTodolistAC,
    changeTaskStatusAC,
    removeTaskAC,
    removeTodolistAC,
    tasksReducer,
    updateTaskTitleAC
} from './tasksReducer'
import {TaskStateType} from "../../App";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";

const startState: TaskStateType = {
    'todoListId1': [
        {
            description: '',
            title: 'CSS',
            status: TaskStatuses.new,
            priority: TaskPriorities.low,
            startDate: '',
            deadline: '',
            id: '1',
            todoListId: 'todoListId1',
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
            id: '2',
            todoListId: 'todoListId1',
            order: 1,
            addedDate: ''
        },
        {
            description: '',
            title: 'React',
            status: TaskStatuses.new,
            priority: TaskPriorities.low,
            startDate: '',
            deadline: '',
            id: '3',
            todoListId: 'todoListId1',
            order: 2,
            addedDate: ''
        }
    ],
    'todoListId2': [
        {
            description: '',
            title: 'Bred',
            status: TaskStatuses.new,
            priority: TaskPriorities.low,
            startDate: '',
            deadline: '',
            id: '1',
            todoListId: 'todoListId2',
            order: 0,
            addedDate: ''
        },
        {
            description: '',
            title: 'Milk',
            status: TaskStatuses.completed,
            priority: TaskPriorities.low,
            startDate: '',
            deadline: '',
            id: '2',
            todoListId: 'todoListId2',
            order: 1,
            addedDate: ''
        },
        {
            description: '',
            title: 'Banana',
            status: TaskStatuses.new,
            priority: TaskPriorities.low,
            startDate: '',
            deadline: '',
            id: '3',
            todoListId: 'todoListId2',
            order: 2,
            addedDate: ''
        }
    ]
}

beforeEach(() => {

})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('2', 'todoListId2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todoListId1': [
            {
                description: '',
                title: 'CSS',
                status: TaskStatuses.new,
                priority: TaskPriorities.low,
                startDate: '',
                deadline: '',
                id: '1',
                todoListId: 'todoListId1',
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
                id: '2',
                todoListId: 'todoListId1',
                order: 1,
                addedDate: ''
            },
            {
                description: '',
                title: 'React',
                status: TaskStatuses.new,
                priority: TaskPriorities.low,
                startDate: '',
                deadline: '',
                id: '3',
                todoListId: 'todoListId1',
                order: 2,
                addedDate: ''
            }
        ],
        'todoListId2': [
            {
                description: '',
                title: 'Bred',
                status: TaskStatuses.new,
                priority: TaskPriorities.low,
                startDate: '',
                deadline: '',
                id: '1',
                todoListId: 'todoListId2',
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'Banana',
                status: TaskStatuses.new,
                priority: TaskPriorities.low,
                startDate: '',
                deadline: '',
                id: '3',
                todoListId: 'todoListId2',
                order: 2,
                addedDate: ''
            }
        ]
    })
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC('juice', 'todoListId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(4)
    expect(endState['todoListId2'][0].id).toBeDefined()
    expect(endState['todoListId2'][0].title).toBe('juice')
    expect(endState['todoListId2'][0].status).toBe(TaskStatuses.new)
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC('2', TaskStatuses.new, 'todoListId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todoListId2'][1].status).toBe(TaskStatuses.new)
    expect(endState['todoListId1'][1].status).toBe(TaskStatuses.completed)
})

test('title of specified task should be changed', () => {

    const newTitle = 'Hello everybody!'

    const action = updateTaskTitleAC('2', newTitle, 'todoListId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todoListId2'][1].title).toBe(newTitle)
    expect(endState['todoListId1'][1].title).toBe('JS')
})

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todoListId1' && k !== 'todoListId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todoListId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})





