//
//  ファイル名:IndexResolver.jsx
//  作成者：板坂
//  作成日時:2/27
//
//  解決希望者一覧
//
import React, { useState, useEffect, } from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import axios from 'axios';
// mui インポート
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { yellow } from '@mui/material/colors';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import CardHeader from '@mui/material/CardHeader';
// 評価の星 インポート
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
// Graphql インポート
import { onCreateAnswerUser } from '../../../../graphql/subscriptions';
import { listAnswerUsers, getQuestions, getUserId } from '../../../../graphql/queries';
import { createNotice as createNoticeMutation } from '../../../../graphql/mutations';

/** 回答希望者一覧画面 */
export default function IndexResolver(props) {
  const [questions, setQuestions] = useState([]);
  const [users, setResolver] = useState([]);
  const [checkPoint, setCheckPoint] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  //この二つがないとエラーになる
  const initialFormState = {noticeStatus : 1};
  const [formData,set] = useState(initialFormState);

  const open = Boolean(anchorEl);

  /** カード内のメニューウインドウ開く */
  const handleMoreVertClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /** カード内のメニューウインドウ閉じる */
  const handleClose = () => {
    setAnchorEl(null);
  };

  // 再描画のたびに実行
  useEffect(() => {
    fetchUserData();
    fetchQuestion();
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

  /** userIDの取得 */
  const fetchUserData = async () => {
    // cognitoのユーザIDを取得
    const user = await Auth.currentAuthenticatedUser();
    let cognitoID = user.attributes.sub;

    // cognitoのユーザIDからユーザIDテーブルの値を取得
    const apiUserData = await API.graphql(graphqlOperation(getUserId, { id: cognitoID }));
    checkMoney(apiUserData.data.getUserId);
  }

  /** 所持ポイントのチェック
   * @param user UserIdテーブルのレコード */
  async function checkMoney(user) {
    let point = user.point;
    let transferPoint = user.transferPoint;
    let sumPoint = point + transferPoint;

    if (sumPoint >= '200') {
      setCheckPoint(1);
    } else {
      setCheckPoint(0);
    }
  }

  /**  描画ごとに現在質問中の質問を取得 */
  async function fetchQuestion() {
    //URLから取得
    const questionId = props.match.params.QuestionId;
    const apiQuestionData = await API.graphql(graphqlOperation(getQuestions, { id: questionId }));
    setQuestions(apiQuestionData.data.getQuestions);
    fetchListResolver(questionId, null);
  }

  /** 回答希望者リストの取得 */
  async function fetchListResolver(id, nextToken) {
    const result = await API.graphql(graphqlOperation(listAnswerUsers, {
      filter: {
        "questionId": {  "eq": id },
        "ansStatus": { "eq": 1 }
      },
      limit: 100,
      nextToken: nextToken,
    }));
    setResolver(result.data.listAnswerUsers.items);
  }

  //#36対応
  /** ボタン押下後に、引数としてidを持ってくる */
  const handleClick = async (id, time, url) => {
    let datetime = new Date().toISOString();

    formData.userId = id;
    formData.noticeTitle = "あなたは選ばれました";
    formData.linkDestinationUrl =url;
    formData.userId = id;
    formData.createdAt = datetime;
    formData.updatedAt = datetime;
    console.log(formData);

    await API.graphql({ query: createNoticeMutation, variables: { input: formData } });
    const api = 'https://f005ii5zjh.execute-api.ap-northeast-1.amazonaws.com/testExtension';
    const data = {
      "id": id,
      "solvedTime": time
    };
    await axios
      .post(api, data)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      });
  }

  /** 質問削除チェック  */
  const deleteCheck = async (id) => {
    let result = window.confirm('質問を削除してもよろしいですか？');

    if (result) {   // OKボタン押下時
      const api = 'https://4og2qtmzoj.execute-api.ap-northeast-1.amazonaws.com/testQuestion';
      const data = { "id": id };
      await axios
        .post(api, data)
        .then((response) => {})
        .catch((error) => {});
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
                      {'相談金額：' + user.userUnitPrice + '円'}
                      <br />
                      {'合計金額：' + (parseInt(user.userUnitPrice)*parseInt(user.time) / 10) + '円'}
                    </Typography>
                  </CardContent>

                  <CardActions disableSpacing>
                    {/* 会議時間と自身のidはDBから取ってくる */}
                    {checkPoint
                      ? <Button sx={{ mr: 4 }} variant='contained' color="success" component={LinkRouter} onClick={() => { handleClick(user.userId, user.time, `/skyway/0/${user.time}/${user.questionId}`); }} to={`/skyway/1/${user.time}/${user.questionId}`} target="_blank"  >依頼する</Button>
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
