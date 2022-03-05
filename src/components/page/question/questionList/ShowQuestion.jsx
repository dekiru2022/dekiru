//
//  ファイル名
//  作成者
//  作成日時
//
//  質問詳細
//
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
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

import { StyleTextField, StyleMultilineTextField } from '../../../ui/styleTextField';
//AWS
import { Auth } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify';
// graphqlインポート
import { createAnswerUser as createAnswerUserMutation } from '../../../../graphql/mutations';
import { getCognitoUserId, getUserId, getQuestions ,listAnswerUsers} from '../../../../graphql/queries';

function QuestionPage(props) {

    let datetime = new Date().toISOString();
    const [formData, setFormData] = useState([]);
    const [question, setQuestion] = useState([]);
    const [user, setUser] = useState([]);
    const [time, setTime] = useState(10);
    const [job, setJob] = useState();
    const [experience, setExperience] = useState(0);
    const meetingTimeArray = [0, 10, 20, 30, 40, 50, 60];
    const jobArray = ["ケアーマネージャー", "介護士", "元介護士","介護福祉"];
    const experienceArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, "15~20", "21~25", "26~30", "31~35", "36~40", "41~45", "46~50","50~"];
    const [title, setTitle] = useState([]);
    const [content, setContent] = useState([]);
    const [createdAt, setCreatedAt] = useState([]);
    const [checkBottomFlag, setCheckBottomFlag] = useState([]);

    const inputChange = (e) => {
        const value = e.target.value;
        setTime(value);
    }
    const inputJobChange = (e) => {
        const value = e.target.value;
        setJob(value);
    }
    const inputExperienceChange = (e) => {
        const value = e.target.value;
        setExperience(value);
    }
    const fetchQuestion = async () => {
        // propsからurlの値を取得
        const questionId = props.match.params.QuestionId;
        console.log(questionId);

        const apiQuestionData = await API.graphql(graphqlOperation(getQuestions, { id: questionId }));
        setQuestion(apiQuestionData);
        setTitle(apiQuestionData.data.getQuestions.title);
        setContent(apiQuestionData.data.getQuestions.content);
        setCreatedAt(apiQuestionData.data.getQuestions.createdAt);
        console.log(apiQuestionData);
    }

    const fetchUser = async () => {
        const user1 = await Auth.currentAuthenticatedUser();
        let cognitoID = user1.attributes.sub;
        console.log(cognitoID);
        const apiUserData = await API.graphql(graphqlOperation(getUserId, { id: cognitoID }));
        setUser(apiUserData);
        // setUserPoint(apiData.data.getUserId.point);
        // setUserTrasferPoint(apiData.data.getUserId.transferPoint);
        console.log(apiUserData);//.data.getCognitoUserId.items
    }

    async function inputData() {
        //データ送信用にフォームデータを定義
        formData.userId = user.data.getUserId.id;
        formData.questionId = question.data.getQuestions.id;
        formData.userHandleName = user.data.getUserId.handleName;
        formData.userLicenseFlag = '0';
        {
        user.data.getUserId.sex
            ? formData.userSex = '女'
            : formData.userSex = '男'
        }
        formData.userUnitPrice = '200';
        formData.time = time;
        formData.userJob = job;
        formData.userExperience = experience;
        formData.ansStatus = '1';
        formData.createdAt = datetime;
        formData.updatedAt = datetime;
        console.log(formData);
        inputCheck();
    }
    //描画ごとに現在質問中かチェック
    async function checkBotton(nextToken = null) {
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
        if (checkBottomFlag == 2) {
            alert('他に解答しているため、候補できません。');
        } else if (formData.userExperience == "" || formData.userJob == "") {
            alert('全ての項目を入力してください');
        } else {
            console.log("test1");
            let result = window.confirm('解決者として立候補してよろしいですか？');
            // OKボタン押下時
            if (result) {
                await API.graphql({ query: createAnswerUserMutation, variables: { input: formData } });
                window.location.href = '/';
                // キャンセルボタン押下時
            } else {
                // 何も処理を行わない
            }
        }
    }
    useEffect(() => {
        fetchQuestion();
        fetchUser();
        checkBotton();
    }, [])

    return (
        <Grid container>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Box>
                    <Card sx={{ my: 4, minWidth: 300, maxWidth: 600 }}>
                        {/* <CardHeader
                            avatar={
                                question.userId == 1
                                    ?
                                    <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                                        {question.userId}
                                    </Avatar>
                                    :
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        {question.userId}
                                    </Avatar>
                            }
                            action={<IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>}
                            // title={user.name + ' さん'} 歳
                            // subheader={user.ages + '歳'}
                        /> */}

                        <CardContent>
                            <Typography variant="subtitle1" color="text.primary">
                                {title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {content}
                            </Typography>
                            <Typography mt={2} variant="body2" color="text.secondary">
                                {createdAt}
                            </Typography>
                        </CardContent>

                        {/* <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </CardActions> */}
                    </Card>

                    <Box sx={{ display: 'flex', alignItems: 'end' }}>
                        <Box>
                            <InputLabel id="time">解決想定時間</InputLabel>
                            <Select
                                labelId="time"
                                id="demo-simple-select"
                                label="解決想定時間"
                                onChange={inputChange}
                                name="category_id"
                                defaultValue={10}
                            >
                                {meetingTimeArray.map((meetingTime, index) => (
                                    <MenuItem value={meetingTime} key={index}>{meetingTime} 分</MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Box>
                            <InputLabel id="time">職業</InputLabel>
                            <Select
                                labelId="time"
                                id="demo-simple-select"
                                label="職業"
                                onChange={inputJobChange}
                                defaultValue={10}
                            >
                                {jobArray.map((job, index) => (
                                    <MenuItem value={job} key={index}>{job} </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Box>
                            <InputLabel id="experience">職務経験</InputLabel>
                            <Select
                                labelId="experience"
                                id="demo-simple-select"
                                label="職務経験"
                                onChange={inputExperienceChange}
                                defaultValue={1}
                            >
                                {experienceArray.map((experience, index) => (
                                    <MenuItem value={experience} key={index}>{experience} </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        {/* コメント入力 */}
                        <Grid item style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <StyleTextField
                                label="コメント"
                                placeholder="相談者に一言コメントできます。"
                                onChange={e => setFormData({ ...formData, 'comment': e.target.value })}
                                value={formData.comment}
                            />
                        </Grid>
                        {time
                            ? <Button size='large' variant='contained' color="success" component={LinkRouter} to={`/skyway/${time}/${user.id}`} target="_blank" >解決する！</Button>
                            : <Button size='large' variant='contained' color="success" target="_blank" onClick={inputData} >解決する！</Button>
                        }
                    </Box>
                </Box>
            </Box>
        </Grid>

    )
}

export default QuestionPage