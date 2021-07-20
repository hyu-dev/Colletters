import React, { createContext, useReducer, useContext, useRef } from 'react';

const initialLetters = [
    {
        id: 1,
        userId: "user",
        nickName: "유저일번",
        attRoot: '/images/attachment/',
        attName: ['att4.jpg', 'att1.jpg', 'att2.jpg'],
        isBlind: 'N',
        letter: {
            title: '제목1',
            content: "내용1",
            tag: ["태그1", "태그2", "태그3", "태그4"],
            viewCount: 0,
            likeCount: 0,
            writeDate: new Date("2021-06-19"),
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
        nickName: "유정쓰",
        attRoot: '/images/attachment/',
        attName: ['att5.jpg', 'att6.jpg', 'att7.jpg'],
        isBlind: 'N',
        letter: {
            title: '제목2',
            content: "내용2",
            tag: ["태그1", "태그2", "태그3"],
            viewCount: 0,
            likeCount: 0,
            writeDate: new Date("2021-05-20"),
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
        nickName: "유저일번",
        attRoot: '/images/attachment/',
        attName: ['att8.jpg', 'att9.jpg'],
        isBlind: 'N',
        letter: {
            title: '제목3',
            content: "내용3",
            tag: ["태그5"],
            viewCount: 20,
            likeCount: 1,
            writeDate: new Date("2021-05-21"),
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
        nickName: "임시유저임",
        attRoot: '/images/attachment/',
        attName: ['att10.jpg', 'att11.jpg', 'att12.png'],
        isBlind: 'N',
        letter: {
            title: '제목4',
            content: "내용4",
            tag: ["태그6", "태그7", "태그8"],
            viewCount: 1555,
            likeCount: 211,
            writeDate: new Date("2021-05-22"),
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
        id: 5,
        userId: "user",
        nickName: "유저일번",
        attRoot: '/images/attachment/',
        attName: ['att12.png'],
        isBlind: 'Y',
        letter: {
            title: '리덕스 언제하냐',
            content: "리액트부터 막히네 ㅠㅠ",
            tag: ["이거말고", "할거 더 많은데"],
            viewCount: 0,
            likeCount: 0,
            writeDate: new Date("2021-07-18"),
        },
        reply: [
            {
                id: 1,
                userId: "user",
                content: "진짜 개어려움",
            },
        ],
    },
    {
        id: 6,
        userId: "test",
        nickName: "임시유저임",
        attRoot: '/images/attachment/',
        attName: ['att11.jpg', 'att12.png'],
        isBlind: 'N',
        letter: {
            title: '리액트',
            content: "너무 어려워",
            tag: ["리액트", "프론트"],
            viewCount: 0,
            likeCount: 0,
            writeDate: new Date("2021-07-20"),
        },
        reply: [
            {
                id: 1,
                userId: "user",
                content: "진짜 개어려움",
            },
        ],
    },
];

const searchLetters = [...initialLetters];

function letterReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return state
                .concat(action.letter)
                .sort((a, b) => b.letter.writeDate - a.letter.writeDate);
        case 'UPDATE':
            return state
                .filter(letter => letter.id !== action.letter.id)
                .concat(action.letter)
                .sort((a, b) => b.letter.writeDate - a.letter.writeDate)
        case 'UPDATE_REPLY':
            return state
                .map(letter => {
                    return letter.id === action.letter.id ? action.letter : letter
                })
                .sort((a, b) => b.letter.writeDate - a.letter.writeDate)
        case 'REMOVE':
            return state
                .filter(letter => letter.id !== action.id)
                .sort((a, b) => b.letter.writeDate - a.letter.writeDate);
        case 'REMOVE_USER':
            return state
                .filter(letter => letter.userId !== action.id)
                .sort((a, b) => b.letter.writeDate - a.letter.writeDate)
        case 'REMOVE_REPLY':
            const reply = state.find(letter => letter.id === action.letterId).reply.filter(reply => reply.id !== action.commentId)
            const letter = state.find(letter => letter.id === action.letterId)
            letter.reply = reply
            return state
                .filter(letter => letter.id !== action.letterId)
                .concat(letter)
                .sort((a, b) => b.letter.writeDate - a.letter.writeDate)
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function searchLetterReducer(state, action) {
    switch (action.type) {
        case 'SORT':
            const array = [...state];
            array.sort((a, b) => b.letter.writeDate - a.letter.writeDate)
            return array
        case 'COPY':
            return action.payload;
        case 'REMOVE_USER':
            return state
                .filter(letter => letter.userId !== action.id)
                .sort((a, b) => b.letter.writeDate - a.letter.writeDate)
        case 'SEARCH_HASH':
            return action.payload.sort((a, b) => b.letter.writeDate - a.letter.writeDate);
        case 'SEARCH_NICKNAME':
            return action.payload.sort((a, b) => b.letter.writeDate - a.letter.writeDate);
        case 'SEARCH_MYLETTER':
            return action.payload.sort((a, b) => b.letter.writeDate - a.letter.writeDate);
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
    const nextId = useRef(7)
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