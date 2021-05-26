/* eslint-disable */
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import './Main.scss';
import letters from '../data/userLetters.js';
import topTags from '../data/topTagList.js';
import UserTag from './UserTag.js';
import Letter from './Letter.js';
import DetailLetter from './DetailLetter.js';
import { Link, withRouter } from 'react-router-dom';
import { FaSlackHash } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';


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
    console.log(props)
    let [글검색, 글검색표시] = useState(false)
    let [실시간, 실시간변경] = useState(() => {
        let arr = []
        for (var i in topTags) {
            arr.push(false)
        }
        arr[0] = true
        return arr
    })
    let index = 0;
    let arrCopy = [...실시간]
    // useEffect(() => {
    //     let 타이머 = setInterval(() => {
    //         if (index < topTags.length - 1) {
    //             console.log("시작" + index, arrCopy)
    //             arrCopy[index] = false
    //             arrCopy[index+1] = true
    //             index += 1
    //             console.log("끝" + index, arrCopy)
    //         } else {
    //             console.log("최대치 시작" + index, arrCopy)
    //             arrCopy[index] = false
    //             arrCopy[0] = true
    //             index = 0
    //             console.log("최대치 끝" + index, arrCopy)
    //         }
    //         실시간변경(arrCopy)
    //     }, 2000)
    //     return () => { clearInterval(타이머) }
    // }, [실시간변경])
    const [iconColor, setIconColor] = useState('#dee2e6')

    return (
        <>
        <UserTag />
        <DetailLetter />
        <div className="mainContainer">
            <div className="searchContainer">
                <div className="search">
                    <IconContext.Provider value={{size: 90, color: iconColor}}>
                    <SearchTagDiv><FaSlackHash /></SearchTagDiv>
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
                            topTags.map((tag, i) => {
                                if (실시간[i]) {
                                    return(
                                        <li>
                                            <TagImg src="/images/hashTag.png" alt="해시" />
                                            <p>{tag.title}</p>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                    <BottomArrow src="/images/right-arrow.png" alt=""></BottomArrow>
                </div>
            </div>
            <div className="lettersContainer">
                <div className="letters">
                    {
                        letters.map((letter, i) => {
                            return <Letter letter={letter} key={letter.id}/>
                        })
                    }
                </div>
            </div>
            <div className="btnContainer">
                <button className="moreBtn" onClick={() => {}}>더보다</button>
            </div>
        </div>
        </>
    );
}


export default withRouter(Main);