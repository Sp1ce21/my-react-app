import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import defaultPhoto from '../../assets/images/zoro.jpg';

function Header(props) {
    return (
        <header className={s.header}>
            <NavLink to='/profile' className={s.logo}></NavLink>
            {props.isAuth ? <div>
                {/* {props.profile.photos.small ? <img src={props.profile.photos.small} alt='userPhoto' /> : <img src={defaultPhoto} alt='defaultUserPhoto' />} */}
                {/* <img src={props.profile.photos.small ? props.profile.photos.small : defaultPhoto} alt="logo" className={s.photo} /> */}
                {props.login} - <button onClick={props.logout}>Log out</button></div> : <NavLink to='/login' className={s.login}>Login</NavLink>}
        </header>
    )
}


export default Header;