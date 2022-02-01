//
// Home.jsx
// 我喜屋
// 2022/1/31
// ホーム画面
//

// インポート一覧
import * as React from 'react';
// Material UI インポート
import { Grid } from '@material-ui/core'
// 共通部品（Button）
import { StyleButton } from '../ui/styleButton';
// 画像　インポート
import HomeTop from '../../images/HOME-Top.png'

/**
 * Home
 * @returns none
 */
export default function Home() {
  return (
    <>
      {/* 画像 */}
      <p style={{ position: 'relative', width: '100%', height: '480px', overflow: 'hidden' }}>
        <img width="100%" src={HomeTop} alt="Top" style={{ position: 'relative', top: '-330px' }} ></img>
      </p>

      {/* ボタン */}
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <StyleButton title="相談する" to="/postQuestion" ></StyleButton>
        </Grid>
        <Grid item>
          <StyleButton title="解決する" to="/indexQuestion" />
        </Grid>
      </Grid>
    </>
  );
}
