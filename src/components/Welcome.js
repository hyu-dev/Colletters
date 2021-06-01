import React from 'react';
import { withRouter } from 'react-router';
import '../scss/Welcome.scss';


function Welcome(props) {
    return (
        <div className="container">
            <div className="imageContainer">
                <img src="/images/congratulation.gif" alt="가입축하" />
                <p>가입이 완료되었습니다</p>
            </div>
            <div className="homeBtnContainer">
                <button onClick={() => {
                    props.history.push({ pathname: '/' })
                }}>본 공간에 가다</button>
            </div>
        </div>
    );
}

export default withRouter(Welcome);