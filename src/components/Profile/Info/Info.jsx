import s from './Info.module.css';
import React from 'react';
import Preloader from '../../common/Preloader/Preloader'
import zoro from '../../../assets/images/zoro.jpg'
import {ProfileStatusHook} from './ProfileStatusHook'
function Info(props) {
    if (!props.profile) {
        return <Preloader />

    }

    return (
        <div className={s.row}>
            <div><img src={props.profile.photos.large ? props.profile.photos.large : zoro} alt="logo" className={s.logo} /></div>
            <div className={s.info}>
                <div className={s.name}>
                    {props.profile.fullName}
                </div>
                <ul className={s.column}>

                    <li className={s.point}>Date of Birth: 2 January</li>
                    <li className={s.point}>City: Minsk</li>
                    <li className={s.point}>Education: BSU'11</li>
                    <li className={s.point}>Web Site: {props.profile.contacts.twitter}</li>
                </ul>
                <ProfileStatusHook status={props.status} updateStatus={props.updateStatus} userId={props.userId} uId={props.uId}/>
            </div>
        </div>
    )
}
export default Info;
