import React, { createContext, useContext, useReducer } from 'react';

// UserTag 오픈 Provider
const userTagOpen = false;

function openTagReducer(state, action) {
    switch (action.type) {
        case 'TAGOPEN':
            return !state;
        default:
            throw new Error(`Unhandled action type ${ action.type }`);
    }
}

const openTagStateContext = createContext();
const openTagDispatchContext = createContext();

export function OpenTagProvider({ children }) {
    const [state, dispatch] = useReducer(openTagReducer, userTagOpen);
    return (
        <openTagStateContext.Provider value={state}>
            <openTagDispatchContext.Provider value={dispatch}>
                { children }
            </openTagDispatchContext.Provider>
        </openTagStateContext.Provider>
    );
}

export function useOpenTagState() {
    return useContext(openTagStateContext);
}

export function useOpenTagDispatch() {
    return useContext(openTagDispatchContext);
}



// Letter 오픈 Provider
const letterOpen = false;

function openLetterReducer(state, action) {
    switch (action.type) {
        case 'OPEN':
            return !state;
        default:
            throw new Error(`Unhandled action type ${ action.type }`);
    }
}

const openLetterStateContext = createContext();
const openLetterDispatchContext = createContext();

export function OpenLetterProvider({ children }) {
    const [state, dispatch] = useReducer(openLetterReducer, letterOpen);
    return (
        <openLetterStateContext.Provider value={state}>
            <openLetterDispatchContext.Provider value={dispatch}>
                { children }
            </openLetterDispatchContext.Provider>
        </openLetterStateContext.Provider>
    );
}

export function useOpenLetterState() {
    return useContext(openLetterStateContext);
}

export function useOpenLetterDispatch() {
    return useContext(openLetterDispatchContext);
}
