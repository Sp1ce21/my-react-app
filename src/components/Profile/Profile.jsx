import Info from './Info/Info';
import PostsContainer from './Posts/PostsContainer';
import s from './Profile.module.css';
import React from 'react';
function Profile(props) {
    return (
        <div className={s.profile}>
            <div className={s.img}></div>
            <Info profile={props.profile} status={props.status} updateStatus={props.updateStatus} userId={props.userId} uId={props.uId}/>
            <PostsContainer store={props.store}/>
        </div>
    )
    
}
export default Profile;