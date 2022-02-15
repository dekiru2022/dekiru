import React, { useState, useEffect, useMemo } from 'react';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import { StyleButton } from '../../../ui/styleButton';
import { API } from 'aws-amplify';
// graphqlインポート
import { listUserIds } from '../../../../graphql/queries';

// テスト用データ
import { user as TestUser } from '../../../../database/current_user_data';



export default function BasicDetail() {
    //星の設定部分
    const [userValue, setValue] = React.useState(2.5);
    const id = 1;
    const [users, setUsers] = useState([]);
    //ユーザ情報を取得しステートuserにセットする
    const getUserData = (id) => {

    }
    
    useEffect(() => {
        getUserData(id);
        fetchUsers();
    }, [])

    async function fetchUsers() {
        const apiData = await API.graphql({ query: listUserIds });
        setUsers(apiData.data.listQuestions.items);
      }


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}  >
                <Typography variant="h4" >
                    test
                </Typography>
            </Grid>
            <Grid item xs={6} >
                <Card sx={{ m: 1, width: 'rem', height: '10rem', border: '0.1rem solid #26418D', position: 'relative' }}>

                    <CardHeader

                        title="相談ポイント"
                        titleTypographyProps={{ variant: 'h4' }}
                    />
                    <CardContent>
                        <Typography variant="h5" >
                            test
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                        <StyleButton title="ポイント購入" to="/showQuestion" />
                    </CardActions>

                </Card>

                <Card sx={{ m: 1, width: 'rem', height: '10rem', border: '0.1rem solid #26418D', position: 'relative' }}>

                    <CardHeader

                        title="報酬ポイント"
                        titleTypographyProps={{ variant: 'h4' }}
                        style={{ marginTop: '0.5%' }}
                    />

                    <CardContent>
                        <Typography variant="h5">
                            test
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                        <StyleButton title="出金" to="/showQuestion" />
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card sx={{ m: 1, width: 'rem', height: '20.8rem', border: '0.1rem solid #26418D', position: 'relative' }}>
                    <CardHeader
                        title="ユーザー情報"
                        titleTypographyProps={{ variant: 'h4' }}
                        style={{ marginTop: '0.5%' }}
                    />
                    <CardContent>
                        <Typography variant="h5">
                            test
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing style={{ position: 'absolute', bottom: '180px', right: '10px' }}>
                        <StyleButton title="変更" to="/BasicDetailsEdit" />
                    </CardActions>
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

        </Grid>
    );
}