import React from "react";
import Pagination from "./Pagination";
import User from "./User";
import s from './Users.module.css';
let Users = ({users, isFollowing, unfollowTC, followTC, ...props}) => {
    return (
        <div>
            <Pagination {...props}/>
            <div className={s.block}>
                {
                    users.map(u => 
                        <User u={u} isFollowing={isFollowing} unfollowTC={unfollowTC} followTC={followTC}/>
                    )
                }
            </div>
        </div>
    )
}

export default Users;