//
//  ファイル名
//  作成者
//  作成日時
//
//  質問詳細
//
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { green, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import { Link as LinkRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

import { StyleTextField, StyleMultilineTextField } from '../../../ui/styleTextField';
//AWS
import { Auth } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify';
// graphqlインポート
import { createAnswerUser as createAnswerUserMutation } from '../../../../graphql/mutations';
import { getCognitoUserId, getUserId, getQuestions, listAnswerUsers } from '../../../../graphql/queries';

import { categories } from '../../../../database/categories_table';

function QuestionPage(props) {

    let datetime = new Date().toISOString();
    const [formData, setFormData] = useState({});
    const [question, setQuestion] = useState([]);
    const [user, setUser] = useState([]);
    const [time, setTime] = useState(10);
    const [job, setJob] = useState();
    const [cognitoUserID, setCognitoUserID] = useState();
    const [experience, setExperience] = useState(1);
    const meetingTimeArray = [10, 20, 30, 40, 50, 60];
    const [categoriesArray, setCategoriesArray] = useState(categories);
    const experienceArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "11~14", "15~20", "21~25", "26~30", "31~35", "36~40", "41~45", "46~50", "50~"];
    const [checkBottomFlag, setCheckBottomFlag] = useState([]);

    const inputChange = (e) => {
        const value = e.target.value;
        setTime(value);
    }
    const inputJobChange = (e) => {
        
        setJob(e.target.value);
    }
    const inputExperienceChange = (e) => {
        const value = e.target.value;
        setExperience(value);
    }
    const fetchQuestion = async () => {
        // propsからurlの値を取得
        const questionId = props.match.params.QuestionId;
        const apiQuestionData = await API.graphql(graphqlOperation(getQuestions, { id: questionId }));
        setQuestion(apiQuestionData.data.getQuestions);
    }

    const fetchUser = async () => {
        const user1 = await Auth.currentAuthenticatedUser();
        let cognitoID = user1.attributes.sub;
        console.log(cognitoID);

        const apiUserData = await API.graphql(graphqlOperation(getUserId, { id: cognitoID }));
        setUser(apiUserData);

        setCognitoUserID(cognitoID);
        // setUserPoint(apiData.data.getUserId.point);
        // setUserTrasferPoint(apiData.data.getUserId.transferPoint);
        console.log(apiUserData);//.data.getCognitoUserId.items
    }

    async function inputData() {
        //データ送信用にフォームデータを定義
        formData.userId = user.data.getUserId.id;
        formData.questionId = question.id;
        formData.userHandleName = user.data.getUserId.handleName;
        formData.questionTitle = question.title;
        formData.questionContent = question.content;
        formData.userLicenseFlag = '0';
        {
            user.data.getUserId.sex
                ? formData.userSex = '女'
                : formData.userSex = '男'
        }
        formData.userUnitPrice = '200';
        formData.time = time;
        
        formData.userExperience = experience;
        formData.ansStatus = '1';
        formData.createdAt = datetime;
        formData.updatedAt = datetime;
        console.log(formData);
        inputCheck();
    }
    //描画ごとに現在質問中かチェック
    async function checkButton(nextToken = null) {
        let user1 = await Auth.currentAuthenticatedUser();
        const cognitoID = user1.attributes.sub;
        //filterの参考：https://qiita.com/isamuJazz/items/22b34985d9ee17d890c6
        const result = await API.graphql(graphqlOperation(listAnswerUsers, {
            filter: {
                "and": [
                    {
                        "userId": {
                            "eq": cognitoID
                        }
                    },
                    {
                        "ansStatus": {
                            "eq": "1"
                        }
                    }
                ]
            },
            limit: 10,
            nextToken: nextToken,
        }));
        console.log(result);

        if (result.data.listAnswerUsers.items.length > 0) {
            // 質問中
            setCheckBottomFlag(2);
        } else {
            //質問していない
            setCheckBottomFlag(1);
        }
    }
    // 入力チェック
    async function inputCheck() {
        checkButton();
        if (checkBottomFlag == 2) {
            alert('他に解答しているため、候補できません。');
        } else if (formData.userExperience == "" || formData.userJob == "") {
            alert('全ての項目を入力してください');
        } else {
            console.log("test1");
            let result = window.confirm('解決者として立候補してよろしいですか？');
            // OKボタン押下時
            if (result) {
                const r = await API.graphql({ query: createAnswerUserMutation, variables: { input: formData } });
                const url = r.data.createAnswerUser.id;
                window.location.href = `/indexQuestion/${url}`;
                //window.location.href = '/';
                // キャンセルボタン押下時
            } else {
                // 何も処理を行わない
            }
        }
    }
    useEffect(() => {
        fetchQuestion();
        fetchUser();

    }, []);

    useEffect(() => {
        console.log(question);
    }, [question])

    return (
        <Grid container alignItems="center" justify="center" spacing={1} >
            <Grid item xs={10} sm={10} md={6} >
                <Card sx={{ my: 4 }} >
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" src={`https://mydreams769891ee61d8400295a4455b85879f9f123131-develop.s3.ap-northeast-1.amazonaws.com/public/${cognitoUserID}/ProfileImage/public.png`}>
                            </Avatar>
                        }
                        action={<IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>}
                    />

                    {/* 相談内容　詳細　見出し */}
                    <CardContent>
                        <Typography variant="subtitle1" color="text.primary">
                            {question.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {question.content}
                        </Typography>
                        <Typography mt={2} variant="body2" color="text.secondary">
                            {question.createdAt}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* 解決候補者一覧 */}
            <Grid item xs={5} sm={10} md={6} justifyContent="center" alignItems="center" >
                <FormControl style={{ width: '100%' }}>
                    <InputLabel id="time">解決想定時間</InputLabel>
                    <Select
                        labelId="time"
                        label="解決想定時間"
                        onChange={inputChange}
                        defaultValue={10}
                    >
                        {meetingTimeArray.map((meetingTime, index) => (
                            <MenuItem value={meetingTime} key={index}>{meetingTime} 分</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={5} sm={10} md={6} justifyContent="center" alignItems="center" >
                <FormControl style={{ width: '100%' }}>
                    <InputLabel id="experience" fullWidth >職務経験</InputLabel>
                    <Select
                        labelId="experience"
                        label="職務経験"
                        onChange={inputExperienceChange}
                        defaultValue={1}
                    >
                        {experienceArray.map((experience, index) => (
                            <MenuItem value={experience} key={index}>{experience} </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={10} sm={10} md={6} >
                <FormControl style={{ width: '100%' }}>
                    <InputLabel id="job" >職業</InputLabel>
                    <Select
                        labelId="job"
                        id="demo-simple-select"
                        label="カテゴリー"
                        title="category_id"
                        style={{ fontSize: '21px', widht: '100%' }}
                        onChange={e => setFormData({ ...formData, 'categoryId': e.target.value })}
                        value={formData.categoryId}
                    >
                        {categoriesArray.map((categoryArray, index) => (
                            <MenuItem style={{ fontSize: '18px' }} value={categoryArray.categoryId} key={index}>{categoryArray.category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={10} sm={10} md={6} justifyContent="center" alignItems="center" >
                <StyleTextField
                    label="コメント"
                    placeholder="相談者に一言コメントできます。"
                    onChange={e => setFormData({ ...formData, comment: e.target.value })}
                    value={formData.comment}
                />
            </Grid>
            <Grid item xs={4} sm={10} md={6} justify="center" alignItems="center" >
                <Button size='large' variant='contained' color="success" target="_blank" onClick={inputData} >解決する！</Button>
            </Grid>
        </Grid >
    )
}

export default QuestionPage