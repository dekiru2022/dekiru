//
// BasicDetail.jsx
// 板坂(mock:吉田)
// 2022/2/24
// ユーザ画面
//https://medium.com/@dantasfiles/three-methods-to-get-user-information-in-aws-amplify-authentication-e4e39e658c33
//

import React, { useState, useEffect, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from "@material-ui/core/IconButton";
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
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { Link as LinkRouter } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const imageMimeType = /image\/(png|jpg|jpeg)/i;

export default function BasicDetail() {

    const [user, setUser] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);
    const [cognitoUserID, setCognitoUserID] = useState();

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
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
        getUserDataAws();

    }, []);

    // useEffect(() => {

    //     let fileReader, isCancel = false;
    //     if (file) {
    //         fileReader = new FileReader();
    //         fileReader.onload = (e) => {
    //             const { result } = e.target;
    //             if (result && !isCancel) {
    //                 setFileDataURL(result)
    //             }
    //         }
    //         fileReader.readAsDataURL(file);
    //     }
    //     return () => {
    //         isCancel = true;
    //         if (fileReader && fileReader.readyState === 1) {
    //             fileReader.abort();
    //         }
    //     }

    // }, [file]);
    const getPoint = () => {
        let point = user.point;
        // let  display = point.toLocaleString()
        return point
    }

    const getSex = () => {
        // console.log(user)
        console.log(user.sex);
        if (user.sex == 0) {
            return '男性'
        } else if (user.sex == 1) {
            return '女性'
        } else {
            return 'その他'
        }
    }
    const getJob = () => {
        console.log(user.categoryId);
        const Cid = parseInt(user.categoryId);
        let returnJob;

        switch (Cid) {
            case 1:
                returnJob = '農業,林業';
                break;
            case 2:
                returnJob = '漁業';
                break;
            case 3:
                returnJob ='鉱業,採石業,砂利採取業';
                break;
            case 4:
                returnJob = '建設業';
                break;
            case 5:
                returnJob = '製造業';
                break;
            case 6:
                returnJob = '電気・ガス・熱供給・水道業';
                break;
            case 7:
                returnJob = '情報通信業';
                break;
            case 8:
                returnJob = '運輸業,郵便業';
                break;
            case 9:
                returnJob = '卸売業・小売業';
                break;
            case 10:
                returnJob = '金融業,保険業';
                break;
            case 11:
                returnJob = '不動産業,物品賃貸業';
                break;
            case 12:
                returnJob = '学術研究,専門・技術サービス業';
                break;
            case 13:
                returnJob ='宿泊業,飲食店';
                break;
            case 14:
                returnJob = '生活関連サービス業,娯楽業';
                break;
            case 15:
                returnJob = '教育学習支援業';
                break;
            case 16:
                returnJob = '医療,福祉';
                break;
            case 17:
                returnJob = '複合サービス事業';
                break;
            case 18:
                returnJob = 'サービス業';
                break;
            case 19:
                returnJob = 'その他';
                break;
            default:
                returnJob = '不明';
                break;
        }
        return returnJob;
    }

    async function onClick(e) {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setFile(file);
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}  >
                <IconButton onClick={() => handleOpen()}>
                    <Avatar
                        aria-label="recipe"
                        src={`https://mydreams769891ee61d8400295a4455b85879f9f123131-develop.s3.ap-northeast-1.amazonaws.com/public/${user.id}/ProfileImage/public.png`}
                        sx={{ width: 100, height: 100 }}
                    >
                    </Avatar>
                </IconButton>

            </Grid>
            {/* ユーザ名 */}
            <Grid item xs={8}  >
                <Typography className="pc-area" variant="h4" >{user.handleName}</Typography>
                <Typography className="smartphone-area" variant="h5" >{user.handleName}</Typography>
            </Grid>

            <Grid item xs={12} md={6} >
                <Card sx={{ m: 1, width: '100%', height: '10rem', border: '0.1rem solid #26418D', position: 'relative' }}>
                    {/* 相談ポイント */}
                    <p className="pc-area" ><CardHeader
                        title="相談ポイント"
                        titleTypographyProps={{ variant: 'h4' }}
                    /></p>
                    <p className="smartphone-area" ><CardHeader
                        title="相談ポイント"
                        titleTypographyProps={{ variant: 'h5' }}
                    /></p>
                    <CardContent>
                        <Typography className="pc-area" variant="h5" >{getPoint()}</Typography>
                        <Typography className="smartphone-area" variant="h6" >{getPoint()}</Typography>
                    </CardContent>
                    {/* ポイント購入ボタン */}
                    <CardActions disableSpacing style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                        <Button
                            variant="contained"
                            component={LinkRouter}
                            to={`/PointPurchase`}
                            sx={{ fontSize: 20 }}
                        >ポイント購入</Button>
                    </CardActions>
                </Card>

                <Card sx={{ m: 1, width: '100%', height: '10rem', border: '0.1rem solid #26418D', position: 'relative' }}>
                    {/* 報酬ポイント */}
                    <p className="pc-area" ><CardHeader
                        title="報酬ポイント"
                        titleTypographyProps={{ variant: 'h4' }}
                        style={{ marginTop: '0.5%' }}
                    /></p>
                    <p className="smartphone-area" ><CardHeader
                        title="報酬ポイント"
                        titleTypographyProps={{ variant: 'h5' }}
                        style={{ marginTop: '0.5%' }}
                    /></p>
                    <CardContent>
                        <Typography className="pc-area" variant="h5">{user.trasferPoint}</Typography>
                        <Typography className="smartphone-area" variant="h6">{user.trasferPoint}</Typography>
                    </CardContent>
                    {/* 出金ボタン */}
                    <CardActions disableSpacing style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                        <Button
                            variant="contained"
                            component={LinkRouter}
                            to={`/PointPurchase`}
                            sx={{ fontSize: 20 }}
                        >出金</Button>
                    </CardActions>
                </Card>
            </Grid>

            {/* ユーザ情報 */}
            <Grid item xs={12} md={6}>
                <Card sx={{ m: 1, width: '100%', height: '20.8rem', border: '0.1rem solid #26418D', position: 'relative' }}>
                    <p className="pc-area" ><CardHeader
                        title="ユーザー情報"
                        titleTypographyProps={{ variant: 'h4' }}
                        style={{ marginTop: '0.5%' }}
                    /></p>
                    <p className="smartphone-area" ><CardHeader
                        title="ユーザー情報"
                        titleTypographyProps={{ variant: 'h5' }}
                        style={{ marginTop: '0.5%' }}
                    /></p>
                    {/* メールアドレス */}
                    <CardContent>
                        <Typography className="pc-area" variant="h5"><p>メール： {user.mail}</p></Typography>
                        <Typography className="smartphone-area" variant="h6"><p>メール： {user.mail}</p></Typography>
                    </CardContent>
                    {/* 変更ボタン */}
                    <CardActions disableSpacing style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                        <Button
                            variant="contained"
                            component={LinkRouter}
                            to={`/BasicDetailsEdit`}
                            sx={{ fontSize: 20 }}
                        >変更</Button>
                    </CardActions>

                    {/* 登録資格  実装予定 */}
                    <CardContent>
                        <Typography className="pc-area" variant="h5">資格情報：</Typography>
                        <Typography className="smartphone-area" variant="h6">資格情報：</Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* ユーザ詳細情報 */}
            <Grid item xs={12}>
                <Card
                    sx={{ m: 1, width: '100%', height: 'auto', border: '0.1rem solid #26418D', position: 'relative' }}
                >
                    <p className="pc-area"><CardHeader
                        title="ユーザー詳細情報"
                        titleTypographyProps={{ variant: 'h4' }}
                        style={{ marginTop: '0.5%' }}
                    /></p>
                    <p className="smartphone-area"><CardHeader
                        title="ユーザー詳細情報"
                        titleTypographyProps={{ variant: 'h5' }}
                        style={{ marginTop: '0.5%' }}
                    /></p>
                    {/* 名前 */}
                    <CardContent>
                        <Typography className="pc-area" variant="h5">　　名前： {user.lastName} {user.firstName}</Typography>
                        <Typography className="smartphone-area" variant="h6">　　名前： {user.lastName} {user.firstName}</Typography>
                    </CardContent>
                    {/* 性別 */}
                    <CardContent>
                        <Typography className="pc-area" variant="h5">　　性別： {getSex()}</Typography>
                        <Typography className="smartphone-area" variant="h6">　　性別： {getSex()}</Typography>
                    </CardContent>
                    {/* 生年月日 */}
                    <CardContent>
                        <Typography className="pc-area" variant="h5">生年月日： {user.birthday}</Typography>
                        <Typography className="smartphone-area" variant="h6">生年月日： {user.birthday}</Typography>
                    </CardContent>
                    {/* 住所 */}
                    <CardContent>
                        <Typography className="pc-area" variant="h5">　　住所： {user.address}</Typography>
                        <Typography className="smartphone-area" variant="h6">　　住所： {user.address}</Typography>
                    </CardContent>
                    {/* 職業 */}
                    <CardContent>
                        <Typography className="pc-area" variant="h5">　　職業： {getJob()}</Typography>
                        <Typography className="smartphone-area" variant="h6">　　職業： {getJob()}</Typography>
                    </CardContent>
                    {/* 職務経験 */}
                    <CardContent>
                        <Typography className="pc-area" variant="h5">職務経験： {user.experience}</Typography>
                        <Typography className="smartphone-area" variant="h6">職務経験： {user.experience}</Typography>
                    </CardContent>

                    {/* 変更ボタン */}
                    <CardActions disableSpacing style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                        <Button
                            variant="contained"
                            component={LinkRouter}
                            to={`/BasicDetailsUserEdit`}
                            sx={{ fontSize: 20 }}
                        >変更</Button>
                    </CardActions>
                </Card>
            </Grid>

        </Grid>
    );
}