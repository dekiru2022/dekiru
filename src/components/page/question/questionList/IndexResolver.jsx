//
//  ファイル名
//  作成者
//  作成日時
//
//  解決希望者一覧
//


import React, { useState, useEffect, useMemo } from 'react';
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

import { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

export default function IndexResolver() {
    const [authUsers, setAuthUsers] = useState(TestUsers[0]);
    const [users, setUsers] = useState(TestUsers);
    //DBからとってきた質問
    // const [question, setQuestion] = useState(TestQuestions[0]);
    const [questions, setQuestions] = useState();
    const [user, setResolver] = useState();

    // 再描画のたびに実行
    useEffect(() => {
      // getQuestionsData();
      fetchQuestion();
      fetchListResolver();
  }, [])

    // 表示
    async function fetchQuestion() {
      const apiData = await API.graphql({ query: listQuestions });
      setQuestions(apiData.data.listQuestions.items);

      // // ------追加------
      // API.graphql(graphqlOperation(onCreateQuestions)).subscribe({
      //     next: (eventData) => {
      //         const post = eventData.value.data.onCreateQuestions
      //         const posts = [...questions.filter(id => {
      //             return ( id !== post.id )
      //         }), post]
      //         console.log("question")
      //         console.log(apiData)
      //         setQuestions({ posts })
      //     }
      // })
      // ----ここまで-----
  }

      // 表示
      async function fetchListResolver() {
        const apiDataResolver = await API.graphql({ query: listUserIds });
        setResolver(apiDataResolver.data.listUserIds.items);
        console.log(apiDataResolver)
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'center' }}>
            <Box>
            {/* 質問内容 */}
            <Card sx={{ minWidth: 330, m: 3 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  質問内容
                </Typography>
                <Typography variant="h5" component="div">
                  {/* {questions.title} */}
                </Typography>
                <Typography sx={{ mt: 1.5 }} color="text.secondary">
                  詳細
                </Typography>
                <Typography variant="body2">
                {/* {questions.content} */}
                </Typography>
              </CardContent>
            </Card>
            
            {/* 解決者リスト */}
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                            <Typography color="text.secondary">
                              {'保有資格：' + user.firstName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {'職務経験：' + user.firstName + '年'}
                              <br />
                              {'解決時間：' + user.firstName+ '分'}
                            </Typography>
                          </CardContent>

                        <CardActions disableSpacing>
                          {/* 会議時間と自身のidはDBから取ってくる */}
                          <Button sx={{mr: 4}} variant='contained' color="success"  component={LinkRouter} to={`/skyway/10/${authUsers.id}`} target="_blank"  >依頼</Button>
                          {/* 張りぼて評価 */}
                          <StarIcon  sx={{ color: yellow[600] }} />
                          <StarIcon  sx={{ color: yellow[600] }} />
                          <StarIcon  sx={{ color: yellow[600] }} />
                          <StarIcon  sx={{ color: yellow[600] }} />
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

