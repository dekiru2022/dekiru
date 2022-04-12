//
//  QuestionCardResolver.jsx
//  吉田　香坂
//  2022/2/2
//
//  質問一覧表示用カード
//  質問者の内容や質問詳細を簡易的に表示する
//

//  インポート一覧
import React from 'react';
import { StyleButton } from '../../ui/styleButton';
//  ui インポート
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { green, red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';

// メイン画面（カード）
export const QuestionCardResolver = (props) => {

  // 変数宣言
  const { question } = props

  return (
    <>
      {/* PC用 */}
      <Card className="pc-area" sx={{ width: '100%', height: '20rem', border: '0.1rem solid #26418D', position: 'relative' }}>
        {/* ヘッダー（カード内） */}
        <CardHeader
          // 相談タイトル
          avatar={
                <Avatar  aria-label="recipe" src={`https://mydreams769891ee61d8400295a4455b85879f9f123131-develop.s3.ap-northeast-1.amazonaws.com/public/${question.userId}/ProfileImage/public.png`}>
                </Avatar>
        }
          title={question.title}
          titleTypographyProps={{ variant: 'h5' }}
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
          <StyleButton title="回答する" to={`/showQuestion/${question.id}`} />
        </CardActions>
      </Card>

      {/* スマホ用 */}
      <Card className="smartphone-area" sx={{ width: '100%', height: '15rem', border: '0.1rem solid #26418D', position: 'relative' }}>
        {/* ヘッダー（カード内） */}
        <CardHeader
          // 相談タイトル
          title={question.title}
          titleTypographyProps={{ variant: 'h5' }}
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
          <StyleButton title="回答する" to={`/showQuestion/${question.id}`} />
        </CardActions>
      </Card>
    </>
  );
}
