import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "../components/Task";
import {action} from "@storybook/addon-actions";

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
    task: {id: '1', isDone: true, title: 'Javascript'},
    todoListId: 'todoList1',
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: false, title: 'React JS'},
    todoListId: 'todoList1',
};
