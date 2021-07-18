import React, { useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { FaSlackHash } from 'react-icons/fa';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

import '../scss/Main.scss';
import UserTag from './UserTag.js';
import Letter from './Letter.js';
import DetailLetter from './DetailLetter.js';

import { useLetterState, useSearchLetterDispatch, useSearchLetterState } from '../data/LetterContext';
import { OpenLetterProvider, OpenTagProvider } from '../data/ModalContext';
import { useDetailLetterState } from '../data/DetailLetterContext';
import { useTopTagDispatch, useTopTagNextId, useTopTagState } from '../data/TopTagsContext';
import { IconContainer } from './components';
import { useLoginUserState } from '../data/LoginUserContext';
import { useEffect } from 'react';


function Main(props) {
    const loginUser = useLoginUserState();
    const letterState = useLetterState();
    const searchLetterState = useSearchLetterState();
    const searchLetterDispatch = useSearchLetterDispatch();
    const detailLetterState = useDetailLetterState();
    const topTagState = useTopTagState();
    const topTagDispatch = useTopTagDispatch();
    const nextId = useTopTagNextId();
    const [search, openSearch] = useState(false)
    const [iconColor, setIconColor] = useState(new Array(2).fill().map(() => '#dee2e6'));
    const [searchTag, setSearchTag] = useState('');
    const [searchNick, setSearchNick] = useState('');
    const searchTagInput = useRef();
    const time = useRef();
    const [idx, setIdx] = useState(0);
    const [openTags, setOpenTags] = useState(false);

    useEffect(() => {
        topTagDispatch({ type: 'SORT' })
        time.current = setInterval(() => {
            if (idx >= topTagState.length - 1) {
                setIdx(0);
            } else {
                setIdx(idx + 1);
            }
        }, 3000)
        return () => {clearInterval(time.current)}
    }, [topTagDispatch, topTagState.length, idx])

    const onKeyPressByTag = (e) => {
        if (e.key === 'Enter') {
            if (searchTag === '') {
                searchLetterDispatch({ type: 'SEARCH_HASH', payload: letterState })
            } else {
                searchLetterByTag(searchTag)
            }
        }
    }

    const searchLetterByTag = (value) => {
        const data = letterState.filter(letter => {
            const letters = letter.letter.tag.filter(tag => tag === value)
            if (letters.length > 0) {
                return letters
            }
        })
        if (data.length > 0) {
            searchLetterDispatch({ type: 'SEARCH_HASH', payload: data })
        } else {
            alert('검색 목록이 없습니다');
            setSearchTag('');
            return searchTagInput.current.focus()
        }

        const tags = topTagState.find(tag => {
            return tag.title === value
        })
        if (!tags) {
            const tag = {
                id: nextId.current,
                title: value,
                searchCount: 0,
            }
            topTagDispatch({ type: 'CREATE', payload: tag })
            nextId.current += 1;
        } else {
            const tag = {
                id: tags.id,
                title: tags.title,
                searchCount: tags.searchCount + 1,
            }
            topTagDispatch({ type: 'UPDATE', payload: tag })
        }
        topTagDispatch({ type: 'SORT' })
        setSearchTag(value)
    }

    const onKeyPressByNickName = (e) => {
        if (e.key === 'Enter') {
            searchLetterByNickName()
        }
    }

    const searchLetterByNickName = () => {
        if (searchNick === '') {
            searchLetterDispatch({ type: 'SEARCH_NICKNAME', payload: letterState })
            setSearchNick('')
        } else {
            const data = letterState.filter(letter => {
                return letter.nickName === searchNick
            })
            if (data.length > 0) {
                searchLetterDispatch({ type: 'SEARCH_NICKNAME', payload: data })
            } else {
                alert('검색한 닉네임이 없습니다')
            }
            setSearchNick('')
        }
    }

    const onChangeOption = (e) => {
        const option = e.target.value;
        if (option === 'search') {
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
                            onKeyPress={onKeyPressByTag}
                            ref={searchTagInput}
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
                    <aside>
                        <b>인기검색태그</b>
                        <IconContainer size="25px" color="black" type="tag" transform={openTags ? 'true' : 'false'}>
                            <IoIosArrowDown onClick={() => {setOpenTags(!openTags)}}/>
                        </IconContainer>
                    </aside>
                    <ul className="topHashList" style={{ cursor: 'pointer' }} onClick={() => {setOpenTags(!openTags)}}>
                        {
                            openTags
                            ? topTagState.map((tag, i) => <Tags tags={tag} idx={i} key={tag.id} onClick={searchLetterByTag} />)
                            : <Tags tags={topTagState} idx={idx} />
                        }
                    </ul>
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

function Tags({ tags, idx, onClick }) {
    if (tags.length) {
        return (
            <li>
                <IconContainer size="23px" color="#87E8D6" style={{ width: '30px', height: '100%' }}>
                    <FaSlackHash />
                </IconContainer>
                <p>{(idx + 1) + ".  " + tags[idx].title}</p>
            </li>
        )
    } else {
        return (
            <li onClick={() => {onClick(tags.title)}}>
                <IconContainer size="23px" color="#87E8D6" style={{ width: '30px', height: '100%' }}>
                    <FaSlackHash />
                </IconContainer>
                <p>{(idx + 1) + ".  " + tags.title}</p>
            </li>
        )
    }
    
}


export default withRouter(React.memo(Main));