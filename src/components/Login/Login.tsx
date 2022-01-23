import React from "react";
import s from './Login.module.css';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { required, maxLength } from '../../utils/validators/validators';
import { Input } from '../common/FormsControls/FormsControls'
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import { appStateType } from "../../redux/store";
const maxLength10 = maxLength(30)
export const LoginForm: React.FC<InjectedFormProps<loginFormValuesType, loginFormOwnProps> & loginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field validate={[
                required, maxLength10
            ]} name={'email'} placeholder={'Enter email...'} component={Input} type={'email'} />
            <Field validate={[
                required, maxLength10
            ]} name={'password'} type={'password'} placeholder={'Enter password...'} component={Input} />
            <Field name={'rememberMe'} type={'checkbox'} component={'input'} /> remember me
            {error && <div className={s.error}>{error}</div>}
            {captchaUrl && 
            <div className={s.column}>
            <img src={captchaUrl} alt="captcha"/>
            <Field validate={[
                required, maxLength10
            ]} name={'captcha'} type={'text'} placeholder={'Enter captcha...'} component={Input} />
            </div>}
            <button>Login</button>
        </form>
    )
}

export const LoginReduxForm = reduxForm<loginFormValuesType, loginFormOwnProps>({ form: 'login' })(LoginForm)


type loginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

const Login: React.FC<mapStateToProps & mapDispatchToProps> = ({login, isAuth, captchaUrl}) => {

    const onSubmit = (formData: loginFormValuesType) => {
        login(formData.email,formData.password, formData.rememberMe, formData.captcha);
        console.log(formData);
    }

    if(isAuth){
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
             
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    )
}

type mapStateToProps = {
    captchaUrl: string | null
    isAuth: boolean
}
type mapDispatchToProps = {
    login: (
        email: string | null, 
        password: string | null, 
        rememberMe: boolean, 
        captcha: string | null
        )=>void
}
type loginFormOwnProps = {
    captchaUrl: string | null
}

const mapStateToProps = (state: appStateType): mapStateToProps => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login})(Login)