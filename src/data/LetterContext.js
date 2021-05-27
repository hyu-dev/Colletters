import React, { createContext, useReducer, useContext, useRef } from 'react';

const initialLetters = [
    {
        id: 1,
        userId: "user",
        nickName: "아무닉네임",
        attRoot: '/images/attachment/',
        attName: {
            main: 'att4.jpg',
            sub: ['att1.jpg', 'att2.jpg'],
        },
        letter: {
            title: '제목 아무거나 적어봅니다 ㅎ',
            content: "내용도 아무거나 적어봅니다 300자이내로 적어야하는데 그정도로 ..?",
            tag: ["맛집", "여행", "이거", "저거"],
            viewCount: 0,
            likeCount: 0,
            writeDate: "2021-05-19",
        },
    },
    {
        id: 2,
        userId: "youjeong",
        nickName: "유정닉네임",
        attRoot: '/images/attachment/',
        attName: {
            main: 'att5.jpg',
            sub: ['att6.jpg', 'att7.jpg'],
        },
        letter: {
            title: '이번에도 제목은 아무거나 적어봅니다 ㅎㅎ',
            content: "내용도 아무거나 적어봅니다 300자이내로 적어야하는데 그정도로 ..?",
            tag: ["자아성찰", "독서", "명상"],
            viewCount: 0,
            likeCount: 0,
            writeDate: "2021-05-20",
        },
    },
    {
        id: 3,
        userId: "user",
        nickName: "아무닉네임",
        attRoot: '/images/attachment/',
        attName: {
            main: 'att8.jpg',
            sub: ['att9.jpg'],
        },
        letter: {
            title: '이번에는 어떤 제목을 적어볼까요?',
            content: "무엇을 적어볼까요?",
            tag: ["혼란"],
            viewCount: 20,
            likeCount: 1,
            writeDate: "2021-05-21",
        },
    },
];

function letterReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.letter);
        case 'UPDATE':
            return state
        case 'REMOVE':
            return state.filter(letter => letter.id !== action.id);
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const LetterStateContext = createContext();
const LetterDispatchContext = createContext();
const LetterNextIdContext = createContext();

export function LetterProvider({ children }) {
    const [state, dispatch] = useReducer(letterReducer, initialLetters);
    const nextId = useRef(4)
    return (
        <LetterStateContext.Provider value={state}>
            <LetterDispatchContext.Provider value={dispatch}>
                <LetterNextIdContext.Provider value={nextId}>
                    { children }
                </LetterNextIdContext.Provider>
            </LetterDispatchContext.Provider>
        </LetterStateContext.Provider>
    );
}

export function useLetterState() {
    const context = useContext(LetterStateContext);
    if (!context) {
        throw new Error('Cannot find LetterProvider');
    }

    return context;
}

export function useLetterDispatch() {
    const context = useContext(LetterDispatchContext);
    if (!context) {
        throw new Error('Cannot find LetterProvider');
    }
    
    return context;
}

export function useLetterNextId() {
    const context = useContext(LetterNextIdContext);
    if (!context) {
        throw new Error('Cannot find LetterProvider');
    }
    
    return context;
}