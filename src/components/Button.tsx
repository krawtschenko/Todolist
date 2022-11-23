import React from 'react';

type ButtonPropsType = {
    name: string
    callback: () => void
    className?: string
}

const UncontrolledButton: React.FC<ButtonPropsType> = (props) => {
    return (
        <button className={props.className} onClick={props.callback}>{props.name}</button>
    );
};

export default UncontrolledButton;