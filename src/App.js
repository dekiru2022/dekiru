import React, { useEffect } from "react";
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import DefaultRoute from './routes/defaultRoute';
import Skyway from './components/page/skyway/Skyway';

import Login from './components/authenticate/login';


Amplify.configure(awsconfig);

function App() {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return (
    <BrowserRouter>
      {/* headerとfooterがいらないページはここでルーティング */}
      <Switch>
        <Route path='/skyway/:time/:room' component={Skyway} />
        <Route path="/" component={
          authState === AuthState.SignedIn && user ?
            DefaultRoute
            :
            Login
        } />
      </Switch>
    </BrowserRouter>
  )
}
export default (App);

