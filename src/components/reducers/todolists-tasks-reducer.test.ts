import {addTodolistAC, tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todoLists-reducer";
import {TaskStateType, TodoListType} from "../../App";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {}
    const startTodoListsState: Array<TodoListType> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.newTodoListID)
    expect(idFromTodoLists).toBe(action.newTodoListID)
})
