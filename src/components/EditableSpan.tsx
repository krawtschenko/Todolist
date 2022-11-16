import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsTYpe = {
    value: string
    onChange: (newTitle: string) => void
}

const EditableSpan: React.FC<EditableSpanPropsTYpe> = (props) => {
    let [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.value)

    // Активується коли 2 рази клікаємо по span
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }

    // Активується коли зникає фокус з input
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    // Активується коли щось пишемо в input
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return editMode
        ? <input value={title} onChange={(event) => onChangeInputHandler(event)} onBlur={activateViewMode} autoFocus={true}/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
};

export default EditableSpan;