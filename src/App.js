import React, { useEffect } from "react";
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import afterLoginRoute from './routes/afterLoginRoute';
import Login from './components/authenticate/login';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getUserId } from './graphql/queries';
Amplify.configure(awsconfig);

function App() {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
      getUserDate();
    });
  }, []);

  async function getUserDate(){
    let user1 = await Auth.currentAuthenticatedUser();

    const apiUserData = await API.graphql(graphqlOperation(getUserId, { id: user1.attributes.sub }));

    localStorage.setItem('categoryId', apiUserData.data.getUserId.categoryId);
  }
  return (
    <BrowserRouter>
      {/* ログイン関係のルーティング */}
      <Switch>
        <Route path="/" component={
          authState === AuthState.SignedIn && user ?
            afterLoginRoute
            :
            Login
        } />
      </Switch>
    </BrowserRouter>
  )
}
export default (App);
