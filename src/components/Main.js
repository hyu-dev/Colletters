/* eslint-disable */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { IconContext } from 'react-icons/lib';
import { FaSlackHash } from 'react-icons/fa';

import '../scss/Main.scss';
import UserTag from './UserTag.js';
import Letter from './Letter.js';
import DetailLetter from './DetailLetter.js';

import { useLetterState } from '../data/LetterContext';
import { OpenLetterProvider, OpenTagProvider } from '../data/ModalContext';
import { useDetailLetterState } from '../data/DetailLetterContext';
import { useTopTagState } from '../data/TopTagsContext';


const SearchTagDiv = styled.div`
    width: 100px;
    height: 100px;
    position: absolute;
    left: 10px;

`;

const TagImg = styled.img`
    width: 20px;
    height: 20px;
`;


const BottomArrow = styled.img`
    width: 25px;
    height: 25px;
    transform: rotate(90deg);
    cursor: pointer;
`;


function Main(props) {
    const letterState = useLetterState();
    const detailLetterState = useDetailLetterState();
    const [글검색, 글검색표시] = useState(false)
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
                        <IconContext.Provider value={{size: 90, color: iconColor}}>
                            <SearchTagDiv>
                                <FaSlackHash />
                            </SearchTagDiv>
                        </IconContext.Provider>
                        <input 
                            className="searchInput"
                            placeholder="꼬리표를 검색하다"
                            onFocus={()=> {setIconColor('#87E8D6')}}
                            onBlur={() => {setIconColor('#dee2e6')}}
                        />
                        <div className="searchResult"></div>
                    </div>
                </div>
                <div className="selectionContainer">
                    <div>
                        <select className="selectLetters" onChange={(e) => {
                            if (e.target.value == '누군가의 글을 엿보다') {
                                글검색표시(true)
                            } else {
                                글검색표시(false)
                            }
                        }}>
                            <option>모든 글을 모아보다</option>
                            <option>내 글만 모아보다</option>
                            <option>누군가의 글을 엿보다</option>
                        </select>
                    </div>
                    <div>
                    {
                        글검색 &&
                        <>
                            <input className="searchAnotherLetters" placeholder="닉네임을 입력하세요" autoFocus/>
                            <button>검색</button>
                        </>
                    }
                    </div>
                    <div>
                        <b>인기꼬리표</b>
                        <ul className="topHashList">
                            {
                                topTagState.map((tag) => {
                                    return (
                                        <li>
                                            <TagImg src="/images/hashTag.png" alt="해시" />
                                            <p>{ tag.title }</p>
                                        </li>
                                    )
                                })
                            }
                            
                        </ul>
                        <BottomArrow src="/images/right-arrow.png" alt=""></BottomArrow>
                    </div>
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
                <div className="btnContainer">
                    <button className="moreBtn" onClick={() => {}}>더보다</button>
                </div>
            </div>
        </OpenLetterProvider>
        </>
    );
}


export default withRouter(Main);