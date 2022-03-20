import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import { StyleChengeButton } from '../../../ui/styleButton';
import FormControl from '@mui/material/FormControl';
import { StyleTextField, StyleMultilineTextField, StyleInputTextField } from '../../../ui/styleTextField';
import { updateUserId as updateUserIdMutation } from '../../../../graphql/mutations';
import { onUpdateUserId } from '../../../../graphql/subscriptions';
import { API, graphqlOperation } from 'aws-amplify';
import { Auth } from 'aws-amplify'
import { getCognitoUserId, listUserIds, getUserId } from '../../../../graphql/queries';
import { Label } from '@mui/icons-material';


function BasicDetailsEdit() {

    const id = 1;

    const [formData, setFormData] = useState();
    const [notes, setNotes] = useState([]);
    const [user, setUser] = useState([]);

    // user情報の取得（cognito）
    const getUserDataAws = async () => {
        let user1 = await Auth.currentAuthenticatedUser();
        let cognitoID = user1.attributes.sub;
        fetchUsers(cognitoID);
    }
    // user情報の取得（DynamoDB）
    const fetchUsers = async (cognitoID) => {
        console.log("cognitoID:",cognitoID);
        const apiData = await API.graphql(graphqlOperation(getUserId, { id: cognitoID }));
        setUser(apiData.data.getUserId)
        console.log("apiData:",apiData.data.getUserId);//.data.getCognitoUserId.items
    }

    useEffect(() => {
        getUserDataAws()
    }, [])

    // 入力チェック
    async function inputCheck() {
        if (user.handleName == "" || user.mail == "") {
            alert('ユーザー名とメールは必須項目です。');
        } else {
            let result = window.confirm('相談を送信してもよろしいですか？');
            // OKボタン押下時
            if (result) {
                createQuestions();
                window.location.href = '/setting';
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
                        <StyleInputTextField
                            label="ユーザー名"
                            value={user.handleName || ''}  //「 || ''」を入れないとラベルと重なる
                            // 現在変更不可
                            // onChange={e => setUser({ ...user, 'handleName': e.target.value })}
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
                        <StyleInputTextField
                            label="メールアドレス"
                            value={user.mail='' ? '' : user.mail || ''}  //「 || ''」を入れないとラベルと重なる
                            // 現在変更不可
                            // onChange={e => setUser({ ...user, 'mail': e.target.value })}
                        />
                    </Grid>
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant="h5">
                    資格情報
                </Typography>
                <Typography variant="h5">
                    <Grid item style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <StyleInputTextField
                            label="資格"
                            value={ (user.licenseFlag === 0 || user.licenseFlag === null) ? 'なし' || '' : 'あり' || ''}  //「 || ''」を入れないとラベルと重なる
                            // 現在変更不可
                            // onChange={e => setUser({ ...user, 'mail': e.target.value })}
                        />
                    </Grid>
                </Typography>
            </CardContent>
            <CardActions disableSpacing style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                <StyleChengeButton title="資格登録" onClick={inputCheck} />
            </CardActions>
        </Card>
    );
}

export default BasicDetailsEdit
