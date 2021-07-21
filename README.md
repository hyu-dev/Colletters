# Colletters

- 처음 기획은 '나에게 쓰는 편지 수집'으로 시작했으나
- 좋아요, 댓글, 검색 등의 기능을 넣기 위해서 처음 기획의도는 잊어버리고
- 간단한 CRUD 연습용으로 작업 중
- DB (X)

## 기능

- 로그인 / 회원가입(이메일인증)
- 게시글 조회 / 검색 / 인기해시태그
- 게시글 상세 조회 / 게시글 좋아요 / 댓글 조회 / 댓글 작성 / 댓글 삭제
- 게시글 작성(사진첨부) / 수정(사진첨부)
- 회원정보조회(사진첨부) / 수정

## 사용한 라이브러리

- create-react-app (react, react-dom) : 프로젝트 생성 및 작업 (함수형 컴포넌트로 작업)
- react-router-dom : 화면 전환
- styled-components, node-sass, react-icons : 화면 꾸미기
- emailjs-com : 회원가입, 회원이메일수정, 계정찾기 시 인증번호발송에 사용
- express, multer : 회원 프로필 사진, 게시글 사진 업로드에 사용
- contextAPI : 데이터 조회, 수정, 삭제, 생성 등 작업
- proxy : server.js 와 react project 의 cors 에러 해결을 위해 사용 (로컬 path 연결)
- axios : 서버로 사진 데이터 전송을 위해 사용

## src 폴더구조

> components : 화면

- components.jsx : 자주 사용하는 컴포넌트 모음
- DetailLetter.js : 게시글 상세보기 페이지
- Join.js : 회원가입 페이지
- Letter.js : 게시글 리스트 페이지의 게시글 컴포넌트
- LetterForm.js : 게시글 작성, 수정 페이지
- Login.js : 로그인 페이지
- Main.js : 게시글 리스트 페이지
- SearchAccount.jsx : 아이디, 비밀번호 찾기 페이지
- UserTag.js : 회원정보 페이지
- Welcome.js : 회원가입 후 환영합니다 페이지

> data : 데이터

- DetailLetterContext.js : 상세페이지 데이터 (상세페이지 조회 및 댓글 생성, 수정, 삭제, 조회)
- LetterContext.js : 전체 게시글 데이터 (생성, 수정, 삭제, 조회, 검색)
- LoginUserContext.js : 로그인 유저 데이터 (로그인 여부 확인)
- ModalContext.js : 숨겨진 모달창 열고닫기용
- TopTagsContext.js : 인기 해시태그 데이터 (생성, 조회, 수정)
- UserContext.js : 전체 유저 데이터 (수정, 삭제, 조회)

> scss : 꾸미기

- 각 화면별 파일 생성함 (reset.scss : 기본 set)

> 기타

- setupProxy.js : 서버랑 클라이언트 서로 다른 포트번호를 연결함
- server.js : 파일 업로드용 (node server.js 실행시 업로드된 파일 일괄 삭제)

## 작업기간

- 2021/05/21 ~ 2021/06/01 : 화면UI 구현
- 2021/07/13 ~ 2021/07/23(예상) : 기능 구현

## 영상참조

[가입하기](https://github.com/hyu-dev/Colletters/issues/12)
[로그인 및 회원가입](https://github.com/hyu-dev/Colletters/issues/13)
[게시글작성](https://github.com/hyu-dev/Colletters/issues/14)
