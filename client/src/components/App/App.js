import React, { useEffect } from 'react';
import './App.css';
import MainPageWithLeftDrawer from '../screens/MainPage/MainPageWithLeftDrawer';
import { Switch, Route } from "react-router-dom";
import { routes } from '../../constants';
import RegisterPage from '../screens/RegisterPage';
import LoginPage from '../screens/LoginPage';
import { useRecoilValue } from 'recoil';
import { loggedInState, useSetLoggedInState } from '../../store/loggedIn';
import InboxPage from '../screens/InboxPage'
import SentPage from '../screens/SentPage'
import { useHistory, useLocation } from 'react-router-dom'
import callAPI from '../../util/apiCall'


function App() {

  const history = useHistory()
  const location = useLocation()
  const loggedIn = useRecoilValue(loggedInState)
  const SetLoggedInState = useSetLoggedInState()

  // if (!loggedIn && location.pathname !== routes.login && location.pathname !== routes.register) {
  //   history.push(routes.login)
  //   return ""
  // }

  useEffect(() => {
    (async function () {
      const res = await callAPI('/api/user/check', 'get')
      if (res.code === 200){
        SetLoggedInState(true)
      } else {
        history.push(routes.login)
      }
    })()
  }, [])

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
