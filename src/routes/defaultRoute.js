import React, {useEffect} from "react";
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut,AmplifySignIn } from '@aws-amplify/ui-react';
import {AuthState, onAuthUIStateChange} from "@aws-amplify/ui-components";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../pages/components/header/Header';
import Notice from '../pages/components/setting/Notice';
import Settings from '../pages/components/header/Settings';
import Home from '../pages/components/Home';
import IndexResolver from "../pages/components/question/questionList/IndexResolver";
import Copyright from '../pages/components/footer/Copyright';
import BasicDetail from '../pages/components/setting/usrtInformation/BasicDetail';
import Confirm from '../pages/components/question/postQuestion/CreateQuestion3';
import QuestionList from '../pages/components/question/QuestionCard';
import Mypage from '../pages/components/setting/Mypage';
import ShowQuestion from '../pages/components/question/questionList/ShowQuestion';
import BasicDetailsEdit from '../pages/components/setting/usrtInformation/BasicDetailsEdit';
import '../App.css';

Amplify.configure(awsconfig);

function DefaultRoute() {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  useEffect(() => {
      onAuthUIStateChange((nextAuthState, authData) => {
          setAuthState(nextAuthState);
          setUser(authData);
      });
  }, []);
  
  return authState === AuthState.SignedIn && user ? (
    <BrowserRouter>
    <Header />
      <Switch>
        {/* 認証関係 */}
        {/* 削除予定 */}
        {/* <Route exact path="/" component={Signin} />
        <Route exact path="/signUp" component={SignUp} /> */}

        {/* ヘッダーナビゲーション関係 */}
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/notifications" component={Notice} />
        <Route exact path="/myPage" component={Mypage} />

        {/* 質問投稿関係 */}
        <Route exact path="/" component={Home} />
        <Route exact path="/showQuestion" component={ShowQuestion} />
        <Route exact path="/indexResolver" component={IndexResolver} />
        <Route exact path="/componets/TopBar/QuestionList" component={QuestionList} />
        <Route exact path="/componets/TopBar/Question/Detail" component={BasicDetail} />
        <Route exact path="/componets/TopBar/Question/Detail/Confirm" component={Confirm} />
        <Route exact path="/componets/TopBar/BasicDetailsEdit" component={BasicDetailsEdit} />
      </Switch>
      <Copyright sx={{ mt: 5, width: '100%' }} />
    </BrowserRouter>
  ) : (

    <AmplifyAuthenticator >
      {/* ログイン画面変更 */}
      {/* <AmplifySignIn slot="sign-in" hideSignUp={true} /> */}
    </AmplifyAuthenticator>

  );
}
export default DefaultRoute;