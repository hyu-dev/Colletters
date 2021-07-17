import React, { createContext, useContext, useReducer, useRef } from 'react';

const initialTopTags = [
    {
        id: 1,
        title: '자아성찰',
        searchCount: 1
    },
    {
        id: 2,
        title: '등산',
        searchCount: 2
    },
    {
        id: 3,
        title: '맛집',
        searchCount: 3
    },
];

function tagReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.payload)
        case 'UPDATE':
            return state.filter(tag => tag.id !== action.payload.id).concat(action.payload)
        case 'SORT':
            const array = [...state];
            array.sort((a, b) => b.searchCount - a.searchCount)
            return array
        default:
            throw new Error(`Unhandled action type: ${ action.type }`);
    }
}

const topTagsStateContext = createContext();
const topTagsDispatchContext = createContext();
const topTagsNextIdContext = createContext();

export function TopTagsProvider({ children }) {
    const [state, dispatch] = useReducer(tagReducer, initialTopTags);
    const nextId = useRef(4);

    return (
        <topTagsStateContext.Provider value={ state }>
            <topTagsDispatchContext.Provider value={ dispatch }>
                <topTagsNextIdContext.Provider value={ nextId }>
                    { children }
                </topTagsNextIdContext.Provider>
            </topTagsDispatchContext.Provider>
        </topTagsStateContext.Provider>
    )
}

export function useTopTagState() {
    return useContext(topTagsStateContext);
}

export function useTopTagDispatch() {
    return useContext(topTagsDispatchContext);
}

export function useTopTagNextId() {
    return useContext(topTagsNextIdContext);
}
