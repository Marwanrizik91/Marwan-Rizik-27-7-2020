import React, { useState } from 'react';
import './App.css';
import MainPageWithLeftDrawer from '../screens/MainPage/MainPageWithLeftDrawer';
import { Switch, Route } from "react-router-dom";
import { routes } from '../../constants';
import RegisterPage from '../screens/RegisterPage';



function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <>
      <MainPageWithLeftDrawer>
        <Switch>
          <Route exact path={routes.inbox}>
              {loggedIn? <div>hi</div>: <RegisterPage />}
          </Route>
          <Route exact path={routes.sent}>
            <div>sent</div>
          </Route>
          <Route exact path={routes.deleted}>
            <div>deleted</div>
          </Route>
        </Switch>
      </MainPageWithLeftDrawer>
    </>
  );
}

export default App;
