import React from "react";
import { NavLink } from "react-router-dom";
import userPhoto from '../../assets/images/zoro.jpg';
import s from './Users.module.css';
let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
        if (i > 29) {
            break; //!!!!!!!!!!!!!!!!!!
        }
    }



    return (
        <div>
            <h2 className={s.title}>Users</h2>
            <div className={s.numbers}>
                {pages.map(elem => {
                    return <div className={props.currentPage === elem && s.selectedNumber, s.justNumber}
                        onClick={() => { props.onPageChanged(elem) }}>{elem}</div>
                })}
            </div>

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
                                        ? <button disabled={props.isFollowing.some(id => id == u.id)} className={s.btn} onClick={() => {
                                            props.unfollowTC(u.id)
                                        }}>Unfollow</button>
                                        : <button disabled={props.isFollowing.some(id => id == u.id)} className={s.btn} onClick={() => {
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