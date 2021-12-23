import React from "react";
import s from './Users.module.css';
let Pagination = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    let firstPage = 1;
    let n = null;
    let lastPage = props.totalUsersCount;
    for (let i = 2; i <= pagesCount - 1; i++) {
        pages.push(i);
        if (i > 15) {
            break;
        }
        if(i === n){
            i++
        }
    }



    return (
        <div>
            <h2 className={s.title}>Users</h2>
            <div className={s.numbers}>

                {<div className={s.justNumber + " " + (props.currentPage === firstPage ? s.selectedNumber : '')}
                    onClick={() => { props.onPageChanged(firstPage) }}>{firstPage}</div>}

                {pages.map(elem => {
                    return <div className={s.justNumber + " " + (props.currentPage === elem ? s.selectedNumber : '')}
                        onClick={() => { props.onPageChanged(elem) }}>{elem}</div>
                })}

                {<div className={s.justNumber + " " + (props.currentPage === lastPage ? s.selectedNumber : '')}
                    onClick={() => { props.onPageChanged(lastPage) }}>{lastPage}</div>}
{/* {elem !== firstPage + 1 && '...'} */}
            </div>
        </div>
    )
}
export default Pagination;