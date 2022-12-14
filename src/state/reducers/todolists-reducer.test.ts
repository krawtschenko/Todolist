import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, FilterType,
    removeTodoListAC, TodoListDomainType,
    todoListsReducer
} from './todoListsReducer'
import {v1} from 'uuid'

let todolistId1: string
let todolistId2: string
let startState: Array<TodoListDomainType>

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'All', order: 0, addedDate: ''},
        {id: todolistId2, title: 'What to buy', filter: 'All', order: 1, addedDate: ''}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {

    const newTodolistTitle = 'New Todolist'

    const endState = todoListsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'

    const endState = todoListsReducer(startState, changeTodoListTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterType = 'Completed'

    const endState = todoListsReducer(startState, changeTodoListFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
})



