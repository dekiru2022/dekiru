//
//  IndexQuestion.jsx
//  我喜屋
//  2022/01/31
//
//  質問一覧
//

// インポート一覧
import React, { useState, useEffect } from 'react';
// Material UI インポート
import { Grid } from '@material-ui/core'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// テスト用データ
import { categories as TestCategories } from '../../../../database/categories_table';
// Graphql インポート
import { listQuestions, getAnswerUser } from '../../../../graphql/queries';
import { onCreateQuestions } from '../../../../graphql/subscriptions';

import { Auth, API, graphqlOperation } from 'aws-amplify';
import { QuestionCardResolver } from '../QuestionCardResolver';
import { ConsoleLogger } from '@aws-amplify/core';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { yellow } from '@mui/material/colors';
import { Link as LinkRouter } from 'react-router-dom';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export default function IndexQuestion(props) {

    // カテゴリー
    const [categories, setCategories] = useState([]);
    // 検索条件
    const [filterQuery, setFilterQuery] = useState({});
    // ソート条件
    // const [sort, setSort] = useState({});
    // DBからとってきた質問
    const [questions, setQuestions] = useState([]);
    // console.log("useState")
    const [cognitoId, setCognitoId] = useState();

    const [AnswerId, setAnswerId] = useState();
    const [users, setUsers] = useState([]);
    const [findedQueestionTitle, setFindedQueestionTitle] = useState();
    const [findedQueestionCreatedAt, setFindedQueestionCreatedAt] = useState();
    const [findedQueestionContent, setFindedQueestionContent] = useState();
    // 初回描画に実行
    useEffect(() => {
        getId();
        getCategoriesData();
        fetchListQuestion();
    }, [])

    async function getId() {
        //URL
        const answerId = props.match.params.AnswerId;
        console.log("test" + answerId);
        setAnswerId(answerId);
        const reasult1 = await API.graphql(graphqlOperation(getAnswerUser, { id: answerId }));
        console.log(reasult1);
        setUsers(reasult1.data.getAnswerUser);
    }
    // AWSから質問一覧を取得
    async function fetchListQuestion() {
        const apiData = await API.graphql({ query: listQuestions });
        setQuestions(apiData.data.listQuestions.items);

        //ログインユーザが解答している質問を検索
        //https://www.digitalocean.com/community/tutorials/js-array-search-methods-ja
        const findQueestion = apiData.data.listQuestions.items.map(el => el.id);
        const findNumber = findQueestion.indexOf(users.questionId);
        setFindedQueestionTitle(apiData.data.listQuestions.items[findNumber].title);
        setFindedQueestionCreatedAt(apiData.data.listQuestions.items[findNumber].createdAt);
        setFindedQueestionContent(apiData.data.listQuestions.items[findNumber].content);
    }
    // ------購読------
    useEffect(() => {
        const subscription = API.graphql(graphqlOperation(onCreateQuestions)).subscribe({
            next: (eventData) => {
                const post = eventData.value.data.onCreateQuestions
                const posts = [...questions, post]
                setQuestions(posts)
            }
        });
        return () => subscription.unsubscribe();
    })

    const getCategoriesData = () => {
        //データの代入
        setCategories(TestCategories);
    }

    // const filteredTask = useMemo(() => {
    //     // 入力した文字は小文字にする
    //     const filterTitle = filterQuery.title && filterQuery.title.toLowerCase();
    //     const filterQuestion = filterQuery.question && filterQuery.question.toLowerCase();
    //     // return tmpQuestions;
    // }, [filterQuery, sort, listQuestions]);

    // 入力した情報をfilterQueryに入れる
    const handleFilter = e => {
        const { name, value } = e.target;
        setFilterQuery({ ...filterQuery, [name]: value });
    };
    const handleClick = async  (id) => {
        // 更新処理
        const api = 'https://7nikns07z9.execute-api.ap-northeast-1.amazonaws.com/testPost';
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
        
        window.location.href = '/indexQuestion';
    }

// 選択したカラムをSortに入れる
// const handleSort = column => {
//     if (sort.key === column) {
//         setSort({ ...sort, order: -sort.order });
//     } else {
//         setSort({
//             key: column,
//             order: 1
//         })
//     }
// };

// メイン
return (
    <>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
            {/* 解答中なら表示 */}
            {AnswerId &&
                <Grid item xs={4} style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <p style={{ fontSize: '2rem' }}>解答中</p><Card sx={{ m: 1, minWidth: 330, maxWidth: 500 }}>
                        {/* TODO質問が表示されない */}
                        <Grid item xs={6}>
                            {
                                <Card sx={{ m: 1, width: '40rem', height: '20rem', border: '0.1rem solid #26418D', position: 'relative' }}>
                                    {/* ヘッダー（カード内） */}
                                    <CardHeader
                                        // 相談タイトル
                                        title={findedQueestionTitle}
                                        titleTypographyProps={{ variant: 'h5' }}
                                        // 相談作成時間
                                        subheader={findedQueestionCreatedAt}
                                        style={{ marginTop: '0.5%' }}
                                    />

                                    {/* 相談内容（カード内） */}
                                    <CardContent>
                                        <Typography variant="subtitle" color="text.secondary">
                                            {findedQueestionContent}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            }
                            {/* <QuestionCardResolver question={findedQueestion} /> */}
                        </Grid>
                        <CardContent>
                            <Typography variant="h6">
                                {users.userHandleName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {'性別：' + users.userSex}
                                <br />
                                {'職業：' + users.userJob}
                                <br />
                                {'職務経験：' + users.userExperience + '年'}
                                <br />
                                {'解決時間：' + users.time + '分'}
                                <br />
                                {'相談費用：' + users.userUnitPrice + '円'}
                            </Typography>
                        </CardContent>

                        <CardActions disableSpacing>
                            {/* 会議時間と自身のidはDBから取ってくる */}
                            <Button sx={{ mr: 4 }} variant='contained' color="error" onClick={() => { handleClick(users.id); }} target="_blank">解答やめる</Button>

                        </CardActions>
                    </Card>

                </Grid>
            }
            <Grid item xs={12} style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <p style={{ fontSize: '2rem' }}>新着相談</p>
            </Grid>
            {/* カテゴリ選択 */}
            <Grid item xs={6} style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <FormControl fullWidth>
                    <InputLabel style={{ fontSize: '21px' }} id="demo-multiple-name-label" >カテゴリー</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="カテゴリー"
                        onChange={handleFilter}
                        name="category_id"
                        style={{ fontSize: '21px' }}
                    >
                        {categories.map((category, index) => (
                            <MenuItem style={{ fontSize: '18px' }} value={category.categoryId} key={index}>{category.category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>

        {/* 質問一覧　カードを表示 */}
        {/*  */}
        <Grid container justifyContent="center" alignItems="center" spacing={2} style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }} >
            {
                questions.map((question, i) => {
                    if (question.userId != cognitoId) {
                        return (
                            <>
                                <Grid item xs={6}>
                                    <QuestionCardResolver question={question} />
                                </Grid>
                                {(() => {
                                    if ((questions.length === i) && ((questions.length % 2) === 1)) {
                                        return (
                                            <Grid item xs={6}></Grid>
                                        )
                                    }
                                })()}
                            </>
                        )
                    }
                })
            }
        </Grid>
    </>
);
}



