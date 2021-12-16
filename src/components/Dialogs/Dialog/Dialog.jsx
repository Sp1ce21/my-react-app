import s from './Dialog.module.css';
import { NavLink } from 'react-router-dom';
function Dialog(props) {
    return (
            <li><NavLink to={'/dialogs/' + props.id} className={s.dialog} activeClassName={s.activeDialog}>{props.name}</NavLink></li>
    )
}
export default Dialog;