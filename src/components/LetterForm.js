/* eslint-disable */
import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { FaSlackHash, FaTrash } from 'react-icons/fa';
import { FcRemoveImage } from 'react-icons/fc';
import { OpenTagProvider } from '../data/ModalContext';
import '../scss/LetterForm.scss';
import UserTag from './UserTag';
import { withRouter } from 'react-router';
import { IconContainer } from './components';
import { useEffect } from 'react';

function LetterForm(props) {
    const [iconColor, setIconColor] = useState(['#dee2e6', '#dee2e6'])
    const [Title, setTitle] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [TagList, setTagList] = useState([]);
    const [Images, setImages] = useState([]);
    const testRef2 = useRef();

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

    const createImages = (file) => {
        if (Images.length >= 5) {
            return alert('더 이상 이미지를 첨부할 수 없습니다')
        }
        for (let f of Images) {
            if (f.name === file.name) {
                return alert('같은 파일을 올릴 수 없습니다')
            }
        }
        setImages([...Images, file])
    }

    const deleteImages = (file) => {
        setImages(Images.filter(image => image.name !== file.name))
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

    const testDragEnter = (e) => {
        e.preventDefault();     
        testRef2.current.style.border = '5px dashed black';
    }

    const testDrop = (e) => {
        e.preventDefault();    
        
        // console.log(e.dataTransfer)
        // console.log("드래그 드롭 ", e.dataTransfer.files[0])
        createImages(e.dataTransfer.files[0])
        testRef2.current.style.border = 'none';
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
                        />
                        <div
                            className="content"
                            contentEditable="true"
                            data-gramm="false"
                            data-placeholder="내용 (300자 이내)"
                            maxLength="10"
                        />
                        <div className="attachmentContainer" onDragOver={testDragEnter} onDrop={testDrop} ref={testRef2}>
                            {
                                Images.length > 0 
                                && Images.map(image => <Attachment key={image.name} img={image} onDelete={deleteImages} />)
                            }
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
                                placeholder="해시태그 생성_10자이내_5개이하_엔터로생성)"
                                onFocus={()=> {onChangeColor('#87E8D6', 0)}}
                                onBlur={() => {onChangeColor('#dee2e6', 0)}}
                                onChange={(e) => setTagInput(e.currentTarget.value)}
                                onKeyPress={onKeyPressByTags}
                                maxLength="10"
                            />
                        </div>
                        <ul>
                            {TagList.map(tag => <Tags key={tag.id} value={tag} onDelete={deleteTags}/>)}
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

const Tags = React.memo(({ value, onDelete }) => {
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
})


const ImageDeleteIcon = styled.div`
    width: auto;
    height: auto;
    font-size: 80px;
    color: #dee2e6;
    display: none;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    &:hover {
        color: #ff6b6b;
        cursor: pointer;
    }
`;

const ImageContainer = styled.div`
    width: auto;
    height: auto;
    background: #F6F6F6;
    box-sizing: border-box;
    margin: 0 10px;
    position: relative;
    img {
        width: 150px;
        height: 150px;
    }
    &:hover {
        ${ImageDeleteIcon} {
            display: flex;
        }
        img {
            opacity: 0.3;
        }
    }
`;

const Attachment = React.memo(({ img, onDelete }) => {
    const [ImageSrc, setImageSrc] = useState('');

    useEffect(() => {
        ImageReader()
    })

    const ImageReader = () => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImageSrc(e.target.result)
        }
        reader.readAsDataURL(img);
    }

    return (
        <ImageContainer draggable="false">
            <img src={ImageSrc} alt="이미지" draggable="false"/>
            <ImageDeleteIcon>
                <FcRemoveImage onClick={() => {onDelete(img)}}/>
            </ImageDeleteIcon>
        </ImageContainer>
    )
});

export default withRouter(LetterForm);