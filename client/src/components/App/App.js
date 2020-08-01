import React, { useState } from 'react';
import './App.css';
import MainPageWithLeftDrawer from '../screens/MainPage/MainPageWithLeftDrawer';
import { Switch, Route } from "react-router-dom";
import { routes } from '../../constants';
import RegisterPage from '../screens/RegisterPage';
import LoginPage from '../screens/LoginPage';
import { useRecoilValue } from 'recoil';
import { loggedInState } from '../../store/loggedIn';
import InboxPage from '../screens/InboxPage'
import SentPage from '../screens/SentPage'
import { useHistory, useLocation } from 'react-router-dom'


function App() {

  const history = useHistory()
  const location = useLocation()
  const loggedIn = useRecoilValue(loggedInState)

  if (!loggedIn && location.pathname !== routes.login && location.pathname !== routes.register){ 
     history.push(routes.login)
     return ""
  }

  return (
    <>
      <Switch>
        <Route exact path={routes.register}>
          <RegisterPage />
        </Route>
        <Route exact path={routes.login}>
          <LoginPage />
        </Route>
        <MainPageWithLeftDrawer>
          <Route exact path={routes.sent}>
            <SentPage />
          </Route>
          <Route exact path={routes.inbox}>
            <InboxPage />
          </Route>
        </MainPageWithLeftDrawer>
      </Switch>
    </>
  );
}

export default App;
