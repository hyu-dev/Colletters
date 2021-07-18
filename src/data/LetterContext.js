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
        isBlind: 'N',
        letter: {
            title: '제목 아무거나 적어봅니다 ㅎ',
            content: "내용도 아무거나 적어봅니다 300자이내로 적어야하는데 그정도로 ..?",
            tag: ["맛집", "여행", "이거", "저거"],
            viewCount: 0,
            likeCount: 0,
            writeDate: "2021-05-19",
        },
        reply: [
            {
                id: 1,
                userId: "youjeong",
                content: "안녕?",
            },
            {
                id: 2,
                userId: "user",
                content: "응ㅋ",
            },
        ],
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
        isBlind: 'N',
        letter: {
            title: '이번에도 제목은 아무거나 적어봅니다 ㅎㅎ',
            content: "내용도 아무거나 적어봅니다 300자이내로 적어야하는데 그정도로 ..?",
            tag: ["자아성찰", "독서", "명상"],
            viewCount: 0,
            likeCount: 0,
            writeDate: "2021-05-20",
        },
        reply: [
            {
                id: 1,
                userId: "user",
                content: "이야이야호 이야이야호 이야이야호 무야호",
            },
            {
                id: 2,
                userId: "youjeong",
                content: "미쳤냐",
            },
        ],
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
        isBlind: 'N',
        letter: {
            title: '이번에는 어떤 제목을 적어볼까요?',
            content: "무엇을 적어볼까요?",
            tag: ["혼란"],
            viewCount: 20,
            likeCount: 1,
            writeDate: "2021-05-21",
        },
        reply: [
            {
                id: 1,
                userId: "user",
                content: "이야이야호 이야이야호 이야이야호 무야호",
            },
            {
                id: 2,
                userId: "user",
                content: "무이~야호",
            },
            {
                id: 3,
                userId: "youjeong",
                content: "님.. 정신 좀 차리세요",
            },
        ],
    },
    {
        id: 4,
        userId: "test",
        nickName: "테스트닉",
        attRoot: '/images/attachment/',
        attName: {
            main: 'att10.jpg',
            sub: ['att11.jpg', 'att12.png'],
        },
        isBlind: 'N',
        letter: {
            title: '데이터 등록하는 것도 일이다',
            content: "진짜 이렇게 적어도 되는거냐",
            tag: ["혼란", "등산", "맛집"],
            viewCount: 1555,
            likeCount: 211,
            writeDate: "2021-05-22",
        },
        reply: [
            {
                id: 1,
                userId: "user",
                content: "이야이야호 이야이야호 이야이야호 무야호",
            },
            {
                id: 2,
                userId: "user",
                content: "무이~야호",
            },
            {
                id: 3,
                userId: "youjeong",
                content: "님.. 정신 좀 차리세요",
            },
        ],
    },
];

const searchLetters = [...initialLetters];

function letterReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.letter);
        case 'REMOVE':
            return state.filter(letter => letter.id !== action.id);
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function searchLetterReducer(state, action) {
    switch (action.type) {
        case 'SEARCH_HASH':
            return action.payload;
        case 'SEARCH_NICKNAME':
            return action.payload;
        case 'SEARCH_MYLETTER':
            return action.payload;
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

const LetterStateContext = createContext();
const LetterDispatchContext = createContext();
const LetterNextIdContext = createContext();
const SearchLetterStateContext = createContext();
const SearchLetterDispatchContext = createContext();


export function LetterProvider({ children }) {
    const [state, dispatch] = useReducer(letterReducer, initialLetters);
    const [state1, dispatch1] = useReducer(searchLetterReducer, searchLetters)
    const nextId = useRef(4)
    return (
        <LetterStateContext.Provider value={state}>
            <LetterDispatchContext.Provider value={dispatch}>
                <SearchLetterStateContext.Provider value={state1}>
                <SearchLetterDispatchContext.Provider value={dispatch1}>
                <LetterNextIdContext.Provider value={nextId}>
                    { children }
                </LetterNextIdContext.Provider>
                </SearchLetterDispatchContext.Provider>
                </SearchLetterStateContext.Provider>
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

export function useSearchLetterState() {
    return useContext(SearchLetterStateContext);
}

export function useSearchLetterDispatch() {
    return useContext(SearchLetterDispatchContext);
}