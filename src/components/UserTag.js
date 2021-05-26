import React, { useEffect, useState } from 'react';
import styled, { css, createClobalStyle } from 'styled-components';
import './UserTag.scss';
import { withRouter } from 'react-router-dom';


const UserTagContainer = styled.div`
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
        .buttonContainer {
            position: absolute;
            bottom: 100%;
            transform: translateY(0);
            transition: all 0.7s ease-in;
            ${props =>
                props.표시 &&
                css`
                transform: translateY(100%);
                `
            }
        }
        .userProfile {
            position: absolute;
            padding: 0;
            bottom: 250px;
        }
        .writeBtnContainer {
            position: absolute;
            bottom: 30px;
        }
        .textBtnContainer {
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: absolute;
            bottom: 0;
        }
    }
`;

const Button = styled.button`
    width: 220px;
    height: 70px;
    background: white;
    border: 3px solid #7165FF;
    border-radius: 10px;
    box-sizing: border-box;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 25px;
    color: #7165FF;
    margin: 0 21px;
    position: relative;
    transition: all 0.3s ease-in;
    &:hover {
        background-color: #7165FF;
        color: white;
    }
    &:active {
        background-color: #7165FF;
        color: white;
        top: 5px;
    }
    ${props => 
        props.children === '글 끼적이러 가다' &&
        css`
            border-color: #FF9BD1;
            width: 300px;
            color: #FF9BD1;
            &:hover {
                background-color: #FF9BD1;
                color: white;
            }
            &:active {
                background-color: #FF9BD1;
                color: white;
                top: 5px;
            }
        `
    }
    ${props =>
        props.children === props.change &&
        css`
            background-color: #7165FF;
            color: white;
        `
    }
`;

const TextButton = styled.button`
    width: auto;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 35px;
    line-height: 41px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.1em;
    color: #000000;
    background: none;
    outline: none;
    border: none;
    position: relative;
    text-shadow: 0px 1px 5px rgba(0, 0, 0, 0.40);
    &:hover {
        color: #7165FF;
    }
    &:active {
        top: 5px;
    }
`;

function UserTag(props) {
    let [표시, 표시변경] = useState(false)
    let [change, setChange] = useState('내 정보 보다')

    useEffect(() => {
         
    }, [])

    return (
        <UserTagContainer 표시={표시}>
            <div className="infoContainer" 표시={표시}>
                <div className="buttonContainer">
                    <Button change={change} onClick={() => { setChange('내 정보 보다') } }>내 정보 보다</Button>
                    <Button change={change} onClick={() => { setChange('대표사진 바꾸다') } }>대표사진 바꾸다</Button>
                    <Button change={change} onClick={() => { setChange('접속번호 바꾸다') } }>접속번호 바꾸다</Button>
                    <Button change={change} onClick={() => { setChange('EMAIL 바꾸다') } }>EMAIL 바꾸다</Button>
                </div>
                <div className="userProfile">
                    <table>
                        <colgroup>
                            <col width="40%"/>
                            <col width="30%"/>
                            <col width="30%"/>
                        </colgroup>
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
                <div className="writeBtnContainer"><Button onClick={() => {

                }}>글 끼적이러 가다</Button></div>
                <div className="textBtnContainer">
                    <TextButton>영원히안녕</TextButton>
                    <TextButton>또보자</TextButton>
                </div>
                <img className="tagImg" src="/images/tag.gif" alt="태그" 표시={표시} onClick={ () => { 표시변경(!표시) } }/>
            </div>
        </UserTagContainer>
    );
}

export default withRouter(UserTag);