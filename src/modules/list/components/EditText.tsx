import React from "react";
import { useState } from "react";

interface Props {
    value: string
    onChange(e: any): void
 }
const EditText = (props: Props) => {
    const [editMode, setEditMode] = useState(false);
    const {value, onChange} = props;

    const changeMode = () => {
        setEditMode(!editMode);
    }

    return (
        <div>
            {!editMode ?
                <label onClick={changeMode} style={{width: '100%'}}>{value}</label> :
                <input
                    value={value}
                    onBlur={changeMode}
                    onChange={onChange}
                    style={{width: '100%'}}
                />
            }
        </div>
    );
}

export default EditText;