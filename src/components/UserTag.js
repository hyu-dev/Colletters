import React, { useState } from 'react';
import styled, { css } from 'styled-components';


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

function UserTag() {
    let [표시, 표시변경] = useState(false)
    return (
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
    );
}

export default UserTag;