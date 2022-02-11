//
// PostQuestion.jsx
// 我喜屋　吉田
// 2022/1/29
// 質問投稿画面
//

// インポート一覧
import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
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
import { createQuestions as createQuestionsMutation} from '../../../graphql/mutations';
import { onCreateQuestions } from '../../../graphql/subscriptions';

// カテゴリー取得
import { categories } from '../../../database/categories_table';

// test
const initialFormState = { title: '', content: '' }

// 質問投稿機能　main
function PostQuestion() {

  // フォームの入力値格納
  // リストボックスの値格納
  const [categoriesArray, setCategoriesArray] = useState(categories);
  const [notes, setNotes] = useState([]);

  // test
  const initialFormState = { title: '', content: '' }
  const [formData, setFormData] = useState(initialFormState);


  // コンポーネント再描画のたびに初期化
  useEffect(() => {
    getCategoryData();

  }, []);

  // DBからカテゴリ一覧を取得
  const getCategoryData = () => {
  }



   // 入力チェック
   async function inputChecl() {
    if (formData.title == "" || formData.content == "" | formData.categoryId == null){
      alert('全ての項目を入力してください');
    }else  {
      let result= window.confirm('相談を送信してもよろしいですか？');
      // OKボタン押下時
      if(result) {
        createQuestions();
        window.location.href = '/indexResolver'; 
      // キャンセルボタン押下時
      } else {
       // 何も処理を行わない
      }
    }
  }

  // データ送信
  async function createQuestions() {
    if (!formData.title || !formData.content) return;
    formData.userId = "inputQuestionUserId";
    // formData.categoryId = 1;
    formData.status = 1;
    formData.createdAt = "2022-02-10 00:00:00";
    formData.updatedAt = "2022-02-10 00:00:00";
    formData.deleteFlg = 0;

    console.log(formData);
    await API.graphql({ query: createQuestionsMutation, variables: { input: formData } });
    setNotes([...notes, formData]);
    setFormData(initialFormState);

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
          <StyleButton title="相談する" onClick={inputChecl}/>

        </Grid>
      </Grid>
    </>
  )
}
export default PostQuestion


