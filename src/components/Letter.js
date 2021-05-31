import React from 'react';
import styled from 'styled-components';
import { useDetailLetterDispatch } from '../data/DetailLetterContext';
import { useOpenLetterDispatch } from '../data/ModalContext';
import '../scss/Main.scss';

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



function Letter({ letter }) {
    const openLetterDispatch = useOpenLetterDispatch();
    const detailLetterDispatch = useDetailLetterDispatch();

    return(
        <div 
            className="letter" 
            onClick={
                () => { 
                    openLetterDispatch({ type: 'OPEN' }); 
                    detailLetterDispatch({ type: 'UPDATE', letter: letter }); 
                } 
            }
        >
            <img className="userProfile" src="/images/userProfile.png" alt="" />
            <p className="userNickName">{ letter.nickName }</p>
            <LetterImg src={ `${ letter.attRoot }${ letter.attName.main }` } alt="이미지" />
            <p className="letterTitle">{ letter.letter.title }</p>
            <ul className="tags">
                {
                    letter.letter.tag.map((tag) => {
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
                    <p>{ letter.letter.viewCount }</p>
                </div>
                <div className="count likeCount">
                    <CountImg src="/images/like_none.png" alt="좋아요" />
                    <p>{ letter.letter.likeCount }</p>
                </div>
            </div>
        </div>
    );
}

export default Letter;