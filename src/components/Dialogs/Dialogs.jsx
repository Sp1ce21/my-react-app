import s from './Dialogs.module.css';
import React from 'react';
import Dialog from './Dialog/Dialog';
import Message from './Dialog/Message/Message';
import { Field, reduxForm } from 'redux-form';
import { required, maxLength } from '../../utils/validators/validators';
import {Textarea} from '../common/FormsControls/FormsControls'
const maxLength10 = maxLength(10)
export const DialogsReduxForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field validate={[
                required, maxLength10
            ]} component={Textarea} name={'messageText'} type={'textarea'} className={s.textarea} placeholder='Type a message...'></Field>
            <button className={s.btn}>Type</button>
        </form>
    )
}

export const LoginReduxForm = reduxForm({ form: 'addMessage' })(DialogsReduxForm)

function Dialogs(props) {
    let dialogs = props.dialogs;
    let messages = props.messages;
    let dialogsElements = dialogs.map(d => <Dialog id={d.id} name={d.name} />)
    let messagesElements = messages.map(m => <Message message={m.message} />)

    const onSubmit = (formData) => {
        props.addMessage(formData.messageText);
    }

    return (
        <div className={s.dialogsPage}>
            <h2>Dialogs</h2>
            <div className={s.row}>
                <ul className={s.dialogs}>
                    {dialogsElements}
                </ul>
                <hr />
                <div className={s.column}>
                    {messagesElements}
                    <LoginReduxForm onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    )
}
export default Dialogs;