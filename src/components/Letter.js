import React, { useEffect, useState } from 'react';
import { FaSlackHash } from 'react-icons/fa';
import { getCookie, getCookieValue, setCookie } from '../cookie';
import { useDetailLetterDispatch, useDetailLetterState } from '../data/DetailLetterContext';
import { useLetterDispatch } from '../data/LetterContext';
import { useLoginUserState } from '../data/LoginUserContext';
import { useOpenLetterDispatch } from '../data/ModalContext';
import { useUserState } from '../data/UserContext';
import '../scss/Letter.scss';
import { IconContainer } from './components';


function Letter({ letter }) {
    const users = useUserState();
    const loginUser = useLoginUserState();
    const letterDispatch = useLetterDispatch();
    const openLetterDispatch = useOpenLetterDispatch();
    const detailLetterState = useDetailLetterState();
    const detailLetterDispatch = useDetailLetterDispatch();

    const [userProfile, setUserProfile] = useState(['', '']);

    useEffect(() => {
        const userInfo = users.find(user => user.id === letter.userId)
        setUserProfile([userInfo.attRoot, userInfo.attName])
    }, [users, letter.userId, detailLetterState, letterDispatch])

    const onClickLetter = () => {
        console.log("클릭전", letter.letter.viewCount)
        openLetterDispatch({ type: 'OPEN' }); 
        detailLetterDispatch({ type: 'UPDATE', letter: letter });
        if (getCookie("view") === 'view') {
            const arr = getCookieValue("view").split(",")
            const lett = arr.find(a => {
                return a.substring(0, a.indexOf("_")) === loginUser.id && parseInt(a.substring(a.indexOf("_") + 1)) === letter.id
            })
            if (!lett) {
                setCookie("view", `${loginUser.id}_${letter.id}`)
                letterDispatch({ type: 'VIEWCOUNT', letterId: letter.id })
                detailLetterDispatch({ type: 'VIEWCOUNT' })
            }
        } else {
            setCookie("view", `${loginUser.id}_${letter.id}`)
            letterDispatch({ type: 'VIEWCOUNT', letterId: letter.id })
            detailLetterDispatch({ type: 'VIEWCOUNT' })
        }
        console.log("클릭후", letter.letter.viewCount)
    }

    return(
        <div className="letter" onClick={onClickLetter}>
            <img className="userProfile" src={`${userProfile[0]}${userProfile[1]}`} alt="" />
            <p className="userNickName">{ letter.nickName }</p>
            <img className="letterImg" src={ `${ letter.attRoot }${ letter.attName[0] }` } alt="이미지" />
            <p className="letterTitle">{ letter.letter.title }</p>
            <ul className="tags">
                {
                    letter.letter.tag.map((tag, i) => {
                        return (
                            <li key={i}>
                                <IconContainer size="20px" color="#87E8D6">
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