import s from './Icon.module.css';

function Icon(props) {
    return (
        <div className={s.icon}>
            <div className={s.img}></div>
            <div className={s.name}>{props.name}</div>
        </div>
    )
}
export default Icon;