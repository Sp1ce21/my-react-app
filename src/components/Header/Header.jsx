import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

function Header(props) {
    return (
        <header className={s.header}>
            <NavLink to='/profile' className={s.logo}></NavLink>
            {props.isAuth ? props.login : <NavLink to='/login' className={s.login}>Login</NavLink>}
        </header>
    )
}
export default Header;