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
import { StyleButton } from '../ui/styleButton';
// 画像　インポート
import HomeTop from '../../images/HOME-Top.png'

import { API, Auth, graphqlOperation } from 'aws-amplify';
import { listQuestions } from '../../graphql/queries';
/**
 * Home
 * @returns none
 */
export default function Home() {
  useEffect(() => {
    // getQuestionsData();
    checkBotton();
  }, [])
  const [checkBottomFlag, setCheckBottomFlag] = useState([]);

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
    console.log(result);
    // null
    if (result.data.listQuestions.items.length > 0) {
      setCheckBottomFlag(0);
    } else {
      setCheckBottomFlag(1);
    }
  }

  return (
    <>
      {/* 画像 */}
      <p style={{ position: 'relative', width: '100%', height: '480px', overflow: 'hidden' }}>
        <img width="100%" src={HomeTop} alt="Top" style={{ position: 'relative', top: '-330px' }} ></img>
      </p>

      {/* ボタン */}
      <Grid container spacing={8} justifyContent="center" alignItems="center">

        <Grid item>
          {checkBottomFlag
            ? <StyleButton title="相談する" to="/postQuestion" fontSize="3.2rem" />
            : <StyleButton title="相談中" to="/indexResolver" fontSize="3.2rem" />
          }
        </Grid>
        <Grid item>
          <StyleButton title="解決する" to="/indexQuestion" fontSize="3.2rem" />
        </Grid>
      </Grid>
    </>
  );
}
