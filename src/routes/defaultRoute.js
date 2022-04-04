import React, { useEffect, createRef ,useState} from "react";
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
import Setting from '../components/page/setting/Setting';
import ShowQuestion from '../components/page/question/questionList/ShowQuestion';
import BasicDetailsEdit from '../components/page/setting/userInformation/BasicDetailsEdit';
import BasicDetailsUserEdit from '../components/page/setting/userInformation/BasicDetailsUserEdit';
import PostQuestion from '../components/page/question/PostQuestion';
import IndexQuestion from '../components/page/question/questionList/IndexQuestion';
import Money from '../components/page/setting/userInformation/Money';
import Survey_for_A from "../components/page/questionnaire/Survey_for_A";
import Survey_for_Q from "../components/page/questionnaire/Survey_for_Q";
import NotificationSystem from 'react-notification-system';

import { onCreateNotice } from '../graphql/subscriptions';
import { API, graphqlOperation } from 'aws-amplify';
import '../styles/App.css';

Amplify.configure(awsconfig);

function DefaultRoute() {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  //プッシュ通知
  const ref = createRef();
  const [title, setTitle] = useState("あなたは選ばれました");
  const [level, setLevel] = useState("success");
  const [position, setPosition] = useState("tr");
  const [uid, setUid] = React.useState(0);
  const [autoDismiss, setAutoDismiss] = useState(30);

  // useEffect(() => {
  //   onAuthUIStateChange((nextAuthState, authData) => {
  //     setAuthState(nextAuthState);
  //     setUser(authData);
  //   });
  // }, []);

  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onCreateNotice)).subscribe({
      next: (eventData) => {
        const URL = eventData.value.data.onCreateNotice.linkDestinationUrl;
        console.log(URL);
        ref.current.addNotification({
          title,
          level,
          position,
          uid,
          autoDismiss,
          action: {
            label: "相談者に会う",
            callback: () => window.open(URL)
          }
        });
      }
    });
    return () => subscription.unsubscribe();
  })
  
  return(
    <BrowserRouter>
      {/* ヘッダー */}
      <Header />
      {/* <button
        onClick={() => {
          ref.current.addNotification({
            title,
            level,
            position,
            uid,
            autoDismiss,
            action: {
              label: "Follow me",
              callback: () => window.open("/")
            }
          });
          setUid(uid + 1);
        }}
      >
        Add notification
      </button> */}
      {/* 必要 */}
      <NotificationSystem ref={ref} />

      {/* ルーティング */}
      <Switch>

        {/* ヘッダーナビゲーション関係 */}
        <Route exact path="/notifications" component={Notice} />
        <Route exact path="/setting" component={Setting} />

        {/* 質問投稿関係 */}
        <Route exact path="/postQuestion" component={PostQuestion} />
        <Route exact path="/" component={Home} />
        <Route exact path="/showQuestion/:QuestionId" component={ShowQuestion} />
        <Route exact path='/indexResolver/:QuestionId' component={IndexResolver} />
        <Route exact path="/indexQuestion" component={IndexQuestion} />
        <Route exact path="/indexQuestion/:AnswerId" component={IndexQuestion} />
        
        <Route exact path="/componets/TopBar/Question/Detail" component={BasicDetail} />
        {/* ユーザ関係 */}
        <Route exact path="/BasicDetailsEdit" component={BasicDetailsEdit} />
        <Route exact path="/BasicDetailsUserEdit" component={BasicDetailsUserEdit} />
        <Route exact path="/PointPurchase/:userId" component={Money} />

        {/* アンケート関係 */}
        <Route exact path="/questionnaire/:questionId/questioner" component={Survey_for_Q} />
        <Route exact path="/questionnaire/:questionId/respondent" component={Survey_for_A} />
      </Switch>

      {/* フッター */}
      <Copyright sx={{ mt: 5, width: '100%' }} />

    </BrowserRouter>
  )
}
export default DefaultRoute;