//
//  ファイル名:IndexResolver.jsx
//  作成者：板坂
//  作成日時:2/27
//
//  解決希望者一覧
//
import React, { useState, useEffect, } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { yellow } from '@mui/material/colors';
import { Link as LinkRouter } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// 張りぼての星
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
// Graphql インポート
import { listQuestions } from '../../../../graphql/queries';
import { onCreateQuestions } from '../../../../graphql/subscriptions';
import { listUserIds } from '../../../../graphql/queries';
import { onCreateUserId } from '../../../../graphql/subscriptions';

// テスト用データ
import { questions as TestQuestions } from '../../../../database/questions_table';
import { users as TestUsers } from '../../../../database/users_table';

import { API, Auth, graphqlOperation } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

export default function IndexResolver() {
  const [authUsers, setAuthUsers] = useState(TestUsers[0]);
  const [users, setUsers] = useState(TestUsers);
  //DBからとってきた質問
  // const [question, setQuestion] = useState(TestQuestions[0]);
  const [questions, setQuestions] = useState([]);
  const [user, setResolver] = useState();
  const [checkBottomFlag, setCheckBottomFlag] = useState([]);

  // 再描画のたびに実行
  useEffect(() => {
    // getQuestionsData();
    checkBotton();
  }, [])

  // 表示
  //描画ごとに現在質問中かチェック
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
    setQuestions(result.data.listQuestions.items);
    // null
    if (questions.data.listQuestions.items.length > 0) {
      setCheckBottomFlag(2);
    } else {
      setCheckBottomFlag(1);
    }
  }

  // 表示
  async function fetchListResolver() {
    const apiDataResolver = await API.graphql({ query: listUserIds });
    setResolver(apiDataResolver.data.listUserIds.items);
  }

  return (

    <Box sx={{ display: 'flex', justifyContent: 'center' }}>

      <Box>
        {/* 質問内容 */}
        <Card sx={{ minWidth: 330, m: 3 }}>
          {
            questions.map((question) => {
              return (
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    タイトル
                  </Typography>
                  <Typography variant="h5" component="div">
                    {question.title}
                  </Typography>
                  <Typography sx={{ mt: 1.5 }} color="text.secondary">
                    {/* {questions.data.listQuestions.items.content} */}詳細
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" variant="body2">
                    {question.content}
                  </Typography>
                </CardContent>
              );
            })
          }
        </Card>

        {/* 解決者リスト */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {
            users.map((user) => {
              return (
                <Card key={user.id} sx={{ m: 1, minWidth: 330, maxWidth: 500 }}>
                  <CardContent>
                    <Typography variant="h6">
                      {user.name}
                    </Typography>
                    <Typography variant="body2">
                      {'　　　　　　　　　　　　　　　　　　' + user.firstName + '歳'}
                    </Typography>
                    {/* <Typography color="text.secondary">
                              {'保有資格：' + user.firstName}
                            </Typography> */}
                    <Typography variant="body2" color="text.secondary">
                      {'職務経験：' + user.firstName + '年'}
                      <br />
                      {'解決時間：' + user.firstName + '分'}
                    </Typography>
                  </CardContent>

                  <CardActions disableSpacing>
                    {/* 会議時間と自身のidはDBから取ってくる */}
                    <Button sx={{ mr: 4 }} variant='contained' color="success" component={LinkRouter} to={`/skyway/10/${authUsers.id}`} target="_blank"  >依頼</Button>
                    {/* 張りぼて評価 */}
                    <StarIcon sx={{ color: yellow[600] }} />
                    <StarIcon sx={{ color: yellow[600] }} />
                    <StarIcon sx={{ color: yellow[600] }} />
                    <StarIcon sx={{ color: yellow[600] }} />
                    <StarOutlineIcon />
                  </CardActions>
                </Card>
              );
            })
          }
        </Box>
      </Box>
    </Box>
  );
}

