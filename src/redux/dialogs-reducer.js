const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
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
        {message: 'hello!!!!!' },
        {message: 'glad to see you' },
        {message: 'hello!!!!!' },
    ],
    newMessageText: '',
    // messageText: '',
}

const dialogsReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            // let newMessage = {
            //     id: 4, message: state.newMessageText,
            // }
            return {
                ...state,
                messages: [...state.messages, {message: action.messageText}]

            };
        }
        // case UPDATE_NEW_MESSAGE_TEXT:
        //     return {
        //         ...state,
        //         newMessageText: action.newMessage,
        //     };
        default: return state;
    }
}

export const addMessageActionCreactor = (messageText) => ({type: ADD_MESSAGE, messageText} );
export const updateMessageActionCreator = (text) => ({type: UPDATE_NEW_MESSAGE_TEXT, newMessage: text});

export default dialogsReducer;