import React, { createContext, useContext, useReducer } from 'react';

const initialUser = [
    {
        id: 'user',
        pwd: '1234',
        nickName: '유저일번',
        email: 'user@gmail.com',
        attRoot: '/images/profile/',
        attName: 'userProfile.png',
    },
    {
        id: 'youjeong',
        pwd: '1234',
        nickName: '유정쓰',
        email: 'hyu630115@gmail.com',
        attRoot: '/images/profile/',
        attName: 'userProfile2.jpg',
    },
    {
        id: 'test',
        pwd: '1234',
        nickName: '임시유저임',
        email: 'test@gmail.com',
        attRoot: '/images/profile/',
        attName: 'userProfile3.jpg',
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