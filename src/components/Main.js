import React, { useRef, useState } from 'react';
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
import { useTopTagDispatch, useTopTagNextId, useTopTagState } from '../data/TopTagsContext';
import { IconContainer } from './components';
import { useLoginUserState } from '../data/LoginUserContext';
import { useEffect } from 'react';
import { useCallback } from 'react';

const body = document;

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
    const letterStyle = useRef(970)
    const [style, setStyle] = useState(letterStyle)
    const count = useRef(1);

    const onInfinityScroll = useCallback(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight + Math.ceil(document.documentElement.scrollTop)
        /* eslint-disable-next-line */
        const length = letterState.filter(letter => {
            if (letter.isBlind === 'N' || letter.userId === loginUser.id) {
                return letter
            }
        }).length
        if (scrollHeight <= clientHeight) {
            if (length > 6 * count.current) {
                setTimeout(() => {
                    letterStyle.current += 500;
                    setStyle(letterStyle.current)
                    count.current += 0.5;
                    window.scrollTo({
                        top: Math.ceil(document.documentElement.scrollTop) + 499,
                        left: 0,
                        behavior: 'smooth'
                    })
                }, 400)
            }
        } 
    }, [letterState, letterStyle, loginUser.id])
    
    useEffect(() => {
        letterStyle.current = 970;
        setStyle(letterStyle.current)
        count.current = 1;
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
        body.addEventListener("scroll", onInfinityScroll)
        searchLetterDispatch({ type: 'COPY', payload: letterState })
        return () => {
            body.removeEventListener("scroll", onInfinityScroll)
        }
    /* eslint-disable-next-line */
    }, [loginUser, letterState])

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
    }, [topTagDispatch, topTagState.length, idx, searchLetterDispatch])

    
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
        /* eslint-disable-next-line */
        const data = letterState.filter((letter) => {
            const letters = letter.letter.tag.filter(tag => tag === value)
            if (letters.length > 0) {
                return letters
            }
        })
        if (data.length > 0) {
            searchLetterDispatch({ type: 'SEARCH_HASH', payload: data })
        } else {
            alert('?????? ????????? ????????????');
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
                alert('????????? ???????????? ????????????')
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
                /* eslint-disable-next-line */
                if (confirm('???????????? ???????????????\n????????? ???????????? ?????????????????????????'))
                    props.history.push('/')
                else {
                    e.target.value = 'posts';
                    onChangeOption(e)
                }
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
                            placeholder="????????? ?????? ??????????????? ??????????????? (???????????? ????????? ????????????)"
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
                        <select className="selectLetters" onChange={onChangeOption} defaultValue="posts">
                            <option value="posts">?????? ??? ????????????</option>
                            <option value="myPost">??? ??? ????????????</option>
                            <option value="search">?????? ??? ????????????</option>
                        </select>
                    </aside>
                    <aside>
                    {
                        search &&
                        <>
                            <input
                                className="searchAnotherLetters"
                                placeholder="???????????? ???????????????"
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
                        <b>??????????????????</b>
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
                    <div className="letters" style={{ height: `${style}px`}}>
                        {
                            searchLetterState.map((letter) => {
                                if (letter.isBlind === 'N' || loginUser.id === letter.userId) {
                                    return <Letter letter={letter} key={letter.id} />
                                }
                                return null
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