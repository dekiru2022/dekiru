import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Button from '@material-ui/core/Button';
import { StyleChengeButton } from '../../../ui/styleButton';
import { StyleTextField } from '../../../ui/styleTextField';
import { updateUserId as UpdateUserIdMutation } from '../../../../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import { Auth } from 'aws-amplify'
import { getUserId } from '../../../../graphql/queries';


function BasicDetailsUserEdit() {

    const [user, setUser] = useState([]);

    // user情報の取得（cognito）
    const getUserDataAws = async () => {
        let user1 = await Auth.currentAuthenticatedUser();
        let cognitoID = user1.attributes.sub;
        fetchUsers(cognitoID);
    }

    // user情報の取得（DynamoDB）
    const fetchUsers = async (cognitoID) => {
        const apiData = await API.graphql(graphqlOperation(getUserId, { id: cognitoID }));
        setUser(apiData.data.getUserId)
    }

    useEffect(() => {
        getUserDataAws()
    }, [])

    // データ送信
    const updateUser = async () => {
        await API.graphql(graphqlOperation(UpdateUserIdMutation, { input: user }))
    }


    // 入力チェック
    const inputCheck = () => {
        const result = window.confirm('相談を送信してもよろしいですか？');
        // OKボタン押下時
        if (result) {
            console.log("updateUserInfo:", user)
            updateUser()
        } else {
            // キャンセルボタン押下時
            // 何も処理を行わない
        }
    }

    return (
        <Card sx={{ m: 5, width: 'auto', height: 'auto', border: '0.1rem solid #26418D', position: 'relative' }}>
            <CardHeader
                title="ユーザー詳細情報"
                titleTypographyProps={{ variant: 'h4' }}
                style={{ marginTop: '0.5%' }}
            />

            {/* 名前 */}
            <CardContent>
                <Typography variant="h5">
                    名前
                </Typography>
                <Typography variant="h5">
                    <Grid container style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <Grid item xs={5.9} mr={'0.83%'} >
                            <StyleTextField
                                label="姓"
                                value={user.lastName || ''}  //「 || ''」を入れないとラベルと重なる
                                onChange={e => setUser({ ...user, 'lastName': e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={5.9} ml={'0.83%'} >
                            <StyleTextField
                                label="名"
                                value={user.firstName || ''}  //「 || ''」を入れないとラベルと重なる
                                onChange={e => setUser({ ...user, 'firstName': e.target.value })}
                            />
                        </Grid>
                    </Grid>
                </Typography>
            </CardContent>
            {/* 性別 */}
            <CardContent>
                <Typography variant="h5">
                    性別
                </Typography>
                <Typography variant="h5">
                    <Grid item style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <StyleTextField
                            label="性別"
                            value={user.sex || ''}  //「 || ''」を入れないとラベルと重なる
                            onChange={e => setUser({ ...user, 'sex': e.target.value })}
                        />
                    </Grid>
                </Typography>
            </CardContent>
            {/* 生年月日 */}
            <CardContent>
                <Typography variant="h5">
                    生年月日
                </Typography>
                <Typography variant="h5">
                    <Grid item style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <StyleTextField
                            label="生年月日"
                            value={user.birthday || ''}  //「 || ''」を入れないとラベルと重なる
                            onChange={e => setUser({ ...user, 'birthday': e.target.value })}
                        />
                    </Grid>
                </Typography>
            </CardContent>
            {/* 住所 */}
            {/* <CardContent>
                <Typography variant="h5">
                    住所
                </Typography>
                <Typography variant="h5">
                    <Grid item style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <StyleTextField
                            label="住所"
                            value={user.address || ''}  //「 || ''」を入れないとラベルと重なる
                            onChange={e => setUser({ ...user, 'address': e.target.value })}
                        />
                    </Grid>
                </Typography>
            </CardContent> */}
            {/* 職業 */}
            <CardContent>
                <Typography variant="h5">
                    職業
                </Typography>
                <Typography variant="h5">
                    <Grid item style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <StyleTextField
                            label="職業"
                            value={user.job || ''}  //「 || ''」を入れないとラベルと重なる
                            onChange={e => setUser({ ...user, 'job': e.target.value })}
                        />
                    </Grid>
                </Typography>
            </CardContent>
            {/* 職務経験 */}
            <CardContent>
                <Typography variant="h5">
                    職務経験
                </Typography>
                <Typography variant="h5">
                    <Grid item style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <StyleTextField
                            label="職務経験"
                            value={user.experience || ''}  //「 || ''」を入れないとラベルと重なる
                            onChange={e => setUser({ ...user, 'experience': e.target.value })}
                        />
                    </Grid>
                </Typography>
            </CardContent>
            <CardActions disableSpacing style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                {/* カスタムボタンを使うとinputCheckで履歴のパスがうまくいかずエラーになる */}
                <Button
                    style={{
                        // ボタン
                        width: 'auto',
                        height: 'auto',

                        // テキスト
                        color: '#FFF',
                        borderRadius: 20,
                    }}
                    className="style-chenge-button"
                    variant="contained"
                    // component={LinkRouter}
                    // to={to}
                    onClick={inputCheck}
                >
                    変更
                </Button>
            </CardActions>
        </Card>
    );
}

export default BasicDetailsUserEdit
