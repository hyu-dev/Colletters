# Colletters

- 처음 기획은 나에게 쓰는 편지로 시작했으나
- 좋아요, 댓글, 검색 등의 기능을 넣기 위해서 처음 기획의도는 잊어버리고
- 간단한 CRUD 테스트용으로 작업 중

## 기능

- 로그인 / 회원가입
- letter 조회 / 검색 / 인기해시태그
- letter 상세 조회 / 댓글 조회 / 댓글 작성 / 댓글 삭제 / 좋아요
- letter 작성(사진첨부) / 수정(사진첨부)
- 회원정보조회 / 수정

## 사용한 라이브러리

- create-react-app (react, react-dom) : 프로젝트 생성 및 작업 (함수형 컴포넌트로 작업)
- react-router-dom : 화면 전환
- styled-components, node-sass, react-icons : 화면 꾸미기
- emailjs-com : 회원가입, 회원이메일수정, 계정찾기 시 인증번호발송에 사용
- express(multer) : 회원 프로필 사진 변경, 게시글 사진첨부에 사용
- contextAPI : 데이터 조회, 수정, 삭제, 생성 등 작업
- proxy : server.js 와 react project 의 cors 에러 해결을 위해 사용 (로컬 path 연결)

## 작업기간

2021/05/21 ~ 2021/06/01 : 화면UI 구현
2021/07/13 ~ 2021/07/21 : 기능 구현 (예상)
