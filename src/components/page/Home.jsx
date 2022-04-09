//
// Home.jsx
// 我喜屋
// 2022/1/31
// ホーム画面
//

// インポート一覧
import React, { useState, useEffect } from 'react';
// Material UI インポート
import { Grid } from '@material-ui/core'
// 共通部品（Button）
import { StyleButton, StyleQuesButton } from '../ui/styleButton';
// 画像 インポート
import HomeTop from '../../images/MyDREAMS_HOME_PC.jpg'
import HomeTopPhone from '../../images/MyDREAMS_HomePhone.jpg'
import QuesButton from '../../images/相談する透過.png'
import ResolveButton from '../../images/解決する透過.png'

import { API, Auth, graphqlOperation } from 'aws-amplify';
import { listQuestions, listAnswerUsers } from '../../graphql/queries';
import "../../styles/App.css";
import { Link as LinkRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

/**
 * Home
 * @returns none
 */
export default function Home() {
  useEffect(() => {
    // getQuestionsData();
    checkBotton();
  }, [])

  useEffect(() => {
    // getQuestionsData();
    checkAnsBottom();
  }, [])
  
  const [checkBottomFlag, setCheckBottomFlag] = useState([]);
  const [questionId, setQuestionId] = useState([]);
  const [answerId, setAnswerId] = useState([]);
  const [checkAnsFlag, setCheckAnsFlag] = useState([]);

  //描画ごとに現在相談中かチェック
  async function checkBotton(nextToken = null) {

    let user1 = await Auth.currentAuthenticatedUser();
    const cognitoID = user1.attributes.sub;


    //filterの参考：https://qiita.com/isamuJazz/items/22b34985d9ee17d890c6
    const result = await API.graphql(graphqlOperation(listQuestions, {
      filter: {
        "userId": {  "eq": cognitoID },
        "status": { "eq": 1 }
      },
      limit: 100,
      nextToken: nextToken,
    }));
    console.log(result.data.listQuestions.items[0].id);
    setQuestionId(result.data.listQuestions.items[0].id);
    // console.log("home:" + questionId);

    // null
    if (result.data.listQuestions.items.length > 0) {
      // 質問中
      setCheckBottomFlag(0);
    } else {
      //質問していない
      setCheckBottomFlag(1);
    }

  }
  async function checkAnsBottom(nextToken = null) {
    let user1 = await Auth.currentAuthenticatedUser();
    const cognitoID = user1.attributes.sub;

    const ansResult = await API.graphql(graphqlOperation(listAnswerUsers, {
      filter: {
        "userId": {  "eq": cognitoID },
        "ansStatus": { "eq": 1 }
      },
      limit: 100,
      nextToken: nextToken,
    }));
    console.log(ansResult.data.listAnswerUsers.items[0].id);
    setAnswerId(ansResult.data.listAnswerUsers.items[0].id);

    //null
    if (ansResult.data.listAnswerUsers.items.length > 0) {
      // 解答中
      setCheckAnsFlag(0);
    } else {
      //解答していない
      setCheckAnsFlag(1);
    }
  }
  return (
    <>
      {/* PC */}
      <p className="pc-area" style={{ position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <img alignItems="center" width="100%" height="auto" src={HomeTop} ></img>
        <Grid container className="pc-area" justifyContent="center" alignItems="center" style={{ position: 'absolute', bottom: 0, left: 0 }} >
          <Grid item style={{ paddingRight: '1.5%' }} className="pc-area">
            {checkBottomFlag
              ? // <StyleButton title="相談する" to="/postQuestion" fontSize="3.2rem" />
                <Button component={LinkRouter} to="/postQuestion" style={{ width: '100%', height: 'auto' , border: '0.1rem solid #26418D', background: 'rgba(255,255,255,0.5)' }} ><img src={QuesButton}></img></Button>
              : // <StyleQuesButton title="相談中" to={`/indexResolver/${questionId}`} fontSize="3.2rem" />
                <Button component={LinkRouter} to={`/indexResolver/${questionId}`} style={{ width: '100%', height: 'auto' , border: '0.1rem solid #26418D', background: 'rgba(255,255,255,0.5)' }} ><img src={QuesButton}></img></Button>
            }
          </Grid>
          <Grid item style={{ paddingLeft: '1.5%' }} className="pc-area">
            {checkAnsFlag
              ? // <StyleButton title="解決する" to="/indexQuestion" fontSize="3.2rem" />
                <Button component={LinkRouter} to="/indexQuestion" style={{ width: '100%', height: 'auto' , border: '0.1rem solid #26418D', background: 'rgba(255,255,255,0.5)' }} ><img src={ResolveButton}></img></Button>
              : // <StyleQuesButton title="解決中" to={`/indexQuestion/${answerId}`} fontSize="3.2rem" />
                <Button component={LinkRouter} to={`/indexQuestion/${answerId}`} style={{ width: '100%', height: 'auto' , border: '0.1rem solid #26418D', background: 'rgba(255,255,255,0.5)' }} ><img src={ResolveButton}></img></Button>
            }
          </Grid>
        </Grid>
      </p>
      {/* スマホ */}
      <p className="smartphone-area" style={{ position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <img alignItems="center" width="100%" height="auto" src={HomeTopPhone} ></img>
        <Grid container className="smartphone-area" justifyContent="center" alignItems="center" style={{ position: 'absolute', bottom: 0, left: 0 }} >
          <Grid item style={{ paddingRight: '0.5%' }} xs={5} className="smartphone-area" >
            {checkBottomFlag
              ? //<StyleButton title="相談する" to="/postQuestion" fontSize="1.5rem" />
                <Button component={LinkRouter} to="/postQuestion" style={{ width: '100%', height: 'auto' , border: '0.1rem solid #26418D', background: 'rgba(255,255,255,0.5)' }} ><img src={QuesButton}></img></Button>
              : // <StyleQuesButton title="相談中" to={`/indexResolver/${questionId}`} fontSize="1.5rem" />
                <Button component={LinkRouter} to={`/indexResolver/${questionId}`} style={{ width: '100%', height: 'auto' , border: '0.1rem solid #26418D', background: 'rgba(255,255,255,0.5)' }} ><img src={QuesButton}></img></Button>
            }
          </Grid>
          <Grid item style={{ paddingLeft: '0.5%' }} xs={5} className="smartphone-area" >
            {checkAnsFlag
              ? // <StyleButton title="解決する" to="/indexQuestion" fontSize="1.5rem" />
                <Button component={LinkRouter} to="/indexQuestion" style={{ width: '100%', height: 'auto' , border: '0.1rem solid #26418D', background: 'rgba(255,255,255,0.5)' }} ><img src={ResolveButton}></img></Button>
              : // <StyleQuesButton title="解決中" to={`/indexQuestion/${answerId}`} fontSize="1.5rem" />
                <Button component={LinkRouter} to={`/indexQuestion/${answerId}`} style={{ width: '100%', height: 'auto' , border: '0.1rem solid #26418D', background: 'rgba(255,255,255,0.5)' }} ><img src={ResolveButton}></img></Button>
            }
          </Grid>
        </Grid>
      </p>
    </>
  );
}
