import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType = {
    newTitle: string
    setNewTitle: (newTitle: string) => void
    addTaskHandler: () => void
}

const Input: React.FC<InputPropsType> = (props) => {
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.addTaskHandler()
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setNewTitle(event.currentTarget.value)
    }

    return (
        <input value={props.newTitle} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>
    );
};

export default Input;