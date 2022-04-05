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

import {createNotice as createNoticeMutation } from '../../../../graphql/mutations';

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
  const initialFormState = { noticeStatus : 1 }
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

    const apiUserData = await API.graphql(graphqlOperation(getUserId, { id: cognitoID }));
    setUser(apiUserData.data.getUserId);
    // setUserPoint(apiData.data.getUserId.point);
    // setUserTrasferPoint(apiData.data.getUserId.transferPoint);
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
    console.log(result);
    setResolver(result.data.listAnswerUsers.items);
  }
  async function checkMoney(checkPoint1) {
    let point = checkPoint1.point;
    let transferPoint = checkPoint1.transferPoint;
    let sumPoint = point + transferPoint;

    if (sumPoint >= '200') {
      setCheckPoint(1);
    } else {
      setCheckPoint(0);
    }
  }
  //#36対応
  //ボタン押下後に、引数としてidを持ってくる
  const handleClick = async (id,time,url) => {
    formData.userId = id;
    formData.noticeTitle = "あなたは選ばれました";
    formData.linkDestinationUrl = url;

    await API.graphql({ query: createNoticeMutation, variables: { input: formData } });
    const api = 'https://f005ii5zjh.execute-api.ap-northeast-1.amazonaws.com/testExtension';
    const data = { 
      "id": id ,
      "solvedTime": time
    };
    await axios
        .post(api, data)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
        console.log(data)
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
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>

      <Box>
        {/* 質問内容 */}
        <Card sx={{ minWidth: 330, m: 3 }}>
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
              {/* {questions.data.listQuestions.items.content} */}詳細
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" variant="body2">
              {questions.content}
            </Typography>
          </CardContent>
        </Card>

        {/* 解決者リスト */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {
            users.map((user) => {
              return (
                <Card key={user.id} sx={{ m: 1, minWidth: 330, maxWidth: 500 }}>
                  <CardContent>
                    <Typography variant="h6">
                      {user.userHandleName}
                    </Typography>
                    {/* <Typography variant="body2">
                    {'　　　　　　　　　　　　　　　　　　' + user.firstName + '歳'}
                  </Typography> */}
                    {/* <Typography color="text.secondary">
                            {'保有資格：' + user.firstName}
                          </Typography> */}
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
                      ? <Button sx={{ mr: 4 }} variant='contained' color="success" component={LinkRouter} onClick={() => { handleClick(user.userId,user.time,`/skyway/${user.time}/${user.questionId}`); }} to={`/skyway/${user.time}/${user.questionId}`} target="_blank"  >依頼する</Button>
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
              );
            })
          }
        </Box>
      </Box>
    </Box>
  );
}
