/* eslint-disable */
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FaSlackHash, FaTrash, FaPlus } from 'react-icons/fa';
import { OpenTagProvider } from '../data/ModalContext';
import '../scss/LetterForm.scss';
import UserTag from './UserTag';
import { withRouter } from 'react-router';
import { IconContainer } from './components';

function LetterForm(props) {
    const [iconColor, setIconColor] = useState(['#dee2e6', '#dee2e6'])
    const [Title, setTitle] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [TagList, setTagList] = useState([]);

    const createTags = (value) => {
        if (TagList.length >= 5) {
            return alert('더 이상 태그를 생성할 수 없습니다')
        }
        for (let tag of TagList) {
            if (tag === value) {
                return alert('태그를 중복해서 입력하실 수 없습니다')
            }
        }
        setTagList([...TagList, value]);
    }

    const deleteTags = (value) => {
        setTagList(TagList.filter(tag => tag !== value))
    }

    const onChangeColor = (value, index) => {
        const array = [...iconColor];
        array[index] = value
        setIconColor(array);
    }

    const onKeyPressByTags = (e) => {
        if (e.key === 'Enter') {
            if (tagInput === '') {
                alert('태그를 입력하세요')
                setTagInput('')
            } else {
                createTags(tagInput)
                setTagInput('')
            }
        }
    }

    return (
        <>
        <OpenTagProvider>
            <UserTag />
        </OpenTagProvider>
        <div className="formContainer">
            <section className="formMiddleContainer">
                <div className="contentsWrapper">
                    <div className="contentContainer">
                        <input
                            type="text"
                            value={Title}
                            onChange={(e) => setTitle(e.currentTarget.value)}
                            className="title"
                            placeholder="제목 (20자 이내)"
                            maxLength="20"
                        />
                        <div
                            className="content"
                            contentEditable="true"
                            data-gramm="false"
                            data-placeholder="내용 (300자 이내)"
                        />
                        <div className="attachmentContainer">

                        </div>
                    </div>
                    <aside className="tagContainer">
                        <div className="inputTagContainer">
                            <div>
                                <IconContainer size="35px" color={iconColor[0]}>
                                    <FaSlackHash />
                                </IconContainer>
                            </div>
                            <input
                                type="text"
                                value={tagInput}
                                placeholder="엔터를 눌러 해시태그를 등록하세요(최대 5개)"
                                onFocus={()=> {onChangeColor('#87E8D6', 0)}}
                                onBlur={() => {onChangeColor('#dee2e6', 0)}}
                                onChange={(e) => setTagInput(e.currentTarget.value)}
                                onKeyPress={onKeyPressByTags}
                            />
                        </div>
                        <ul>
                            {TagList.map(tag => <Tags value={tag} onDelete={deleteTags}/>)}
                        </ul>
                        <select>
                            <option>모두 보다</option>
                            <option>나만 보다</option>
                        </select>
                    </aside>
                </div>
                <div className="LetterbuttonContainer">
                    <button className="writeBtn">끼적이다</button>
                    <button className="backBtn" onClick={ () => { props.history.push({ pathname: '/main' }) } }>나가다</button>
                </div>
            </section>
        </div>
        </>
    );
}

const TrashIcon = styled.div`
    width: auto;
    height: auto;
    font-size: 20px;
    color: #dee2e6;
    display: none;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    position: absolute;
    right: 5px;
    &:hover {
        color: #ff6b6b;
        cursor: pointer;
    }
`;

const TagContainer = styled.li`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 5px;
    p {
        margin: 0;
        padding: 0 10px;
        font-family: NanumGothic;
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        line-height: 40px;
        letter-spacing: 0.1em;
        cursor: default;
    }
    &:hover {
        ${TrashIcon} {
            display: flex;
        }
    }
`;

function Tags({ value, onDelete }) {
    return (
        <TagContainer>
            <IconContainer size="25px" color="#87E8D6">
                <FaSlackHash />
            </IconContainer>
            <p>{value}</p>
            <TrashIcon>
                <FaTrash onClick={() => {onDelete(value)}}/>
            </TrashIcon>
        </TagContainer>
    )
}

const fileInput = styled.input`
    display: none;
`;

const ImageContainer = styled.div`
    width: 150px;
    height: 150px;
    background: #F6F6F6;
    ${ props =>
        props.onChange &&
        css``
    }
    ${ props => 
        props.createDiv &&
        css`
            &::before {
                content: '추가 사진';
            }
        `
    }
`;

function Attachment() {
    return (
        <div className="">
            <img src="" alt=""/>
            <img src="" alt=""/>
            <img src="" alt=""/>
        </div>
    )
}

export default withRouter(LetterForm);