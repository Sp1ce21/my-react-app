import s from './Users.module.css';

type Props = {
    totalItemsCount: number
    portionSize?: number
    updateCurrentPortion: Function
    currentPortion: number 
    currentPage: number
    onPageChanged: (currentPage: number)=>void
    pageSize: number
}

let Pagination: React.FC<Props> = ({ totalItemsCount, portionSize = 15,updateCurrentPortion, currentPortion, currentPage, onPageChanged, pageSize }) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let leftPortionNumber = (currentPortion - 1) * portionSize + 1;
    let rightPortionNumber = currentPortion * portionSize ;


    return (
        <div>
            <h2 className={s.title}>Users</h2>
                {currentPortion > 1 && <button onClick={() => { updateCurrentPortion(currentPortion - 1) }}>Prev</button>}
                {currentPortion !== portionCount && <button onClick={() => { updateCurrentPortion(currentPortion + 1) }}>Next</button>}
            <div className={s.numbers}>



                {pages
                    .filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
                    .map(elem => {
                        return <div className={s.justNumber + " " + (currentPage === elem ? s.selectedNumber : '')}
                            onClick={() => { onPageChanged(elem); }}>{elem}</div>
                    })}
                

            </div>
        </div>
    )
}
export default Pagination;