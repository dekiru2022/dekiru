//
//  QuestionCardResolver.jsx
//  吉田　香坂
//  2022/2/2
//
//  質問一覧表示用カード
//  質問者の内容や質問詳細を簡易的に表示する
//

//  インポート一覧
import React, { useState, useEffect } from 'react';
import { Link as LinkRouter } from 'react-router-dom';
//  ui インポート
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';

// メイン画面（カード）
export default function QuestionCard(props) {
  // 変数宣言
  const { question } = props;

  return (
    <Card sx={{ m: 1, minWidth: 300, maxWidth: 600 }}>
      {/* ヘッダー（カード内） */}
      <CardHeader
        avatar={
            <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
              {question.user_char_name}
            </Avatar>
        }
        // 相談タイトル
        title={question.title}
        // 相談作成時間
        subheader={question.created_at} />
      
      {/* 相談内容 */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {question.content}
        </Typography>
      </CardContent>

      {/* フッター（カード内） */}
      <CardActions disableSpacing>
        <Button variant='contained' component={LinkRouter} to="/showQuestion" >できます！</Button>
      </CardActions>
    </Card>
  );
}