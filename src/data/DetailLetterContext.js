import React, { createContext, useContext, useReducer } from 'react';

export const initialLetter = {
    id: '',
    userId: '',
    nickName: '',
    attRoot: '',
    attName: [],
    isBlind: '',
    letter: {
        title: '',
        content: '',
        tag: [''],
        viewCount: 0,
        likeCount: 0,
        writeDate: '',
    },
    reply: []
}

function letterReducer(state, action) {
    switch (action.type) {
        case 'UPDATE':
            return action.letter;
        case 'REMOVE_REPLY':
            return {
                ...state,
                reply: state.reply.filter(reply => reply.id !== action.id)
            };
        default:
            throw new Error(`Unhandled action type: ${ action.type }`);
    }
}

const LetterStateContext = createContext();
const LetterDispatchContext = createContext();

export function DetailLetterProvider({ children }) {
    const [state, dispatch] = useReducer(letterReducer, initialLetter);
    return (
        <LetterStateContext.Provider value={state}>
            <LetterDispatchContext.Provider value={dispatch}>
                { children }
            </LetterDispatchContext.Provider>
        </LetterStateContext.Provider>
    )
}

export function useDetailLetterState() {
    return useContext(LetterStateContext)
}

export function useDetailLetterDispatch() {
    return useContext(LetterDispatchContext)
}