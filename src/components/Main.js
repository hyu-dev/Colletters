/* eslint-disable */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { FaSlackHash } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io'

import '../scss/Main.scss';
import UserTag from './UserTag.js';
import Letter from './Letter.js';
import DetailLetter from './DetailLetter.js';

import { useLetterState } from '../data/LetterContext';
import { OpenLetterProvider, OpenTagProvider } from '../data/ModalContext';
import { useDetailLetterState } from '../data/DetailLetterContext';
import { useTopTagState } from '../data/TopTagsContext';
import { IconContainer } from './components';


function Main(props) {
    const letterState = useLetterState();
    const detailLetterState = useDetailLetterState();
    const [search, openSearch] = useState(false)
    const [iconColor, setIconColor] = useState('#dee2e6')
    const topTagState = useTopTagState();

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
                        <IconContainer size="90px" color={iconColor} type="bigHash">
                            <FaSlackHash />
                        </IconContainer>
                        <input 
                            className="searchInput"
                            placeholder="해시태그 검색"
                            onFocus={()=> {setIconColor('#87E8D6')}}
                            onBlur={() => {setIconColor('#dee2e6')}}
                        />
                        <div className="searchResult"></div>
                    </div>
                </div>
                <div className="selectionContainer">
                    <aside>
                        <select className="selectLetters" onChange={(e) => {
                            if (e.target.value == 'search') {
                                openSearch(true)
                            } else {
                                openSearch(false)
                            }
                        }}>
                            <option value="posts">모든 글 모아보기</option>
                            <option value="myPost">내 글 모아보기</option>
                            <option value="search">다른 글 엿보기</option>
                        </select>
                    </aside>
                    <aside>
                    {
                        search &&
                        <>
                            <input className="searchAnotherLetters" placeholder="닉네임을 입력하세요" autoFocus/>
                            <button>검색</button>
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
                            letterState.map((letter) => {
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