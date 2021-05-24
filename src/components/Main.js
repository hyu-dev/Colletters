/* eslint-disable */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './Main.scss';
import letters from '../data/userLetters.js';
import topTags from '../data/topTagList.js';

let Img = styled.img`
    width: 100px;
    height: 100px;
    position: absolute;
    left: 170px;
    top: 0px;
    &:active {
        top: 5px;
    }
`;

let SearchTag = styled.img`
    position: absolute;
    left: 10px;
`;

let TagImg = styled.img`
    width: 20px;
    height: 20px;
`;

let TagImgInLetter = styled.img`
    width: 15px;
    height: 15px;
`;

let LetterImg = styled.img`
    width: 250px;
    height: 250px;
    box-shadow: 0px 2px 5px #a9a9db;
    box-sizing: border-box;
`;

let CountImg = styled.img`
    width: 30px;
    height: 30px;
`;

let BottomArrow = styled.img`
    width: 25px;
    height: 25px;
    transform: rotate(90deg);
    cursor: pointer;
`;


function Main() {
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
    useEffect(() => {
        let 타이머 = setInterval(() => {
            if (index < topTags.length - 1) {
                console.log("시작" + index, arrCopy)
                arrCopy[index] = false
                arrCopy[index+1] = true
                index += 1
                console.log("끝" + index, arrCopy)
            } else {
                console.log("최대치 시작" + index, arrCopy)
                arrCopy[index] = false
                arrCopy[0] = true
                index = 0
                console.log("최대치 끝" + index, arrCopy)
            }
            실시간변경(arrCopy)
        }, 2000)
        return () => { clearInterval(타이머) }
    }, [실시간변경])


    return (
        <div className="mainContainer">
            <UserTag />
            <Img src="/images/tag.gif" alt="태그" />
            <div className="searchContainer">
                <div className="search">
                    <SearchTag src="/images/hashTag.png" alt="해시" />
                    <input className="searchInput" />
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
                        letters.map((letter) => {
                            return <Letter letter={letter} key={letter.id}/>
                        })
                    }
                </div>
            </div>
            <div className="btnContainer">
                <button className="moreBtn" onClick={() => {}}>더보다</button>
            </div>
        </div>
    );
}

function UserTag() {
    return(
        <div></div>
    )
}

function Letter(props) {
    return(
        <div className="letter">
            <img className="userProfile" src="/images/userProfile.png" alt="" />
            <p className="userNickName">{props.letter.nickName}</p>
            <LetterImg src={props.letter.mainAtt} alt="이미지" />
            <p className="letterTitle">{props.letter.title}</p>
            <ul className="tags">
                {
                    props.letter.tag.map((tag) => {
                        return (
                            <li>
                                <TagImgInLetter src="/images/hashTag.png" alt="태그" />
                                <p>{tag}</p>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="countContainer">
                <div className="count viewCount">
                    <CountImg src="/images/eyes.png" alt="조회수" />
                    <p>{props.letter.viewCount}</p>
                </div>
                <div className="count likeCount">
                    <CountImg src="/images/like_none.png" alt="좋아요" />
                    <p>{props.letter.likeCount}</p>
                </div>
            </div>
        </div>
    )
}

function DetailLetter() {
    return(
        <div></div>
    )
}

export default Main;