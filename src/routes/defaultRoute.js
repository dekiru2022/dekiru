import React, { useEffect } from "react";
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut, AmplifySignIn } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/page/header/Header';
import Notice from '../components/page/setting/Notice';
import Settings from '../components/page/header/Settings';
import Home from '../components/page/Home';
import IndexResolver from "../components/page/question/questionList/IndexResolver";
import Copyright from '../components/page/footer/Copyright';
import BasicDetail from '../components/page/setting/usrtInformation/BasicDetail';
import Confirm from '../components/page/question/postQuestion/CreateQuestion3';
import QuestionList from '../components/page/question/QuestionCard';
import Mypage from '../components/page/setting/Mypage';
import ShowQuestion from '../components/page/question/questionList/ShowQuestion';
import BasicDetailsEdit from '../components/page/setting/usrtInformation/BasicDetailsEdit';
import '../styles/App.css';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

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

  return(
    <BrowserRouter>
      {/* ヘッダー */}
      <Header />

      {/* ルーティング */}
      <Switch>

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
        <Route exact path="/componets/TopBar/BasicDetailsEdit" component={BasicDetailsEdit} />

      </Switch>

      {/* フッター */}
      <Copyright sx={{ mt: 5, width: '100%' }} />

    </BrowserRouter>
  )
}
export default DefaultRoute;