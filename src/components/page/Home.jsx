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
import { StyleButton,StyleQuesButton } from '../ui/styleButton';
// 画像　インポート
import HomeTop from '../../images/HOME-Top.png'

import { API, Auth, graphqlOperation } from 'aws-amplify';
import { listQuestions, listAnswerUsers } from '../../graphql/queries';
import "../../styles/App.css";

/**
 * Home
 * @returns none
 */
export default function Home() {
  useEffect(() => {
    // getQuestionsData();
    checkBotton();
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
        "and": [
          {
            "userId": {
              "eq": cognitoID
            }
          },
          {
            "status": {
              "eq": "1"
            }
          }
        ]
      },
      limit: 10,
      nextToken: nextToken,
    }));
    console.log(result.data.listQuestions.items[0].id);
    const tmp = result.data.listQuestions.items[0].id;

    setQuestionId(tmp);
    console.log("home:" + questionId);

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
        "and": [
          {
            "userId": {
              "eq": cognitoID
            }
          },
          {
            "ansStatus": {
              "eq": "1"
            }
          }
        ]
      },
      limit: 10,
      nextToken: nextToken,
    }));
    console.log(ansResult);
    const tmpAns = ansResult.data.listAnswerUsers.items[0].id;
    setAnswerId(tmpAns);
    console.log("tmpAns :"+tmpAns);

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
      {/* 画像 */}
      <p className="pc-area" style={{ position: 'relative', width: '100%', height: '480px', overflow: 'hidden' }}>
        <img width="100%" src={HomeTop} alt="Top" style={{ position: 'relative', top: '-330px' }} ></img>
      </p>
      <p className="smartphone-area" style={{ margin: '10%' }}>
      </p>

      {/* ボタン 
      ? 真
      : 偽
      */}
      <Grid container spacing={8} justifyContent="center" alignItems="center">

        <Grid item>
          {checkBottomFlag
            ? <StyleButton title="相談する" to="/postQuestion" fontSize="3.2rem" />
            : <StyleQuesButton title="相談中" to={`/indexResolver/${questionId}`} fontSize="3.2rem" />
          }
        </Grid>
        <Grid item>
          {checkAnsFlag
            ? <StyleButton title="解決する" to="/indexQuestion" fontSize="3.2rem" />
            : <StyleQuesButton title="解決中" to={`/indexQuestion/${answerId}`} fontSize="3.2rem" />
          }
        </Grid>
      </Grid>
      <p className="smartphone-area" style={{ marginBottom: '10%' }}></p>
    </>
  );
}
