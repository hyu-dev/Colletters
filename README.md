# 프로젝트

- react, sass 간단한 CRUD 구현
- 더미데이터로 구현

## 기능

- 로그인, 회원가입(emailjs-com로 이메일인증), 계정찾기
- 회원정보수정, 로그아웃, 탈퇴
- 게시글 작성, 수정, 조회, 검색(태그, 닉네임)
- 댓글 작성, 삭제
- 조회수 증가 (브라우저 쿠키사용)
- 좋아요 토글
- 검색한 해시태그 인기순위

## 실행

- node server.js 

## 사용 라이브러리

- create-react-app (react, react-dom) : 프로젝트 생성 및 작업 (함수형 컴포넌트로 작업)
- react-router-dom : 화면 전환
- styled-components, node-sass, react-icons : 화면 꾸미기
- emailjs-com : 회원가입, 회원이메일수정, 계정찾기 시 인증번호발송에 사용
- express, multer : 회원 프로필 사진, 게시글 사진 업로드에 사용
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

> data : 더미데이터

- DetailLetterContext.js : 상세페이지 데이터 (상세페이지 조회 및 댓글 생성, 수정, 삭제, 조회)
- LetterContext.js : 전체 게시글 데이터 (생성, 수정, 삭제, 조회, 검색)
- LoginUserContext.js : 로그인 유저 데이터 (로그인 여부 확인)
- ModalContext.js : 숨겨진 모달창 열고닫기용
- TopTagsContext.js : 인기 해시태그 데이터 (생성, 조회, 수정)
- UserContext.js : 전체 유저 데이터 (수정, 삭제, 조회)

> scss : 화면꾸미기

- 각 컴포넌트 기준으로 파일 생성

> 기타

- setupProxy.js : 서버랑 클라이언트 서로 다른 포트번호 연결
- server.js : 파일 업로드 및 실행 서버

## 작업기간

- 2021/05/21 ~ 2021/06/01 : 화면 구현
- 2021/07/13 ~ 2021/07/23 : 기능 구현

## 시연영상

[가입하기](https://github.com/hyu-dev/Colletters/issues/12)  
[로그인 및 회원가입](https://github.com/hyu-dev/Colletters/issues/13)  
[게시글검색](https://github.com/hyu-dev/Colletters/issues/16)  
[게시글작성](https://github.com/hyu-dev/Colletters/issues/14)  
[상세페이지](https://github.com/hyu-dev/Colletters/issues/17)  
[게시글수정삭제](https://github.com/hyu-dev/Colletters/issues/18)
