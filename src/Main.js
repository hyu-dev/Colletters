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
                    <select className="selectLetters">
                        <option>모든 글을 모아보다</option>
                        <option>내 글만 모아보다</option>
                        <option>누군가의 글을 엿보다</option>
                    </select>
                </div>
                <div>
                    <input className="searchAnotherLetters"/>
                    <button>검색</button>
                </div>
                <div>
                    <b>인기꼬리표</b>
                    <ul className="topHashList">
                        <li>
                            <TagImg src="/images/hashTag.png" alt="해시" />
                            <p>맛집</p>
                        </li>
                        <li>
                            <TagImg src="/images/hashTag.png" alt="해시" />
                            <p>여행</p>
                        </li>
                        <li>
                            <TagImg src="/images/hashTag.png" alt="해시" />
                            <p>여행</p>
                        </li>
                        <li>
                            <TagImg src="/images/hashTag.png" alt="해시" />
                            <p>여행</p>
                        </li>
                        <li>
                            <TagImg src="/images/hashTag.png" alt="해시" />
                            <p>여행</p>
                        </li>
                    </ul>
                    <BottomArrow src="/images/right-arrow.png" alt=""></BottomArrow>
                </div>
            </div>
            <div className="lettersContainer">
                <div className="letters">
                    <Letter />
                    <Letter />
                    <Letter />
                    <Letter />
                    <Letter />
                    <Letter />
                    <Letter />
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
                    <TagImgInLetter src="/images/hashTag.png" alt="태그" />
                    <p>맛집efefefwiwuefhiwuehf</p>
                </li>
                <li>
                    <TagImgInLetter src="/images/hashTag.png" alt="태그" />
                    <p>여행</p>
                </li>
                <li>
                    <TagImgInLetter src="/images/hashTag.png" alt="태그" />
                    <p>여행</p>
                </li>
                <li>
                    <TagImgInLetter src="/images/hashTag.png" alt="태그" />
                    <p>여행</p>
                </li>
                <li>
                    <TagImgInLetter src="/images/hashTag.png" alt="태그" />
                    <p>여행</p>
                </li>
            </ul>
            <div className="countContainer">
                <div className="count viewCount">
                    <CountImg src="/images/eyes.png" alt="조회수" />
                    <p>0</p>
                </div>
                <div className="count likeCount">
                    <CountImg src="/images/like_none.png" alt="좋아요" />
                    <p>0</p>
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