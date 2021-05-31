/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import './App.scss';
import LogIn from './components/LogIn';
import Join from './components/Join';
import { Link, Route, Switch } from 'react-router-dom';
import Welcome from './components/Welcome';
import Main from './components/Main';
import LetterForm from './components/LetterForm';
import { LetterProvider } from './data/LetterContext';
import { ModalProvider } from './data/ModalContext';
import { DetailLetterProvider } from './data/DetailLetterContext';
import { UserProvider, useUserState } from './data/UserContext';
import { LoginUserProvider } from './data/LoginUserContext';
import { TopTagsProvider } from './data/TopTagsContext';

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
  const userState = useUserState();

  return (
    <div className="App">
      <Title>COLLETTERS</Title>
      <LoginUserProvider>
      <LogInContainer>
        <Route exact path="/">
          <LogIn users={ userState } isMain={false} />
        </Route>
        <Route path="/join">
          <Join />
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <LetterProvider>
          <TopTagsProvider>
            <DetailLetterProvider>
              <Route path="/main">
                  <Main />
              </Route>
            </DetailLetterProvider>
          </TopTagsProvider>
        </LetterProvider>
        <Route path="/form">
          <LetterForm />
        </Route>
      </LogInContainer>
      </LoginUserProvider>
    </div>
  );
}

export default App;
