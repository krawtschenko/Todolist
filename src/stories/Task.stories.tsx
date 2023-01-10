import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "../components/Task";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

export default {
    title: 'TodoList/Task',
    component: Task
} as ComponentMeta<typeof Task>;

const changeTaskStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('Title changed')
const removeTaskCallback = action('Remove button was clicked')

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback
}

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {
        description: '',
        title: 'Javascript',
        status: TaskStatuses.completed,
        priority: TaskPriorities.low,
        startDate: '',
        deadline: '',
        id: '1',
        todoListId: 'todoList1',
        order: 1,
        addedDate: ''
    },
    todoListId: 'todoList1',
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {
        description: '',
        title: 'React',
        status: TaskStatuses.new,
        priority: TaskPriorities.low,
        startDate: '',
        deadline: '',
        id: '1',
        todoListId: 'todoList1',
        order: 1,
        addedDate: ''
    },
    todoListId: 'todoList1',
};
