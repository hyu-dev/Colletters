/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import './Main.scss';

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
    width: 25px;
    height: 25px;
`;

let LetterImg = styled.img`
    width: 250px;
    height: 250px;
    box-shadow: 0px 2px 5px #a9a9db;
    box-sizing: border-box;
`;

function Main() {
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
                <select name="" id="">
                    <option>모든 글을 모아보다</option>
                    <option>내 글만 모아보다</option>
                    <option>누군가의 글을 엿보다</option>
                </select>
                <input />
                <div>
                    <b>인기꼬리표</b>
                    <ul>
                        <li>
                            <TagImg src="/images/hashTag.png" alt="해시" />
                            <p>맛집</p>
                        </li>
                        <li>
                            <TagImg src="/images/hashTag.png" alt="해시" />
                            <p>여행</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="lettersContainer">
                <div className="letters">
                    <Letter />
                    <Letter />
                    <Letter />
                    <Letter />
                </div>
            </div>
            <div className="btnContainer">
                <button className="moreBtn">더보다</button>
            </div>
        </div>
    );
}

function UserTag() {
    return(
        <div></div>
    )
}

function Letter() {
    return(
        <div className="letter">
            <img className="userProfile" src="/images/userProfile.png" alt="" />
            <p className="userNickName">아무닉네임</p>
            <LetterImg src="/images/letterImg2.jpg" alt="이미지" />
            <p className="letterTitle">여기는 제목을 적습니다여기는 제목을 적습니다여기는 제목을 적습니다여기는 제목을 적습니다</p>
            <ul className="tags">
                <li>
                    <img src="" alt="" />
                    <p>맛집</p>
                </li>
                <li>
                    <img src="" alt="" />
                    <p>여행</p>
                </li>
            </ul>
            <div>
                <img src="" alt="" />
                <p></p>
            </div>
            <div>
                <img src="" alt="" />
                <p></p>
            </div>
        </div>
    )
}

export default Main;