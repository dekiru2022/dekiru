//
//  ファイル名
//  作成者
//  作成日時
//
//  質問部品（カード）
//  質問者の内容や質問詳細を簡易的に表示する
//


import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';

import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { green, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import { Link as LinkRouter } from 'react-router-dom';

export default function QuestionCard(props) {
  const { question } = props;

  return (
    <Card sx={{ m: 1, minWidth: 300, maxWidth: 600 }}>
      <CardHeader
        avatar={
          question.user_id == 1
            ?
            <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
              {question.user_char_name}
            </Avatar>
            :
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {question.user_char_name}
            </Avatar>
        }
        action={<IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>}
        title={question.title}
        subheader={question.created_at} />
      {/*画像の利用の場合使用
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {question.content}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <Button variant='contained' component={LinkRouter} to="/showQuestion" >できます！</Button>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

      </CardActions>
    </Card>
  );
}