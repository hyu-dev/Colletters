/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import './App.scss';
import LogIn from './LogIn';
import Join from './Join';
import { Link, Route, Switch } from 'react-router-dom';
import Welcome from './Welcome';
import Main from './Main';
import data from './data.js';

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
          <Route path="/main" component={Main} />
        </LogInContainer>
    </div>
  );
}

export default App;
