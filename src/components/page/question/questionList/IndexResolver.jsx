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

// テスト用データ
import { questions as TestQuestions } from '../../../../database/questions_table';
import { users as TestUsers } from '../../../../database/users_table';


export default function IndexResolver() {
    const [authUsers, setAuthUsers] = useState(TestUsers[0]);
    const [users, setUsers] = useState(TestUsers);
    //DBからとってきた質問
    const [question, setQuestion] = useState(TestQuestions[0]);

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
                  {question.title}
                </Typography>
                <Typography sx={{ mt: 1.5 }} color="text.secondary">
                  詳細
                </Typography>
                <Typography variant="body2">
                {question.content}
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
                              {'　　　　　　　　　　　　　　　　　　' + user.ages + '歳'}
                            </Typography>
                            <Typography color="text.secondary">
                              {'保有資格：' + user.certification}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {'職務経験：' + user.workyear + '年'}
                              <br />
                              {'解決時間：' + user.questionResultTime　+ '分'}
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
