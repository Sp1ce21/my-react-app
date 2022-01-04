import s from './Nav.module.css';
import Icon from './Icon/Icon';
import { NavLink } from 'react-router-dom';
function Nav(props) {
    let friendsElements = props.friends.map(d => <Icon id={d.id} name={d.name} />)

    return (
        <nav className={s.nav}>
            <ul>
                <li><NavLink to='/profile' exact activeClassName={s.appActive} className={s.link} onClick={props.clearUId}>Profile</NavLink></li>
                <li><NavLink to='/dialogs' activeClassName={s.appActive} className={s.link}>Dialogs</NavLink></li>
                <li><NavLink to='/users' activeClassName={s.appActive} className={s.link}>Users</NavLink></li>
                {/* <li><NavLink to='/music' activeClassName={s.appActive} className={s.link}>Music</NavLink></li>
                <li><NavLink to='/settings' activeClassName={s.appActive} className={s.link}>Settings</NavLink></li> */}
                <li className={s.friends}>Friends</li>
                <li className={s.row}>
                    {friendsElements}
                </li>
            </ul>
        </nav>
    )
}
export default Nav;