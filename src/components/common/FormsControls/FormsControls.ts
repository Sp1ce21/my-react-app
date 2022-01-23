import s from './FormsControls.module.css';

type FormControl = ({meta: {touched, error}, children: React.ReactNode}) => 

export const FormControl = ({meta: {touched, error}, children}): FormControl => {

    const hasError = error && touched; 

    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            {props.children}
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
    )
}

export const Input = (props) => {
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}><input {...input} {...restProps}/></FormControl>
    )
}
