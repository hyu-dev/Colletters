import React from 'react';
import { FaSlackHash } from 'react-icons/fa';
import { useDetailLetterDispatch } from '../data/DetailLetterContext';
import { useLetterState } from '../data/LetterContext';
import { useOpenLetterDispatch } from '../data/ModalContext';
import '../scss/Letter.scss';
import { IconContainer } from './components';


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
            <img className="letterImg" src={ `${ letter.attRoot }${ letter.attName[0] }` } alt="이미지" />
            <p className="letterTitle">{ letter.letter.title }</p>
            <ul className="tags">
                {
                    letter.letter.tag.map((tag, i) => {
                        return (
                            <li key={i}>
                                <IconContainer size="15px" color="black">
                                    <FaSlackHash />
                                </IconContainer>
                                <p>{tag}</p>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="countContainer">
                <div className="count viewCount">
                    <img className="countImg" src="/images/eyes.png" alt="조회수" />
                    <p>{ letter.letter.viewCount }</p>
                </div>
                <div className="count likeCount">
                    <img className="countImg" src="/images/like_none.png" alt="좋아요" />
                    <p>{ letter.letter.likeCount }</p>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Letter);