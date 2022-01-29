//
// PostQuestion.jsx
// 我喜屋　吉田
// 2022/1/29
// 質問投稿画面
//

// インポート一覧
import React, { useState, useEffect } from 'react';
import { Link as LinkRouter } from 'react-router-dom';
// Material UI インポート
import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import TextField from "@material-ui/core/TextField";
import Tooltip from '@material-ui/core/Tooltip';

// TEST 削除予定
import { categories } from '../../../database/categories_table';


// 質問投稿機能　main
function PostQuestion() {

  // フォームの入力値格納
  const [formData, setFormData] = useState({ category_id: 1, category: '', title: '', content: '' });
  // リストボックスの値格納
  const [categoriesArray, setCategoriesArray] = useState(categories);

  // コンポーネント再描画のたびに初期化
  useEffect(() => {
    getCategoryData();
  }, []);

  //DBからカテゴリ一覧を取得
  const getCategoryData = () => {
  }
  
  //入力がされたら(都度)入力値を変更するためのfunction
  const inputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    formData[key] = value;
    formData.category = categoriesArray[value - 1].category;
    let data = Object.assign({}, formData);
    setFormData(data);
  }

  //入力値を投げる
  const createQuestion = async () => {
    if (formData == '') {
      return;
    }
  }

  // 画面描画
  return (
    <Box >
      {/* カテゴリー選択 */}
      <FormControl sx={{ width: 820 }}>
        <InputLabel id="demo-multiple-name-label">カテゴリー</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="カテゴリー"
          onChange={inputChange}
          name="category_id"
          defaultValue={formData.category_id}
        >
          {categoriesArray.map((categoryArray, index) => (
            <MenuItem value={categoryArray.id} key={index}>{categoryArray.category}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* タイトル入力 */}
      <TextField
        name="title"
        label="タイトル"
        fullWidth
        margin="normal"
        value={formData.title}
        placeholder="【至急】〇〇〇..."
        onChange={inputChange}
      />
      {/* 相談内容入力 */}
      <Tooltip
        title="自由に記入することができます"
        placement="top-start"
        arrow
      >
        <TextField
          name="content"
          label="相談内容"
          fullWidth
          margin="normal"
          rows={8}
          multiline
          variant="outlined"
          value={formData.content}
          onChange={inputChange}
          placeholder="
             - 聞きたいこと（質問の概要）&#13;
             - 目的（それを聞いてあなたは何がしたいのか）&#13;
             - 状況（あなたが今どのような状況で、なぜ悩んでいるのか）&#13;
             - 何でどこまで調べて何がわかったか（自分でやった事）&#13;
             - あなたの考え（自分としてはどうするべきと判断しているのか）&#13;
            ※ご自由に記載ください"
        /> 
      </Tooltip>
      
      {/* ボタン */}
      <Grid container>
        <Grid item sm={2} />
        <Grid item xs={12} lg={8} spacing={10} sx={{ justifyContent: 'center' }}>
          <Button>
            戻る
          </Button>
          <Button xs={{ width: '100' }} variant="contained" color="primary" component={LinkRouter} to={`/indexResolver`}>相談する</Button>
        </Grid>
      </Grid>
    </Box>
  )
}
export default PostQuestion


