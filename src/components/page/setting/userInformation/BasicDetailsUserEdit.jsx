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
import { InputLabel, FormControl, MenuItem, Select, NativeSelect } from '@material-ui/core';
import '../../../../styles/Button.css'

import { categories } from '../../../../database/categories_table';


function BasicDetailsUserEdit() {

    const [user, setUser] = useState([]);
    const [categoriesArray, setCategoriesArray] = useState(categories);

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
        const a = await API.graphql(graphqlOperation(UpdateUserIdMutation, { input: user }))
        console.log(a);
        localStorage.setItem('categoryId', user.categoryId);
    }

    // 入力チェック
    const inputCheck = () => {
        console.log(user)
        const result = window.confirm('変更してもよろしいですか？');
        // OKボタン押下時
        if (result) {
            updateUser()
            window.location.href = '/setting';
        } else {
            // キャンセルボタン押下時
            // 何も処理を行わない
        }
    }

    return (
        <Card sx={{ m: 5, width: 'auto', height: 'auto', border: '0.1rem solid #26418D', position: 'relative', paddingBottom: '4rem' }}>
            {/* タイトル */}
            <p className="pc-area" ><CardHeader
                title="ユーザー詳細情報"
                titleTypographyProps={{ variant: 'h4' }}
                style={{ marginTop: '0.5%' }}
            /></p>
            <p className="smartphone-area" ><CardHeader
                title="ユーザー詳細情報"
                titleTypographyProps={{ variant: 'h5' }}
                style={{ marginTop: '0.5%' }}
            /></p>

            {/* 名前 */}
            <CardContent>
                <Typography className="pc-area" variant="h5" style={{ marginLeft: '5%' }}>名前</Typography>
                <Typography className="smartphone-area" variant="h6" style={{ marginLeft: '5%' }}>名前</Typography>
                <Grid container style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
                    {/* 姓 */}
                    <Grid item className="pc-area" xs={12} md={5.9} mr={'0.83%'} >
                        <StyleTextField
                            className="pc-area"
                            label="姓"
                            value={user.lastName || ''}  //「 || ''」を入れないとラベルと重なる
                            onChange={e => setUser({ ...user, 'lastName': e.target.value })}
                        />
                    </Grid>
                    <Grid item className="smartphone-area" xs={12} md={5.9} mr={'0.83%'} >
                        <StyleTextField
                            className="smartphone-area"
                            label="姓"
                            value={user.lastName || ''}  //「 || ''」を入れないとラベルと重なる
                            onChange={e => setUser({ ...user, 'lastName': e.target.value })}
                        />
                    </Grid>

                    {/* 名 */}
                    <Grid item className="pc-area" xs={12} md={5.9} ml={'0.83%'} >
                        <StyleTextField
                            className="pc-area"
                            label="名"
                            value={user.firstName || ''} //「 || ''」を入れないとラベルと重なる
                            onChange={e => setUser({ ...user, 'firstName': e.target.value })}
                        />
                    </Grid>
                    <Grid item className="smartphone-area" xs={12} md={5.9} ml={'0.83%'} >
                        <StyleTextField
                            className="smartphone-area"
                            label="名"
                            value={user.firstName || ''} //「 || ''」を入れないとラベルと重なる
                            onChange={e => setUser({ ...user, 'firstName': e.target.value })}
                        />
                    </Grid>
                </Grid>
            </CardContent>

            {/* 性別 */}
            <CardContent>
                <Typography className="pc-area" variant="h5" style={{ marginLeft: '5%' }}>性別</Typography>
                <Typography className="smartphone-area" variant="h6" style={{ marginLeft: '5%' }}>性別</Typography>
                <Grid item style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <FormControl fullWidth style={{ height: '60px' }}>
                        <InputLabel >性別</InputLabel>
                        <NativeSelect
                            inputProps={{
                                style: {
                                    fontSize: '20px',
                                    height: '40px',
                                    borderBottom: 'none',
                                    border: '1px solid silver',
                                },
                                ' & .MuiInputBase-root': {
                                    fontSize: '0rem'
                                }
                            }}
                            defaultValue={user.sex}
                            onChange={e => setUser({ ...user, 'sex': parseInt(e.target.value) })}
                        >
                            <option value={0}>男性</option>
                            <option value={1}>女性</option>
                            <option value={2}>その他</option>
                        </NativeSelect>
                    </FormControl>
                </Grid>
            </CardContent>

            {/* 生年月日 */}
            <CardContent>
                <Typography className="pc-area" variant="h5" style={{ marginLeft: '5%' }}>生年月日</Typography>
                <Typography className="smartphone-area" variant="h6" style={{ marginLeft: '5%' }}>生年月日</Typography>
                <Grid item className="pc-area" style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <StyleTextField
                        className="pc-area"
                        label="生年月日"
                        value={user.birthday || ''}  //「 || ''」を入れないとラベルと重なる
                        onChange={e => setUser({ ...user, 'birthday': e.target.value })}
                    />
                </Grid>
                <Grid item className="smartphone-area" style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <StyleTextField
                        className="smartphone-area"
                        label="生年月日"
                        value={user.birthday || ''}  //「 || ''」を入れないとラベルと重なる
                        onChange={e => setUser({ ...user, 'birthday': e.target.value })}
                    />
                </Grid>
            </CardContent>
            {/* 住所 */}
            <CardContent>
                <Typography className="pc-area" variant="h5" style={{ marginLeft: '5%' }}>住所</Typography>
                <Typography className="smartphone-area" variant="h6" style={{ marginLeft: '5%' }}>住所</Typography>
                <Grid item className="pc-area" style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <StyleTextField
                        className="pc-area"
                        label="住所"
                        value={user.address || ''}  //「 || ''」を入れないとラベルと重なる
                        onChange={e => setUser({ ...user, 'address': e.target.value })}
                    />
                </Grid>
                <Grid item className="smartphone-area" style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <StyleTextField
                        className="smartphone-area"
                        label="住所"
                        value={user.address || ''}  //「 || ''」を入れないとラベルと重なる
                        onChange={e => setUser({ ...user, 'address': e.target.value })}
                    />
                </Grid>
            </CardContent>
            {/* 職業 */}
            <CardContent>
                <Typography className="pc-area" variant="h5" style={{ marginLeft: '5%' }}>職業</Typography>
                <Typography className="smartphone-area" variant="h6" style={{ marginLeft: '5%' }}>職業</Typography>
                <Grid item className="pc-area" style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="カテゴリー"
                        title="category_id"
                        style={{ fontSize: '21px' }}
                        onChange={e => setUser({ ...user, 'categoryId': e.target.value })}
                        value={user.categoryId}
                    >
                        {categoriesArray.map((categoryArray, index) => (
                            <MenuItem style={{ fontSize: '18px' }} value={categoryArray.categoryId} key={index}>{categoryArray.category}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item className="smartphone-area" style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="カテゴリー"
                        title="category_id"
                        style={{ fontSize: '21px' }}
                        onChange={e => setUser({ ...user, 'categoryId': e.target.value })}
                        value={user.categoryId}
                    >
                        {categoriesArray.map((categoryArray, index) => (
                            <MenuItem style={{ fontSize: '18px' }} value={categoryArray.categoryId} key={index}>{categoryArray.category}</MenuItem>
                        ))}
                    </Select>
                </Grid>
            </CardContent>
            {/* 職務経験 */}
            <CardContent>
                <Typography className="pc-area" variant="h5" style={{ marginLeft: '5%' }}>職務経験</Typography>
                <Typography className="smartphone-area" variant="h6" style={{ marginLeft: '5%' }}>職務経験</Typography>
                <Grid item className="pc-area" style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <StyleTextField
                        className="pc-area"
                        label="職務経験"
                        value={user.experience || ''}  //「 || ''」を入れないとラベルと重なる
                        onChange={e => setUser({ ...user, 'experience': e.target.value })}
                    />
                </Grid>
                <Grid item className="smartphone-area" style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <StyleTextField
                        className="smartphone-area"
                        label="職務経験"
                        value={user.experience || ''}  //「 || ''」を入れないとラベルと重なる
                        onChange={e => setUser({ ...user, 'experience': e.target.value })}
                    />
                </Grid>
            </CardContent>

            {/* 変更ボタン */}
            <CardActions disableSpacing style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                {/* カスタムボタンを使うとinputCheckで履歴のパスがうまくいかずエラーになる */}
                <Button
                    style={{
                        // ボタン
                        width: 'auto',
                        height: 'auto',

                        // テキスト
                        color: '#FFF',
                        fontSize: '1.5rem',
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
