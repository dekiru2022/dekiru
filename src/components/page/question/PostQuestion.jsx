//
// PostQuestion.jsx
// 我喜屋　吉田
// 2022/1/29
// 質問投稿画面
//

// インポート一覧
import React, { useState, useEffect } from 'react';
import { API, Auth, graphqlOperation } from 'aws-amplify';

// Material UI インポート
import { Grid } from '@material-ui/core'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Tooltip from '@material-ui/core/Tooltip';
// 共通部品　インポート
import { StyleButton, BorderButton } from '../../ui/styleButton';
import { StyleTextField, StyleMultilineTextField } from '../../ui/styleTextField';
// Graphql インポート
import { createQuestions as createQuestionsMutation } from '../../../graphql/mutations';
import { listQuestions , getUserId } from '../../../graphql/queries';
// カテゴリー取得
import { categories } from '../../../database/categories_table';
import { Button } from '@mui/material';

// 質問投稿機能　main
function PostQuestion() {
  const [user, setUser] = useState();

  // フォームの入力値格納
  // リストボックスの値格納
  const [categoriesArray, setCategoriesArray] = useState(categories);
  const [checkBottomFlag, setCheckBottomFlag] = useState([]);
  // test
  const initialFormState = { title: '', content: '' }
  const [formData, setFormData] = useState(initialFormState);

  const [checkPoint, setCheckPoint] = useState([]);
  // コンポーネント再描画のたびに初期化
  useEffect(() => {
    getUserData();

  }, []);
  
  // DBからカテゴリ一覧を取得
  const getUserData = async () => {
    const user1 = await Auth.currentAuthenticatedUser();
    let cognitoID = user1.attributes.sub;

    const apiUserData = await API.graphql(graphqlOperation(getUserId, { id: cognitoID }));
    setUser(apiUserData.data.getUserId);

    checkMoney(apiUserData.data.getUserId);
    checkBotton(cognitoID);
  }

  async function checkMoney(checkPoint1) {
    let point = checkPoint1.point;
    let transferPoint = checkPoint1.transferPoint;
    let sumPoint = point + transferPoint;

    if (sumPoint >= '200') {
      setCheckPoint(1);
    } else {
      setCheckPoint(0);
    }
  }
//描画ごとに現在質問中かチェック
  async function checkBotton(cognitoID,nextToken = null) {
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

    if (result.data.listQuestions.items.length > 0) {
      // 質問中
      setCheckBottomFlag(2);
    } else {
      //質問していない
      setCheckBottomFlag(1);
    }
  }
  // 入力チェック
  async function inputCheck() {
    if (checkBottomFlag == 2) {
      alert('質問中のため、質問できません。');
    } else if (formData.title == "" || formData.content == "" | formData.categoryId == null) {
      alert('全ての項目を入力してください');
    } else {
      let result = window.confirm('相談を送信してもよろしいですか？');
      // OKボタン押下時
      if (result) {
        createQuestions();
        // キャンセルボタン押下時
      } else {
        // 何も処理を行わない
      }
    }
  }


// データ送信
async function createQuestions() {
  let user1 = await Auth.currentAuthenticatedUser();
  let datetime = new Date().toISOString();

  formData.userId = user1.attributes.sub;
  formData.status = 1;
  formData.createdAt = datetime;
  formData.updatedAt = datetime;
  formData.deleteFlg = 0;

  const r = await API.graphql({ query: createQuestionsMutation, variables: { input: formData } });
  const url = r.data.createQuestions.id;
  window.location.href = `/indexResolver/${url}`;
}

// 画面描画
return (
  <>
    <Grid container direction="column" spacing={2}>

      {/* タイトル */}
      <Grid item style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ fontSize: '36px' }}>相談入力</div>
      </Grid>

      {/* カテゴリー選択 */}
      <Grid item style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
        <FormControl fullWidth>
          <InputLabel style={{ fontSize: '21px' }} id="demo-multiple-title-label" >カテゴリー</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="カテゴリー"
            title="category_id"
            style={{ fontSize: '21px' }}
            onChange={e => setFormData({ ...formData, 'categoryId': e.target.value })}
            value={formData.categoryId}
          >
            {categoriesArray.map((categoryArray, index) => (
              <MenuItem style={{ fontSize: '18px' }} value={categoryArray.categoryId} key={index}>{categoryArray.category}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* タイトル入力 */}
      <Grid item style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
        <StyleTextField
          label="タイトル"
          placeholder="【至急】〇〇〇..."
          onChange={e => setFormData({ ...formData, 'title': e.target.value })}
          value={formData.title}
        />
      </Grid>

      {/* 相談内容入力 */}
      <Grid item style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
        <Tooltip
          title="自由に記入することができます"
          placement="top-start"
          arrow
        >
          <StyleMultilineTextField
            label="相談内容"
            onChange={e => setFormData({ ...formData, 'content': e.target.value })}
            value={formData.content}
            rows={8}
            placeholder="
            - 聞きたいこと（質問の概要）&#13;
            - 目的（それを聞いてあなたは何がしたいのか）&#13;
            - 状況（あなたが今どのような状況で、なぜ悩んでいるのか）&#13;
            - 何でどこまで調べて何がわかったか（自分でやった事）&#13;
            - あなたの考え（自分としてはどうするべきと判断しているのか）&#13;
            ※ご自由に記載ください"
          />
        </Tooltip>
      </Grid>
    </Grid>

    {/* ボタン */}
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>
        <BorderButton to="" />
      </Grid>
      <Grid item>
        {checkPoint
        ?<Button sx={{ mr: 12 }} style={{ fontSize: 20 }} variant='contained' color="success" title="相談する" onClick={inputCheck} >依頼する</Button>
        :<Button sx={{ mr: 12 }} style={{ fontSize: 20 }} variant='contained' target="_blank"  >ポイント購入</Button>
        }
      </Grid>
    </Grid>
  </>
)
}
export default PostQuestion


