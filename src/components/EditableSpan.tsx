import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsTYpe = {
    value: string
    onChange: (newTitle: string) => void
}

const EditableSpan: React.FC<EditableSpanPropsTYpe> = (props) => {
    const [title, setTitle] = useState<string>(props.value)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    let [editMode, setEditMode] = useState<boolean>(false)
    return editMode
        ? <input value={title} onChange={(event) => onChangeInputHandler(event)} onBlur={activateViewMode} autoFocus={true}/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
};

export default EditableSpan;