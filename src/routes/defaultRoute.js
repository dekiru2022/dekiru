import React, {useEffect} from "react";
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut,AmplifySignIn } from '@aws-amplify/ui-react';
import {AuthState, onAuthUIStateChange} from "@aws-amplify/ui-components";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
<<<<<<< HEAD
import Header from '../pages/components/header/Header';
import Notice from '../pages/components/setting/Notice';
import Settings from '../pages/components/header/Settings';
import Home from '../pages/components/Home';
import IndexResolver from "../pages/components/question/questionList/IndexResolver";
import Copyright from '../pages/components/footer/Copyright';
import BasicDetail from '../pages/components/setting/userInformation/BasicDetail';
import QuestionList from '../pages/components/question/QuestionCard';
import Mypage from '../pages/components/setting/Mypage';
import ShowQuestion from '../pages/components/question/questionList/ShowQuestion';
import BasicDetailsEdit from '../pages/components/setting/userInformation/BasicDetailsEdit';
import '../App.css';
=======
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
>>>>>>> dekiru/develop-fix

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