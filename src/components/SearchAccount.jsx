import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { USER_ID } from '../config';
import { useUserState } from '../data/UserContext';
import { IconContainer } from './components';
import emailjs from 'emailjs-com';
import '../scss/SearchAccount.scss';

function SearchAccount(props) {
    const users = useUserState();
    const [Email, setEmail] = useState('');
    const [label, setLabel] = useState([false, '']);

    const onClick = () => {
        const user = checkUserEmail(Email);
        console.log(user)
        if (!user) {
            return alert('존재하는 이메일이 없습니다')
        } else {
            let data = '';
            if (props.type === 'id') {
                data = {
                    user_email: Email,
                    name: user.nickName,
                    account: '아이디',
                    message: user.id
                }
            } else if (props.type === 'pwd') {
                data = {
                    user_email: Email,
                    name: user.nickName,
                    account: '비밀번호',
                    message: user.pwd,
                }
            }
            sendEmail(data)
        }
    }

    const checkUserEmail = (value) => {
        console.log(value)
        return users.find(user => user.email === value)
    }

    const sendEmail = (data) => {
        emailjs.send('service_youjeong', 'template_searchAccount', data, USER_ID)
        .then((result) => {
            const array = [...label];
            array[0] = [true, '발송완료'];
            setLabel(array)
        }, (error) => {
            const array = [...label];
            array[0] = [false, '발송실패'];
            setLabel(array)
        });
    }

    return(
        <div className="searchBackground">
            <div className="search">
                <label>{props.type === 'id' ? '아이디 찾기' : '비밀번호 찾기'}</label>
                <label className="guide">이메일을 입력하세요</label>
                <div className="emailContainer">
                    <input
                        type="text"
                        className="searchEmail"
                        value={Email}
                        onChange={(e) => {setEmail(e.currentTarget.value)}}
                    />
                    <button
                        type="button"
                        className="searchBtn"
                        onClick={onClick}
                    >찾기</button>
                </div>
                <label className="guide" style={label[0][0] ? {color: '#69db7c'} : {color: '#ff8787'}}>{label[0][1]}</label>
                <IconContainer size="40px" color="black" type="back">
                    <FaPlus onClick={() => { props.setFindAccount(false)}}/>
                </IconContainer>
            </div>
        </div>
    )
}

export default SearchAccount;