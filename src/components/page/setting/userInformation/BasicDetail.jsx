//
// BasicDetail.jsx
// 板坂(mock:吉田)
// 2022/2/24
// ユーザ画面
//https://medium.com/@dantasfiles/three-methods-to-get-user-information-in-aws-amplify-authentication-e4e39e658c33
//
import React, { useState, useEffect, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import { StyleButton } from '../../../ui/styleButton';
import { API, graphqlOperation } from 'aws-amplify';
// graphqlインポート
import { getCognitoUserId, listUserIds, getUserId } from '../../../../graphql/queries';
import { Auth } from 'aws-amplify'
// テスト用データ
import { user as TestUser } from '../../../../database/current_user_data';



export default function BasicDetail() {
    //星の設定部分
    const [userValue, setValue] = React.useState(2.5);
    const [userName, setUserName] = useState([]);
    const [users, setUsers] = useState([]);
    const [userMail, setUserMail] = useState([]);
    const [userPoint, setUserPoint] = useState([]);
    const [userTrasferPoint, setUserTrasferPoint] = useState([]);
    //ユーザ情報を取得しステートuserにセットする
    const getUserData = () => {

    }
    const getUserDateAws = async () => {
        let user1 = await Auth.currentAuthenticatedUser();
        let userName = user1.username;
        let cognitoID = user1.attributes.sub;
        let mail = user1.attributes.email;
        setUserName(userName);
        setUserMail(mail);
        fetchUsers(cognitoID);
    }

    useEffect(() => {
        getUserDateAws();
        getUserData();
    }, [])

    const fetchUsers = async (cognitoID) => {
        console.log(cognitoID);
        const apiData = await API.graphql(graphqlOperation(getUserId, { id: cognitoID }));
        setUserPoint(apiData.data.getUserId.point);
        setUserTrasferPoint(apiData.data.getUserId.transferPoint);
        console.log(apiData);//.data.getCognitoUserId.items
    }
    return (
        <Grid container spacing={2}>
            {/* ユーザ名 */}
            <Grid item xs={12}  >
                <Typography variant="h4" >
                    {userName}
                </Typography>
            </Grid>

            <Grid item xs={6} >
                <Card sx={{ m: 1, width: 'rem', height: '10rem', border: '0.1rem solid #26418D', position: 'relative' }}>
                    {/* 相談ポイント */}
                    <CardHeader
                        title="相談ポイント"
                        titleTypographyProps={{ variant: 'h4' }}
                    />
                    <CardContent>
                        <Typography variant="h5" >
                            {userPoint}
                        </Typography>
                    </CardContent>
                    {/* ポイント購入ボタン */}
                    <CardActions disableSpacing style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                        <StyleButton title="ポイント購入" to="/PointPurchase/" />
                    </CardActions>
                </Card>

                <Card sx={{ m: 1, width: 'rem', height: '10rem', border: '0.1rem solid #26418D', position: 'relative' }}>
                    {/* 報酬ポイント */}
                    <CardHeader
                        title="報酬ポイント"
                        titleTypographyProps={{ variant: 'h4' }}
                        style={{ marginTop: '0.5%' }}
                    />
                    <CardContent>
                        <Typography variant="h5">
                            {userTrasferPoint}
                        </Typography>
                    </CardContent>
                    {/* 出金ボタン */}
                    <CardActions disableSpacing style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                        <StyleButton title="出金" to="/showQuestion" />
                    </CardActions>
                </Card>
            </Grid>

            {/* ユーザ情報 */}
            <Grid item xs={6}>
                <Card sx={{ m: 1, width: 'rem', height: '20.8rem', border: '0.1rem solid #26418D', position: 'relative' }}>
                    <CardHeader
                        title="ユーザー情報"
                        titleTypographyProps={{ variant: 'h4' }}
                        style={{ marginTop: '0.5%' }}
                    />
                    {/* メールアドレス */}
                    <CardContent>
                        <Typography variant="h5">
                            <p>メール： {userMail}</p>
                        </Typography>
                    </CardContent>
                    {/* 変更ボタン */}
                    <CardActions disableSpacing style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <StyleButton title="変更" to="/BasicDetailsEdit" />
                    </CardActions>

                    {/* 登録資格  実装予定 */}
                    <CardContent>
                        <Typography variant="h5">
                            test
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                        <StyleButton title="資格登録" to="/showQuestion" />
                    </CardActions>
                </Card>
            </Grid>

            {/* ユーザ詳細情報 */}
            <Grid item xs={12}>
                <Card sx={{ m: 1, width: 'rem', height: 'auto', border: '0.1rem solid #26418D', position: 'relative' }}>
                    <CardHeader
                        title="ユーザー詳細情報"
                        titleTypographyProps={{ variant: 'h4' }}
                        style={{ marginTop: '0.5%' }}
                    />
                    {/* 名前 */}
                    <CardContent>
                        <Typography variant="h5">　　名前： {userMail}</Typography>
                    </CardContent>
                    {/* 性別 */}
                    <CardContent>
                        <Typography variant="h5">　　性別： {userMail}</Typography>
                    </CardContent>
                    {/* 生年月日 */}
                    <CardContent>
                        <Typography variant="h5">生年月日： {userMail}</Typography>
                    </CardContent>
                    {/* 住所 */}
                    <CardContent>
                        <Typography variant="h5">　　住所： {userMail}</Typography>
                    </CardContent>
                    {/* 職業 */}
                    <CardContent>
                        <Typography variant="h5">　　職業： {userMail}</Typography>
                    </CardContent>
                    {/* 職務経験 */}
                    <CardContent>
                        <Typography variant="h5">職務経験： {userMail}</Typography>
                    </CardContent>

                    {/* 変更ボタン */}
                    <CardActions disableSpacing style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <StyleButton title="変更" to="/BasicDetailsUserEdit" />
                    </CardActions>
                </Card>
            </Grid>

        </Grid>
    );
}