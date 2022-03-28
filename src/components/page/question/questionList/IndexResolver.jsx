//
//  ファイル名:IndexResolver.jsx
//  作成者：板坂
//  作成日時:2/27
//
//  解決希望者一覧
//
import React, { useState, useEffect, } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { yellow } from '@mui/material/colors';
import { Link as LinkRouter } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import CardHeader from '@mui/material/CardHeader';
import { Grid } from '@material-ui/core'

// 張りぼての星
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
// Graphql インポート
import { listQuestions } from '../../../../graphql/queries';
import { onCreateAnswerUser } from '../../../../graphql/subscriptions';
import { listUserIds } from '../../../../graphql/queries';
import { onCreateUserId } from '../../../../graphql/subscriptions';
import { updateAnswerUser } from '../../../../graphql/mutations';
import { listAnswerUsers, getQuestions, getUserId } from '../../../../graphql/queries';

import { createNotice as createNoticeMutation } from '../../../../graphql/mutations';

import { API, Auth, graphqlOperation } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import axios from 'axios';

export default function IndexResolver(props) {
  const [user, setUser] = useState();
  //DBからとってきた質問
  // const [question, setQuestion] = useState(TestQuestions[0]);
  const [questions, setQuestions] = useState([]);

  const [questionId, setQuestionId] = useState([]);
  const [users, setResolver] = useState([]);
  const [checkBottomFlag, setCheckBottomFlag] = useState([]);

  const [checkPoint, setCheckPoint] = useState([]);

  const [selectId, setSelectId] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMoreVertClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const initialFormState = { noticeStatus: 1 }
  const [formData, setFormData] = useState(initialFormState);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  // 再描画のたびに実行
  useEffect(() => {
    fetchUserData();
    checkBotton();
  }, [])

  // ------購読------
  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onCreateAnswerUser)).subscribe({
      next: (eventData) => {
        const post = eventData.value.data.onCreateAnswerUser;
        const posts = [...users, post];
        setQuestions(posts);
      }
    });
    return () => subscription.unsubscribe();
  })

  const fetchUserData = async () => {
    const user1 = await Auth.currentAuthenticatedUser();
    let cognitoID = user1.attributes.sub;
    console.log(user1);
    const apiUserData = await API.graphql(graphqlOperation(getUserId, { id: cognitoID }));
    setUser(apiUserData.data.getUserId);
    // setUserPoint(apiData.data.getUserId.point);
    // setUserTrasferPoint(apiData.data.getUserId.transferPoint);
    console.log(apiUserData.data.getUserId);
    //console.log(apiUserData);//.data.getCognitoUserId.items
    checkMoney(apiUserData.data.getUserId);
  }

  // 表示
  //描画ごとに現在質問中かチェック
  async function checkBotton() {
    //URLから取得
    const questionId = props.match.params.QuestionId;
    console.log(questionId);

    const apiQuestionData = await API.graphql(graphqlOperation(getQuestions, { id: questionId }));
    console.log(apiQuestionData);
    setQuestions(apiQuestionData.data.getQuestions);
    setQuestionId(apiQuestionData.data.getQuestions.id);
    console.log(questionId);

    fetchListResolver(questionId, null);
  }

  // 表示
  async function fetchListResolver(id, nextToken) {
    console.log(id);
    const result = await API.graphql(graphqlOperation(listAnswerUsers, {
      filter: {
        "questionId": {
          "eq": id
        }
      },
      limit: 10,
      nextToken: nextToken,
    }));
    console.log("users",result.data.listAnswerUsers.items);
    setResolver(result.data.listAnswerUsers.items);
  }
  async function checkMoney(checkPoint1) {
    console.log('aaa');

    let point = checkPoint1.point;
    let transferPoint = checkPoint1.transferPoint;
    let sumPoint = point + transferPoint;


    console.log(sumPoint);

    if (sumPoint >= '200') {
      setCheckPoint(1);
    } else {
      setCheckPoint(0);
    }
  }
  //#36対応
  //ボタン押下後に、引数としてidを持ってくる
  const handleClick = async (id, url) => {
    console.log(id);
    console.log(url);
    formData.userId = id;
    formData.noticeTitle = "あなたは選ばれました";
    formData.linkDestinationUrl = url;

    await API.graphql({ query: createNoticeMutation, variables: { input: formData } });
  }
  // 入力チェック
  const deleteCheck = async (id) => {
    console.log(id);
    let result = window.confirm('質問を削除してもよろしいですか？');

    if (result) {   // OKボタン押下時
      const api = 'https://4og2qtmzoj.execute-api.ap-northeast-1.amazonaws.com/testQuestion';
      const data = { "id": id };
      await axios
        .post(api, data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(id)
      window.location.href = '/';

    } else { // キャンセルボタン押下時
      // 何も処理を行わない
    }
  }

  return (
    <>
      <Grid container justifyContent="center" style={{ marginBottom: '1%' }}>
        {/* 質問内容 */}
        <Grid item spasing={3} xs={10}>
          <Card sx={{ width: '100%' }}>
            <CardHeader
              // avatar={
              //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              //     R
              //   </Avatar>
              // }
              action={
                <IconButton
                  aria-label="more"
                  onClick={handleMoreVertClick}
                  aria-haspopup="true"
                  aria-controls="long-menu"
                >
                  <MoreVertIcon />
                </IconButton>
              }
              title={questions.title}
              subheader="September 14, 2016"
            />
            <CardContent>
              <Menu
                anchorEl={anchorEl}
                keepMounted onClose={handleClose}
                open={open}>
                <MenuItem
                  onClick={() => {
                    handleClose()
                  }}
                >
                  編集する
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose()
                    deleteCheck(questions.id)
                  }}
                >
                  削除する
                </MenuItem>
              </Menu>
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                詳細
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" variant="body2">
                {questions.content}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 解決者リスト */}
      <Grid container justifyContent="center">
        {
          users.map((user, cnt) => {
            return (
              <>
                <Grid item xs={10} md={5}>
                  <Card key={user.id} sx={{ width: '100%' }}>
                    <CardContent>
                      <Typography variant="h6">
                        {user.userHandleName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {'性別：' + user.userSex}
                        <br />
                        {'職業：' + user.userJob}
                        <br />
                        {'職務経験：' + user.userExperience + '年'}
                        <br />
                        {'解決時間：' + user.time + '分'}
                        <br />
                        {'相談費用：' + user.userUnitPrice + '円'}
                      </Typography>
                    </CardContent>

                    <CardActions disableSpacing>
                      {/* 会議時間と自身のidはDBから取ってくる */}
                      {checkPoint
                        ? <Button
                          sx={{ mr: 4 }}
                          variant='contained'
                          color="success"
                          component={LinkRouter}
                          to={`/skyway/${user.time}/${user.questionId}`}
                          target="_blank"
                          onClick={() => {
                            handleClick(user.userId, `/skyway/${user.time}/${user.questionId}`)
                          }}
                        >依頼する</Button>
                        : <Button sx={{ mr: 4 }} variant='contained' target="_blank"  >ポイント購入</Button>
                      }
                      {/* 張りぼて評価 */}
                      <StarIcon sx={{ color: yellow[600] }} />
                      <StarIcon sx={{ color: yellow[600] }} />
                      <StarIcon sx={{ color: yellow[600] }} />
                      <StarIcon sx={{ color: yellow[600] }} />
                      <StarOutlineIcon />
                    </CardActions>
                  </Card>
                </Grid>
                {(() => {
                  if ((users.length === cnt || users.length === 1) && ((users.length % 2) === 1)) {
                    return (
                      <Grid item xs={10} md={5}></Grid>
                    )
                  }
                })()}
              </>
            );
          })
        }
      </Grid>
    </>
  );
}
