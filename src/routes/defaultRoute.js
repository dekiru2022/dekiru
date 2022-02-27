import React, { useEffect } from "react";
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut, AmplifySignIn } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/page/header/Header';
import Notice from '../components/page/setting/Notice';
import Home from '../components/page/Home';
import IndexResolver from "../components/page/question/questionList/IndexResolver";
import Copyright from '../components/page/footer/Copyright';
import BasicDetail from '../components/page/setting/userInformation/BasicDetail';
import QuestionList from '../components/page/question/QuestionCard';
import Setting from '../components/page/setting/Setting';
import ShowQuestion from '../components/page/question/questionList/ShowQuestion';
import BasicDetailsEdit from '../components/page/setting/userInformation/BasicDetailsEdit';
import PostQuestion from '../components/page/question/PostQuestion';
import IndexQuestion from '../components/page/question/questionList/IndexQuestion';
import Money from '../components/page/setting/userInformation/Money';
import '../styles/App.css';

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
        <Route exact path="/notifications" component={Notice} />
        <Route exact path="/setting" component={Setting} />

        {/* 質問投稿関係 */}
        <Route exact path="/postQuestion" component={PostQuestion} />
        <Route exact path="/" component={Home} />
        <Route exact path="/showQuestion" component={ShowQuestion} />
        <Route exact path="/indexResolver" component={IndexResolver} />
        <Route exact path="/indexQuestion" component={IndexQuestion} />
        <Route exact path="/componets/TopBar/QuestionList" component={QuestionList} />
        <Route exact path="/componets/TopBar/Question/Detail" component={BasicDetail} />
        {/* ユーザ関係 */}
        <Route exact path="/BasicDetailsEdit" component={BasicDetailsEdit} />
        <Route exact path="/PointPurchase" component={Money} />
      </Switch>

      {/* フッター */}
      <Copyright sx={{ mt: 5, width: '100%' }} />

    </BrowserRouter>
  )
}
export default DefaultRoute;