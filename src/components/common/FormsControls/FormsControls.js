import s from './FormsControls.module.css';

export const FormControl = ({input, meta, ...props}) => {

    const hasError = meta.error && meta.touched; 

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
