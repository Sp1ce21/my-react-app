type friendsType = {
    id: number
    name: string
}

let initialState = {
friends: [
    { id: 1, name: 'Andrew' },
    { id: 2, name: 'Sasha' },
    { id: 3, name: 'Sveta' },
] as Array<friendsType>
}

type initialStateType = typeof initialState

const navbarReducer = (state = initialState, action: any): initialStateType => {
    return state;
}
export default navbarReducer;