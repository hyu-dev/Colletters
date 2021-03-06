import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { FaSlackHash, FaTrash } from 'react-icons/fa';
import { FcRemoveImage } from 'react-icons/fc';
import { OpenTagProvider } from '../data/ModalContext';
import '../scss/LetterForm.scss';
import UserTag from './UserTag';
import { withRouter } from 'react-router';
import { IconContainer } from './components';
import { useEffect } from 'react';
import { useLetterDispatch, useLetterNextId } from '../data/LetterContext';
import { useLoginUserState } from '../data/LoginUserContext';
import axios from 'axios';


function LetterForm(props) {
    const nextId = useLetterNextId();
    const letterDispatch = useLetterDispatch();
    const loginUser = useLoginUserState();
    
    const [iconColor, setIconColor] = useState(['#dee2e6', '#dee2e6'])
    const [tagInput, setTagInput] = useState('');
    const [TagList, setTagList] = useState([]);
    
    const [Title, setTitle] = useState('');
    const [Content, setContent] = useState('');
    const [Images, setImages] = useState([]);
    const [imageAttRoot, setImageAttRoot] = useState('');
    const [imageAttName, setImageAttName] = useState([]);
    const [deleteImageName, setDeleteImageName] = useState([]);
    const ImageWrapperRef = useRef();
    const SelectRef = useRef();
    const EditableRef = useRef();
    const updateLetter = props.history.location.state;

    useEffect(() => {
        if (updateLetter) {
            setTitle(updateLetter.letter.title);
            EditableRef.current.innerText = updateLetter.letter.content;
            setContent(updateLetter.letter.content);
            setImageAttName([...updateLetter.attName]);
            setImageAttRoot(updateLetter.attRoot);
            setTagList([...updateLetter.letter.tag])
        }
    }, [updateLetter])

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
        let length = 0
        if (updateLetter) length = Images.length + imageAttName.length
        else length = Images.length

        if (length >= 5) {
            return alert('더 이상 이미지를 첨부할 수 없습니다')
        }
        for (let f of Images) {
            if (f.name === file.name) {
                return alert('같은 파일을 올릴 수 없습니다')
            }
        }
        setImages([...Images, file])
    }

    const deleteImages = async (file) => {
        const type = typeof(file)
        if (type === 'string') {
            setImageAttName(imageAttName.filter(name => name !== file))
            setDeleteImageName([...deleteImageName, file])
        }
        else {
            setImages(Images.filter(image => image.name !== file.name))
        }
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

    const onImageDragOver = (e) => {
        e.preventDefault();     
        ImageWrapperRef.current.style.border = '5px dashed black';
    }

    const onImageDragLeave = (e) => {
        e.preventDefault();
        ImageWrapperRef.current.style.border = 'none';
    }

    const onImageDrop = (e) => {
        e.preventDefault();    
        createImages(e.dataTransfer.files[0])
        ImageWrapperRef.current.style.border = 'none';
    }

    
    
    const onKeyDown = (e) => {
        if (e.code === 'Backspace') {
            if (e.target.innerText === '') {
                EditableRef.current.contentEditable = false
                e.target.innerHTML = '<p data-placeholder="내용 (300자 이내)"></p>'
            }
        }
    }

    const onKeyUp = (e) => {
        setContent(e.target.innerText)
    }
    const onFocus = (e) => {
        EditableRef.current.contentEditable = true
    }

    const onBackHistory = () => {
        /* eslint-disable-next-line */
        if (confirm('현재 페이지에서 나가시겠습니까?\n확인시 입력하신 데이터가 삭제됩니다')) {
            props.history.push({ pathname: '/main' })
        }
    }

    const onSubmitImages = async () => {
        const imageFileName = []
        if (Images.length > 0) {
            for (let img of Images) {
                let formData = new FormData();
                formData.append('userfile', img);
                await axios.post('/api/upload', formData)
                .then(res => {
                    imageFileName.push(res.data.filename)
                })
                .catch(err => {
                    return alert('사진을 업로드하지 못했습니다:\n', err)
                })
            }
        }
        return imageFileName
    }
    
    const onSubmitHandler = (e) => {
        let length = 0
        if (updateLetter) length = Images.length + imageAttName.length
        else length = Images.length

        if (Title === '') {
            return alert('제목을 입력하세요')
        } else if (Content === ''){
            return alert('내용을 입력하세요')
        } else if (TagList.length < 1) {
            return alert('최소 1개이상의 태그를 입력하세요')
        } else if (length < 1) {
            return alert('최소 1개이상의 사진을 등록하세요')
        }
        const typeName = e.target.textContent;
        onSubmitImages().then(res => {
            const letters = {
                id: typeName === '끼적이다' ? nextId.current : updateLetter.id,
                userId: loginUser.id,
                nickName: loginUser.nickName,
                attRoot: '/uploads/',
                attName: typeName === '끼적이다' ? [...res] : [...imageAttName, ...res],
                isBlind: SelectRef.current.value,
                letter: {
                    title: Title,
                    content: Content,
                    tag: [...TagList],
                    viewCount: 0,
                    likeCount: 0,
                    writeDate: new Date(),
                },
                reply: typeName === '끼적이다' ? [] : [...updateLetter.reply],
            }
            if (typeName === '끼적이다') {
                nextId.current += 1;
                letterDispatch({ type: 'CREATE', letter: letters })
                alert('게시글이 정상적으로 등록되었습니다')
            } else {
                letterDispatch({ type: 'UPDATE', letter: letters })
                let checkDelete = new Array(deleteImageName.length);
                // 기존에 업로드된 파일 삭제
                deleteImageName.forEach(img => {
                    axios.put('/api/upload', { filename: img })
                    .then(res => checkDelete.push(res.data.state))
                    .catch(err => checkDelete.push(err))
                })
                for (let i in checkDelete) {
                    return checkDelete[i] !== true && alert('게시글 수정에 오류가 발생하였습니다')
                }
                alert('게시글이 정상적으로 수정되었습니다')
            }
            props.history.push({ pathname: "/main" })
        })
    }
    

    return (
        <>
        <OpenTagProvider>
            <UserTag/>
        </OpenTagProvider>
        <div className="formContainer">
            <section className="formMiddleContainer">
                <div className="contentsWrapper" draggable="false">
                    <div className="contentContainer" draggable="false">
                        <input
                            type="text"
                            value={Title}
                            onChange={(e) => setTitle(e.currentTarget.value)}
                            className="title"
                            placeholder="제목 (20자 이내)"
                        />
                        <div className="content" contentEditable="true" onKeyDown={onKeyDown} onKeyUp={onKeyUp} onClick={onFocus} ref={EditableRef}>
                            <p data-placeholder="내용 (300자 이내)"></p>
                        </div>
                        <div
                            draggable="false"
                            className="attachmentContainer"
                            onDragOver={onImageDragOver}
                            onDragLeave={onImageDragLeave}
                            onDrop={onImageDrop}
                            ref={ImageWrapperRef}
                        >
                            {
                                updateLetter 
                                && imageAttName.map(name => 
                                    <Attachment key={name} root={imageAttRoot} name={name} onDelete={deleteImages} />
                                )
                            }
                            {
                                Images.length > 0 
                                && Images.map(image => <Attachment key={image.name} img={image} onDelete={deleteImages} />)
                            }
                        </div>
                    </div>
                    <aside className="tagContainer" draggable="false">
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
                            {TagList.map((tag, i) => <Tags key={i} value={tag} onDelete={deleteTags}/>)}
                        </ul>
                        <select ref={SelectRef}>
                            <option value="N">모두 보다</option>
                            <option value="Y">나만 보다</option>
                        </select>
                    </aside>
                </div>
                <div className="LetterbuttonContainer">
                    <button className="writeBtn" onClick={onSubmitHandler}>{updateLetter ? '바꾸다' : '끼적이다'}</button>
                    <button className="backBtn" onClick={onBackHistory}>나가다</button>
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

const Attachment = React.memo(({ img, onDelete, ...rest }) => {
    const [ImageSrc, setImageSrc] = useState('');

    useEffect(() => {
        ImageReader()
    })

    const ImageReader = () => {
        if (rest.name) {
            setImageSrc(`${rest.root}${rest.name}`)
        } else {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result)
            }
            reader.readAsDataURL(img);
        }
    }

    const onDeleteFile = () => {
        if (rest.name) onDelete(rest.name)
        else onDelete(img)
    }

    return (
        <ImageContainer draggable="false">
            <img src={ImageSrc} alt="이미지" draggable="false"/>
            <ImageDeleteIcon>
                <FcRemoveImage onClick={onDeleteFile}/>
            </ImageDeleteIcon>
        </ImageContainer>
    )
});

export default withRouter(LetterForm);