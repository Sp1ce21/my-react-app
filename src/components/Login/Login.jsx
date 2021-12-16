import React from "react";
import s from './Login.module.css';
import { Field, reduxForm } from 'redux-form';
import { required, maxLength } from '../../utils/validators/validators';
import { Input } from '../common/FormsControls/FormsControls'
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
const maxLength10 = maxLength(30)
export const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field validate={[
                required, maxLength10
            ]} name={'email'} placeholder={'Enter email...'} component={Input} type={'email'} />
            <Field validate={[
                required, maxLength10
            ]} name={'password'} type={'password'} placeholder={'Enter password...'} component={Input} />
            <Field name={'rememberMe'} type={'checkbox'} component={'input'} /> remember me
            {props.error && <div className={s.error}>{props.error}</div>}
            <button>Login</button>
        </form>
    )
}

export const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email,formData.password, formData.rememberMe);
        console.log(formData);
    }

    if(props.isAuth){
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
             
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

const mapStatetoProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStatetoProps, {login})(Login)