/* eslint-disable */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { FaSlackHash } from 'react-icons/fa';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io'

import '../scss/Main.scss';
import UserTag from './UserTag.js';
import Letter from './Letter.js';
import DetailLetter from './DetailLetter.js';

import { useLetterState, useSearchLetterDispatch, useSearchLetterState } from '../data/LetterContext';
import { OpenLetterProvider, OpenTagProvider } from '../data/ModalContext';
import { useDetailLetterState } from '../data/DetailLetterContext';
import { useTopTagState } from '../data/TopTagsContext';
import { IconContainer } from './components';
import { useLoginUserState } from '../data/LoginUserContext';


function Main(props) {
    const loginUser = useLoginUserState();
    const letterState = useLetterState();
    const searchLetterState = useSearchLetterState();
    const searchLetterDispatch = useSearchLetterDispatch();
    const detailLetterState = useDetailLetterState();
    const topTagState = useTopTagState();
    const [search, openSearch] = useState(false)
    const [iconColor, setIconColor] = useState(new Array(2).fill().map(() => '#dee2e6'));
    const [searchTag, setSearchTag] = useState('');
    const [searchNick, setSearchNick] = useState('');

    const searchLetterByTag = (e) => {
        if (e.key === 'Enter') {
            if (searchTag === '') {
                searchLetterDispatch({ type: 'SEARCH_HASH', payload: letterState })
            } else {
                const data = letterState.filter(letter => {
                    const letters = letter.letter.tag.filter(tag => tag === searchTag)
                    if (letters.length > 0) {
                        return letters
                    }
                 })
                 searchLetterDispatch({ type: 'SEARCH_HASH', payload: data })
            }
        }
    }

    const onKeyPressByNickName = (e) => {
        if (e.key === 'Enter') {
            searchLetterByNickName()
        }
    }

    const searchLetterByNickName = () => {
        if (searchNick === '') {
            searchLetterDispatch({ type: 'SEARCH_NICKNAME', payload: letterState })
        } else {
            const data = letterState.filter(letter => {
                return letter.nickName === searchNick
            })
            searchLetterDispatch({ type: 'SEARCH_NICKNAME', payload: data })
        }
    }

    const onChangeOption = (e) => {
        const option = e.target.value;
        if (option == 'search') {
            openSearch(true)
        } else if (option === 'myPost') {
            openSearch(false)
            if (loginUser.id !== '') {
                const data = letterState.filter(letter => {
                    return letter.nickName === loginUser.nickName
                })
                searchLetterDispatch({ type: 'SEARCH_MYLETTER', payload: data })
            } else {
                alert('로그인을 해주세요')
                props.history.push('/')
            }
        } else {
            openSearch(false)
            searchLetterDispatch({ type: 'SEARCH_MYLETTER', payload: letterState })
        }
    }

    const onChangeColor = (value, index) => {
        const array = [...iconColor];
        array[index] = value
        setIconColor(array);
    }

    return (
        <>
        <OpenTagProvider>
            <UserTag />
        </OpenTagProvider>
        <OpenLetterProvider>
            <DetailLetter letter={ detailLetterState } />
            <div className="mainContainer">
                <div className="searchContainer">
                    <div className="search">
                        <IconContainer size="90px" color={iconColor[0]} type="bigHash">
                            <FaSlackHash />
                        </IconContainer>
                        <input 
                            className="searchInput"
                            placeholder="엔터를 눌러 해시태그를 검색하세요 (빈칸으로 엔터시 전체검색)"
                            onFocus={()=> {onChangeColor('#87E8D6', 0)}}
                            onBlur={() => {onChangeColor('#dee2e6', 0)}}
                            value={searchTag}
                            onChange={(e) => {setSearchTag(e.currentTarget.value)}}
                            onKeyPress={searchLetterByTag}
                        />
                    </div>
                </div>
                <div className="selectionContainer">
                    <aside>
                        <select className="selectLetters" onChange={onChangeOption}>
                            <option value="posts">모든 글 모아보기</option>
                            <option value="myPost">내 글 모아보기</option>
                            <option value="search">다른 글 구경하기</option>
                        </select>
                    </aside>
                    <aside>
                    {
                        search &&
                        <>
                            <input
                                className="searchAnotherLetters"
                                placeholder="닉네임을 입력하세요"
                                autoFocus
                                onFocus={()=> {onChangeColor('#87E8D6', 1)}}
                                onBlur={() => {onChangeColor('#dee2e6', 1)}}
                                value={searchNick}
                                onChange={(e) => setSearchNick(e.currentTarget.value)}
                                onKeyPress={onKeyPressByNickName}
                            />
                            <IconContainer size="30px" color={iconColor[1]} style={{ cursor: 'pointer' }}>
                                <AiOutlineFileSearch onClick={searchLetterByNickName}/>
                            </IconContainer>
                        </>
                    }
                    </aside>
                    <aside style={{ cursor: 'pointer' }}>
                        <b>인기태그</b>
                        <ul className="topHashList">
                            {
                                topTagState.map((tag) => {
                                    return (
                                        <li key={tag.id}>
                                            <IconContainer size="20px" color="black">
                                                <FaSlackHash />
                                            </IconContainer>
                                            <p>{ tag.title }</p>
                                        </li>
                                    )
                                })
                            }
                            
                        </ul>
                        <IconContainer size="25px" color="black">
                            <IoIosArrowDown />
                        </IconContainer>
                    </aside>
                </div>
                <div className="lettersContainer">
                    <div className="letters">
                        {
                            searchLetterState.map((letter) => {
                                return <Letter letter={letter} key={letter.id} />
                            })
                        }
                    </div>
                </div>
            </div>
        </OpenLetterProvider>
        </>
    );
}


export default withRouter(Main);