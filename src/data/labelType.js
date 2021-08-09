import { sliceArray } from "../utils/functionUtils"
import { dispatchHandler } from "../utils/handler"

// 로그인 페이지 labelContainer 정보
export const loginLabels = [
  { type: 'input',
    label: '아이디', 
    input: 'text', 
    size: '400px' },
  { type: 'input',
    label: '비밀번호',
    input: 'password',
    size: '400px' },
  { type: 'button',
    label: '바로',
    button: 'login',
    size: '400px',
    value: '접속하다' },
  { type: 'button',
    label: '지금', 
    button: 'join',
    size: '400px',
    value: '가입하다' },
  { type: 'doubleButton',
    label: '뭐지',
    buttonState: { id: '아이디가', pwd: '비밀번호가' }, 
    onClick: dispatchHandler },
  { type: 'input',
    label: '그냥', 
    button: 'none', 
    size: '400px', 
    value: '염탐하다' }
]
// 유저정보 페이지 로그인Template에 LabelContainer 정보
export const userInfoLabels = sliceArray(loginLabels, 0, loginLabels.length - 1)
