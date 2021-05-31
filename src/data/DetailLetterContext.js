import React, { createContext, useContext, useReducer } from 'react';

const initailLetter = {
    id: '',
    userId: '',
    nickName: '',
    attRoot: '',
    attName: {
        main: '',
        sub: [''],
    },
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
        default:
            throw new Error(`Unhandled action type: ${ action.type }`);
    }
}

const LetterStateContext = createContext();
const LetterDispatchContext = createContext();

export function DetailLetterProvider({ children }) {
    const [state, dispatch] = useReducer(letterReducer, initailLetter);
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