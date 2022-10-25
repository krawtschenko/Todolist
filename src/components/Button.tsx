import React from 'react';

type ButtonPropsType = {
    name: string
    callback: () => void
}

const Button: React.FC<ButtonPropsType> = (props) => {
    return (
        <button onClick={props.callback}>{props.name}</button>
    );
};

export default Button;