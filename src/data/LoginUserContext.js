import React, { createContext, useContext, useReducer } from 'react';

const initialUser = {
    id: '',
    pwd: '',
    nickName: '',
    email: '',
    attRoot: '',
    attName: '',
    like: []
}

function userReducer(state, action) {
    switch(action.type) {
        case 'UPDATE':
            return action.user
        case 'UPDATE_PWD':
            return action.payload
        case 'UPDATE_EMAIL':
            const userInfo = {...state};
            userInfo['email'] = action.payload.email;
            return userInfo
        case 'UPDATE_FILE':
            return action.payload
        case 'LIKE':
            return {
                ...state,
                like: [...state.like, action.letterId]
            }
        case 'LIKED':
            return {
                ...state,
                like: state.like.filter(like => like !== action.letterId)
            }
        default:
            throw new Error(`Unhandled action type: ${ action.type }`);
    }
}

const LoginUserStateContext = createContext();
const LoginUserDispatchContext = createContext();

export function LoginUserProvider({ children }) {
    const [state, dispatch] = useReducer(userReducer, initialUser);
    
    return (
        <LoginUserStateContext.Provider value={state}>
            <LoginUserDispatchContext.Provider value={dispatch}>
                { children }
            </LoginUserDispatchContext.Provider>
        </LoginUserStateContext.Provider>
    )
}

export function useLoginUserState() {
    return useContext(LoginUserStateContext)
}

export function useLoginUserDispatch() {
    return useContext(LoginUserDispatchContext)
}