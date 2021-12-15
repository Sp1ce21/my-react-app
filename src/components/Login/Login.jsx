import React from "react";
import s from './Login.module.css';
import { Field, reduxForm } from 'redux-form';
import { required, maxLength } from '../../utils/validators/validators';
import { Input } from '../common/FormsControls/FormsControls'
const maxLength10 = maxLength(10)
export const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field validate={[
                required, maxLength10
            ]} name={'email'} placeholder={'Enter email...'} component={Input} type={'email'} />
            <Field validate={[
                required, maxLength10
            ]} name={'password'} placeholder={'Enter password...'} component={Input} />
            <Field validate={[
                required, maxLength10
            ]} name={'rememberMe'} type={'checkbox'} component={'input'} /> remember me
            <button>Login</button>
        </form>
    )
}

export const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {

    const onSubmit = (formData) => {
        console.log(formData);
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

export default Login