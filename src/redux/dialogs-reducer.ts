const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';


type dialogsType = {
    id: number
    name: string
}
type messagesType = {
    message: string
}
type initialStateType = {
    dialogs: Array<dialogsType>
    messages: Array<messagesType>
    newMessageText: string | null
}

let initialState: initialStateType = {
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
        { message: 'hello!!!!!' },
        { message: 'glad to see you' },
        { message: 'hello!!!!!' },
    ],
    newMessageText: '',
}

const dialogsReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case ADD_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, { message: action.messageText }],
            };
        }
        default: return state;
    }
}

type addMessageActionCreactorType = {
    type: typeof ADD_MESSAGE
    messageText: string
}
export const addMessageActionCreactor = (messageText: string): addMessageActionCreactorType => ({ type: ADD_MESSAGE, messageText });

type updateMessageActionCreatorType = {
    type: typeof UPDATE_NEW_MESSAGE_TEXT, 
    newMessage: string
}
export const updateMessageActionCreator = (text: string): updateMessageActionCreatorType => ({ type: UPDATE_NEW_MESSAGE_TEXT, newMessage: text });

export default dialogsReducer;