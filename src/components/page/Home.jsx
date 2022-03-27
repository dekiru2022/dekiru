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
/**
 * Home
 * @returns none
 */
export default function Home() {

  return (
    <>
      ご登録いただきありがとうございました。
    </>
  );
}
