import React, { createContext, useContext, useReducer } from 'react';

const initialUser = [
    {
        id: 'user',
        pwd: '1234',
        nickName: '아무닉네임',
        email: ['user', 'gmail.com'],
        attRoot: '/images/profile/',
        attName: 'userProfile.png',
    },
    {
        id: 'youjeong',
        pwd: '1234',
        nickName: '유정닉네임',
        email: ['hyu630115', 'gmail.com'],
        attRoot: '/images/profile/',
        attName: 'userProfile2.jpg',
    },
    {
        id: 'test',
        pwd: '1234',
        nickName: '테스트닉',
        email: ['test', 'gmail.com'],
        attRoot: '/images/profile/',
        attName: 'userProfile3.jpg',
    },
];

function userReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.user);
        case 'UPDATE':
            return state;
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