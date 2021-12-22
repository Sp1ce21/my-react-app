import React from "react";
import { NavLink } from "react-router-dom";
import userPhoto from '../../assets/images/zoro.jpg';
import Pagination from "./Pagination";
import s from './Users.module.css';
let Users = (props) => {
    return (
        <div>
            
            <Pagination {...props}/>

            <div className={s.block}>
                {
                    props.users.map(u => <div key={u.id} className={s.column}>
                        <div className={s.item}>
                            <div className={s.leftPart}>
                                <NavLink to={'/profile/' + u.id}>
                                    <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="logo" className={s.logo} />
                                </NavLink>
                                <div>
                                    {u.followed
                                        ? <button disabled={props.isFollowing.some(id => id === u.id)} className={s.btn} onClick={() => {
                                            props.unfollowTC(u.id)
                                        }}>Unfollow</button>
                                        : <button disabled={props.isFollowing.some(id => id === u.id)} className={s.btn} onClick={() => {
                                            props.followTC(u.id)
                                        }}>Follow</button>}
                                </div>
                            </div>
                            <div className={s.rightPart}>
                                <div className={s.itemColumn}>
                                    <div className={s.name}>{u.name}</div>
                                    <div className={s.status}>{u.status}</div>
                                </div>
                                <div className={s.itemColumn}>
                                    <div className={s.country}>{'u.location.country'}</div>
                                    <div className={s.city}>{'u.location.city'}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    )
                }
            </div>
        </div>
    )
}

export default Users;