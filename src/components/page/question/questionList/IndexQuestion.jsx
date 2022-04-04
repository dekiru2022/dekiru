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
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

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
import '../../../../styles/Search.css';
import { TextField } from '@mui/material';
import { StyleTextField } from '../../../ui/styleTextField';

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
    async function fetchListQuestion(nextToken = null) {

        const apiData = await API.graphql(graphqlOperation(listQuestions, {
            filter: {
                "status": {
                    "eq": "1"
                }
            },
            limit: 10,
            nextToken: nextToken,
        }));
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

    //検索機能（Serchアイコンクリック）
    const onClickSerch = async (e, nextToken = null) => {
        searchQuestion(nextToken,e.target.value)
    };
    //検索機能(エンター)
    const handleKeyDown = (e, nextToken = null) => {
        if (e.keyCode === 13) {
            // エンターキーが押された時の処理
            searchQuestion(nextToken,e.target.value)
        };
    }
    //検索機能
    const searchQuestion = async (nextToken, keyValue) => {
        //	contains 指定した値が含まれる
        const apiData = await API.graphql(graphqlOperation(listQuestions, {
            filter: {
                "and": [
                    {
                        "title": {
                            "contains": keyValue
                        }
                    },
                    {
                        "status": {
                            "eq": "1"
                        }
                    }
                ]
            },
            limit: 10,
            nextToken: nextToken,
        }));
        setQuestions(apiData.data.listQuestions.items);
    }

    // 入力した情報をfilterQueryに入れる
    const handleFilter = e => {
        const { name, value } = e.target;
        setFilterQuery({ ...filterQuery, [name]: value });
    };

    const handleClick = async (id) => {
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
            <p style={{ fontSize: '2rem', margin: '1rem' }}>
                {AnswerId ? '解答中' : '新着相談'}
            </p>


            {AnswerId
                ? // 解答時の表示
                <Grid container justifyContent="center">
                    <Grid item xs={0} sm={1} md={3} />
                    <Grid item xs={12} sm={10} md={6}>
                        <Card my={4}>
                            <Card sx={{ width: '100%', minHeight: '16rem', boxSizing: 'border-box', border: '0.1rem solid #26418D', position: 'relative' }}>
                                {/* ヘッダー（カード内） */}
                                <CardHeader
                                    // 相談タイトル
                                    title={users.questionTitle}
                                    titleTypographyProps={{ variant: 'h5' }}
                                    // 相談作成時間
                                    subheader={users.updatedAt}
                                    style={{ marginTop: '0.5%' }}
                                />

                                {/* 相談内容（カード内） */}
                                <CardContent>
                                    <Typography variant="subtitle" color="text.secondary">
                                        {users.questionContent}
                                    </Typography>
                                </CardContent>
                            </Card>
                            {/* <QuestionCardResolver question={findedQueestion} /> */}
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
                    <Grid item xs={0} sm={1} md={3} />
                </Grid>

                :// 非解答時の表示
                <div style={{ width: '90%', margin: '0 auto' }}>
                    <Grid container spacing={3} justifyContent="center" alignItems="center" >
                        <Grid item xs={12} md={6} >
                            {/* 検索フォーム */}
                            <TextField
                                InputLabelProps={{ style: { fontSize: '21px', shrink: true } }}
                                size="medium"
                                margin="none"
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    style: { fontSize: '21px' },
                                    endAdornment: (
                                        <InputAdornment>
                                            <IconButton>
                                                <SearchIcon onClick={(e) => onClickSerch(e)} />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                label="検索"
                                onKeyDown={(e) => handleKeyDown(e)}
                            ></TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel style={{ fontSize: '21px' }} id="category-label" >カテゴリー</InputLabel>
                                <Select
                                    labelId="category-label"
                                    label="カテゴリー"
                                    onChange={handleFilter}
                                    name="category_id"
                                    style={{ fontSize: '21px', paddingRight: '0' }}
                                >
                                    {categories.map((category, index) => (
                                        <MenuItem style={{ fontSize: '18px' }} value={category.categoryId} key={index}>{category.category}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ marginTop: '1%' }}>
                        {
                            questions.map((question, i) => {
                                if (question.userId != cognitoId) {
                                    return (
                                        <>
                                            <Grid item xs={12} md={6}>
                                                <QuestionCardResolver question={question} />
                                            </Grid>
                                            {(() => {
                                                if ((questions.length === i) && ((questions.length % 2) === 1)) {
                                                    return (
                                                        <Grid item xs={12} md={6}></Grid>
                                                    )
                                                }
                                            })()}
                                        </>
                                    )
                                }
                            })
                        }
                    </Grid>
                </div>
            }
        </>
    );
}



