/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import './App.scss';
import LogIn from './components/LogIn';
import Join from './components/Join';
import { Link, Route, Switch } from 'react-router-dom';
import Welcome from './components/Welcome';
import Main from './components/Main';
import data from './data/userInfo.js';
import { LetterProvider } from './data/LetterContext';
import { ModalProvider } from './data/ModalContext';

let Title = styled.h1`
  margin: 0;
  padding: 30px 0;
  font-family: Rockwell;
  font-style: normal;
  font-weight: normal;
  font-size: 100px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.3em;
  cursor: default;
`;

let LogInContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


function App() {
  let [회원정보, 회원정보변경] = useState(data);

  return (
    <div className="App">
      <Title>COLLETTERS</Title>
      <LogInContainer>
        <Route exact path="/">
          <LogIn 회원정보={회원정보} />
        </Route>
        <Route path="/join">
          <Join />
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <LetterProvider>
          <Route path="/main">
              <Main />
          </Route>
        </LetterProvider>
      </LogInContainer>
    </div>
  );
}

export default App;
