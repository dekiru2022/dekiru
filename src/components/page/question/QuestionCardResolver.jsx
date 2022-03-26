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
import { StyleButton } from '../../ui/styleButton';
//  ui インポート
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
// Graphql インポート
import { listQuestions } from '../../../graphql/queries';

import { API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';



// メイン画面（カード）
export const QuestionCardResolver = (props) => {

  // 変数宣言
  const {question} = props

  return (
    
    <Card sx={{ m: 1, width:'40rem', height: '20rem', border: '0.1rem solid #26418D', position: 'relative' }}>
      {/* ヘッダー（カード内） */}
      <CardHeader
        // 相談タイトル
        title={question.title}
        titleTypographyProps={{variant: 'h5' }}
        // 相談作成時間
        subheader={question.createdAt}
        style={{ marginTop: '0.5%' }}
      />

      {/* 相談内容（カード内） */}
      <CardContent>
        <Typography variant="subtitle" color="text.secondary">
          {question.content}
        </Typography>
      </CardContent>

      {/* フッター（カード内） */}
      <CardActions disableSpacing style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
        {/* <Button variant='contained' component={LinkRouter} to="/showQuestion" >できます！</Button> */}
        <StyleButton title="回答する" to={`/showQuestion/${question.id}`} />
      </CardActions>
    </Card>
  );
}
