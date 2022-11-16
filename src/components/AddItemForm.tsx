import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from "./Button";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
    // Те що всередині інпута
    const [title, setTitle] = useState('')
    // Для класу "error"
    const [error, setError] = useState<string | null>(null)

    const onClickAddTaskHandler = () => {
        // Якшо відрізаємо пробіли на початку та в кінці і залишається не пустий рядок
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    // При зміні середини інпута виконується функція
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        // Записуємо, те що ввели в інпуті, в тайтл, який передаємо в велью інпута
        setTitle(event.currentTarget.value)
    }
    // Коли натискаємо будь яку кнопку в інпуті
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        // Якшо кнопка ентер
        if (event.key === 'Enter') {
            onClickAddTaskHandler()
        }
    }

    return (
        <div>
            <input className={error ? 'error' : ''}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}/>
            <Button name={'+'} callback={onClickAddTaskHandler}/>
            {error && <div className={'errorMessage'}>{error}</div>}
        </div>
    );
};