import React, { createContext, useContext, useReducer } from 'react';

const initialUser = [
    {
        id: 'user',
        pwd: '1234',
        nickName: 'user',
        email: 'user@gmail.com',
        attRoot: '/images/profile/',
        attName: 'userProfile.png',
        like: []
    },
    {
        id: 'youjeong',
        pwd: '1234',
        nickName: 'youjeong',
        email: 'hyu630115@gmail.com',
        attRoot: '/images/profile/',
        attName: 'userProfile2.jpg',
        like: []
    },
    {
        id: 'test',
        pwd: '1234',
        nickName: 'test',
        email: 'test@gmail.com',
        attRoot: '/images/profile/',
        attName: 'userProfile3.jpg',
        like: []
    },
];

function userReducer(state, action) {
    let userInfo;
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.user);
        case 'UPDATE_PWD':
            userInfo = state.filter(user => user.id === action.payload.id);
            userInfo[0].pwd = action.payload.pwd;
            return state.filter(user => user.id !== action.payload.id).concat(userInfo);
        case 'UPDATE_EMAIL':
            userInfo = state.filter(user => user.id === action.payload.id)
            userInfo[0].email = action.payload.email;
            return state.filter(user => user.id !== action.payload.id).concat(userInfo);
        case 'UPDATE_FILE':
            return state.filter(user => user.id !== action.payload.id).concat(action.payload)
        case 'REMOVE':
            return state.filter(user => user.id !== action.id)
        case 'LIKE':
            userInfo = state.find(user => user.id === action.userId);
            userInfo.like = [...userInfo.like, action.letterId]
            return state.filter(user => user.id !== action.userId).concat(userInfo)
        case 'LIKED':
            userInfo = state.find(user => user.id === action.userId);
            userInfo.like = userInfo.like.filter(like => like !== action.letterId)
            return state.filter(user => user.id !== action.userId).concat(userInfo)
        default:
            throw new Error(`Unhandled action type ${ action.type }`);
    }
}

const UserStateContext = createContext();
const UserDispatchContext = createContext();

export function UserProvider({ children }) {
    const [state, dispatch] = useReducer(userReducer, initialUser);
    return (
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                { children }
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    )
}

export function useUserState() {
    return useContext(UserStateContext);
}

export function useUserDispatch() {
    return useContext(UserDispatchContext);
}