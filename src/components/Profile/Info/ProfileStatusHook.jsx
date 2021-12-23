import React, {useEffect, useState} from "react";
import s from './Info.module.css';
export const ProfileStatusHook = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect( () => {
        setStatus(props.status)
    }, [props.status])

    let activateEditMode = () => {
        setEditMode(true)
    }
    let deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status);
    }
    let onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }
        return (
            <div>
                { !editMode &&
                    <div className={s.point} onDoubleClick={props.uId === null && activateEditMode}>
                        Status: {props.status || 'There`s no status'}
                    </div>
                }
                { editMode &&
                    <input type="text" className={s.point} autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusChange} value={status}/>
                }
            </div>
        )
}
