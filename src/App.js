/* eslint-disable */
import React from 'react';
import './App.scss';
import Join from './components/Join';
import { Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Main from './components/Main';
import LetterForm from './components/LetterForm';
import { LetterProvider } from './data/LetterContext';
import { DetailLetterProvider } from './data/DetailLetterContext';
import { LoginUserProvider } from './data/LoginUserContext';
import { TopTagsProvider } from './data/TopTagsContext';
import Login from './pages/Login';
import { ToggleProvider } from './data/_reducers/toggleComponent';

function App() {
  return (
    <div className="App">
      <h1 className="appTitle">COLLETTERS</h1>
      <LoginUserProvider>
      <ToggleProvider>
        <Route exact path="/">
          <Login isMain={false} />
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
              <Route path="/form">
                <LetterForm />
              </Route>
            </DetailLetterProvider>
          </TopTagsProvider>
        </LetterProvider>
      </ToggleProvider>
      </LoginUserProvider>
    </div>
  );
}

export default App;
