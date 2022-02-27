import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import { StyleButton } from '../../../ui/styleButton';
import FormControl from '@mui/material/FormControl';
import { StyleTextField, StyleMultilineTextField } from '../../../ui/styleTextField';
import { updateUserId as updateUserIdMutation } from '../../../../graphql/mutations';
import { onUpdateUserId } from '../../../../graphql/subscriptions';


function BasicDetailsEdit() {

    const id = 1;

    const [user, setUser] = useState('');
    const [formData, setFormData] = useState();
    const [notes, setNotes] = useState([]);

    //ユーザ情報を取得しステートuserにセットする
    const getUserData = (id) => {

    }
    useEffect(() => {
        getUserData(id);
    }, [])


    //入力値を投げる
    const EditBasicDetails = async (id) => {
        console.log(user);

    }


  // 入力チェック
  async function inputCheck() {
    if (formData.handleName == "" || formData.mail == "") {
      alert('全ての項目を入力してください');
    } else {
      let result = window.confirm('相談を送信してもよろしいですか？');
      // OKボタン押下時
      if (result) {
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
    if (!formData.handleName || !formData.mail) return;
    console.log(formData);
    await API.graphql({ query: updateUserIdMutation, variables: { input: formData } });
    setNotes([...notes, formData]);
    setFormData();

  }


    return (

        <Card sx={{ m: 5, width: 'auto', height: '30rem', border: '0.1rem solid #26418D', position: 'relative' }}>
            <CardHeader
                title="ユーザー情報"
                titleTypographyProps={{ variant: 'h4' }}
                style={{ marginTop: '0.5%' }}
            />
            <CardContent>
                <Typography variant="h5">
                    ユーザー名
                </Typography>
                <Typography variant="h5">
                    <Grid item style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <StyleTextField
                            label="ユーザー名"
                            onChange={e => setFormData({ ...formData, 'handleName': e.target.value })}
                            // value={formData.handleName}
                        />
                    </Grid>
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant="h5">
                    メールアドレス
                </Typography>
                <Typography variant="h5">
                <Grid item style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <StyleTextField
                        label="メールアドレス"
                        onChange={e => setFormData({ ...formData, 'mail': e.target.value })}
                        // value={formData.mail}
                    />
                    </Grid>
                </Typography>
            </CardContent>
            <CardActions disableSpacing style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                <StyleButton title="変更" to="/setting" onClick={inputCheck} />
            </CardActions>
        </Card>
    );
}

export default BasicDetailsEdit
