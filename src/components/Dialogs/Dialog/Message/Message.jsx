import s from './Message.module.css';
function Message(props) {
    return (
        <div className={s.message}>
            <div className={s.logo}></div>
            <div className={s.text}>{props.message}</div>
        </div>
    )
}
export default Message;