/* eslint-disable */
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import './Main.scss';
import letters from '../data/userLetters.js';
import topTags from '../data/topTagList.js';
import { Link, withRouter } from 'react-router-dom';

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

let UserTagContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 0;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0);
    transition: all 0.7s ease-in;
    z-index: 5;
    ${props => 
        props.표시 && css`
            height: 100%;
            background-color: rgba(255, 255, 255, 0.7);
        `
    }
    .infoContainer {
        width: 1100px;
        height: 0;
        border-radius: 0 0 30px 30px;
        box-sizing: border-box;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
        position: relative;
        background: white;
        transition: all 0.7s ease-in-out;
        ${props =>
            props.표시 &&
            css`
                height: 800px;
            `
        }
        .profile {
            width: 250px;
            height: 250px;
            border-radius: 50%;
        }
        .tagImg {
            width: 100px;
            height: 100px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 5;
            transform: translateX(-50%);
            transition: all 0.7s ease-in-out;
            ${props =>
                props.표시 &&
                css`
                    top: 805px;
                `
            }
        }
    }
    
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


    return (
        <>
        <UserTag />
        <div className="mainContainer">
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
        </>
    );
}

function UserTag() {
    let [표시, 표시변경] = useState(false)

    return(
        <UserTagContainer 표시={표시}>
            <div className="infoContainer" 표시={표시}>
                <div className="buttonContainer">
                    <button>내 정보 보다</button>
                    <button>대표사진 바꾸다</button>
                    <button>접속번호 바꾸다</button>
                    <button>EMAIL 바꾸다</button>
                </div>
                <div className="userProfile">
                    <table>
                        <tr>
                            <td rowSpan='3'>
                                <img className="profile" src="/images/attachment/att1.jpg" alt="프로필사진" />
                            </td>
                            <td colSpan='2'>#user</td>
                        </tr>
                        <tr>
                            <td colSpan='2'>아무닉네임</td>
                        </tr>
                        <tr>
                            <td colSpan='2'>hyu630115@gmail.com</td>
                        </tr>
                        <tr>
                            <td colSpan='3'>
                                <b>최근 끼적인 글 제목</b>
                                <p>잘 모르겠지만, 앞으로도 잘 모르지만, 잘 될거라고 생각? 할까?</p>
                            </td>
                        </tr>
                    </table>
                </div>
                <div></div>
                <div></div>
                <img className="tagImg" src="/images/tag.gif" alt="태그" 표시={표시} onClick={ () => { 표시변경(!표시) } }/>
            </div>
        </UserTagContainer>
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

export default withRouter(Main);