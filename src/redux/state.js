import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import navbarReducer from './navbar-reducer';

let store = {
    _state: {
        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Andrew' },
                { id: 2, name: 'Dmitry' },
                { id: 3, name: 'Sasha' },
                { id: 4, name: 'Sveta' },
                { id: 5, name: 'Valera' },
                { id: 6, name: 'Valera' },
                { id: 7, name: 'Valera' },
                { id: 8, name: 'Sasha' },
            ],
            messages: [
                { id: 1, message: 'hello!!!!!' },
                { id: 2, message: 'glad to see you' },
                { id: 3, message: 'hello!!!!!' },
            ],
            newMessageText: '',
        },
        profilePage: {
            posts: [
                { id: 1, text: 'Hello!' },
                { id: 2, text: 'Guys' },
                { id: 3, text: 'Welcome to the' },
                { id: 4, text: 'Club' },
                { id: 5, text: 'Body!' },
            ],
            newPostText: '',
            
        },
        navbar: {
            friends: [
                { id: 1, name: 'Andrew' },
                { id: 2, name: 'Sasha' },
                { id: 3, name: 'Sveta' },
            ]
        },
    },
    _callSubscriber() {
        console.log('State changed')
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    getState() {
        return this._state
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.navbar = navbarReducer(this._state.navbar, action);

        this._callSubscriber(this._state);
    }

}

window.state = store._state.dialogsPage;


export default store;
