// 페이지 이동
export function moveLink(link, move) {
  move(link)
}
// 페이지 이동시 state정보 가져가기
export function moveLinkWithState(link, move, state) {
  move({ pathname: link, state: state })
}

// 모달창 열기
export function toggleComponents() {

}

// context dispatch 변경
export function dispatchHandler(dispatch, type, state) {
  dispatch({ type: type, payload: state })
}
