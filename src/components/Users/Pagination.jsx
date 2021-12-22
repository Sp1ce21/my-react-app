import React from "react";
import s from './Users.module.css';
let Pagination = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
        if (i > 29) {
            break; 
        }
        
    }



    return (
        <div>
            <h2 className={s.title}>Users</h2>
            <div className={s.numbers}>
                {pages.map(elem => {
                    return <div className={s.justNumber + " " + (props.currentPage === elem ? s.selectedNumber : '')}
                        onClick={() => { props.onPageChanged(elem) }}>{elem}</div>
                })}
            </div>
        </div>
    )
}
export default Pagination;