import React, { useState, useEffect, useMemo } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@material-ui/core';
import QuestionCard from '../QuestionCard';
import SearchIcon from '@mui/icons-material/Search';

// テスト用データ
import { questions as TestQuestions } from '../../../../database/questions_table';
import { categories as TestCategories } from '../../../../database/categories_table';


export default function IndexQuestion() {
    // const initialState = {
    //     questionss: [
    //         {
    //             id: 1,
    //             title: '最初のタスク',
    //             category: 1,
    //             question: '子供が泣いてどうしよう'
    //         }, {
    //             id: 2,
    //             title: '2番目のタスク',
    //             category: 2,
    //             question: '高齢者が急に嘔吐してどうしよう'
    //         }, {
    //             id: 3,
    //             title: '3番目のタスク',
    //             category: 1,
    //             question: '子供が４０度の熱を出してしまって。。。どうすれば良いでしょうか'
    //         }
    //     ],
    //     categories: [
    //         {
    //             id: 1,
    //             title: 'カテゴリー1'
    //         }, {
    //             id: 2,
    //             title: 'カテゴリー2'
    //         }
    //     ]
    // };
    // // タスク
    // const [questionss, setquestionss] = useState(initialState.questionss);
    // カテゴリー
    const [categories, setCategories] = useState([]);
    // 検索条件
    const [filterQuery, setFilterQuery] = useState({});
    // ソート条件
    const [sort, setSort] = useState({});
    //DBからとってきた質問
    const [questions, setQuestions] = useState([]);

    const [values, setValues] = React.useState({
        amount: '',
    });

    useEffect(() => {
      getQuestionsData();
      getCategoriesData();
    },[])
  
    //一覧情報を取得しステートquestionsにセットする
    const getQuestionsData = () => {
    //   axios
    //       .get('/api/questions')
    //       .then(response => {
    //           setQuestions(response.data);

                //テスト用データ代入
                setQuestions(TestQuestions);
                console.log(TestQuestions);
    //       })
    //       .catch(() => {
    //           console.log('通信に失敗しました');
    //       });
    }
    const getCategoriesData = () => {
    //   axios
    //       .get('/api/categories')
    //       .then(response => {
    //           setCategories(response.data);

                //テスト用データの代入
                setCategories(TestCategories);
    //       })
    //       .catch(() => {
    //           console.log('通信に失敗しました');
    //       });
    }

    const filteredTask = useMemo(() => {
        // let tmpTasks = tasks;

        // 入力した文字は小文字にする
        const filterTitle = filterQuery.title && filterQuery.title.toLowerCase();
        const filterQuestion = filterQuery.question && filterQuery.question.toLowerCase();

        // 絞り込み検索
        // tmpQuestions = tmpQuestions.filter(row => {

        //     // タイトルで絞り込み
        //     if (
        //         filterQuery.title &&
        //         String(row.title).toLowerCase().indexOf(filterTitle) === -1
        //     ) {
        //         return false;
        //     }
        //     // 質問内容で絞り込み
        //     if (
        //         filterQuery.question &&
        //         String(row.question).toLowerCase().indexOf(filterQuestion) === -1
        //     ) {
        //         return false;
        //     }
        //     // カテゴリーで絞り込み
        //     if (
        //         filterQuery.category_id &&
        //         row.category !== parseInt(filterQuery.category_id)
        //     ) {
        //         return false;
        //     }
        //     return row;
        // });

        // ソート
        // if (sort.key) {
        //     tmpQuestions = tmpQuestions.sort((a, b) => {
        //         a = a[sort.key];
        //         b = b[sort.key];
        //         return (a === b ? 0 : a > b ? 1 : -1) * sort.order;
        //     });
        // }

        // return tmpQuestions;
    }, [filterQuery, sort, questions]);
    // 入力した情報をfilterQueryに入れる
    const handleFilter = e => {
        const { name, value } = e.target;
        setFilterQuery({ ...filterQuery, [name]: value });
    };

    // 選択したカラムをSortに入れる
    const handleSort = column => {
        if (sort.key === column) {
            setSort({ ...sort, order: -sort.order });
        } else {
            setSort({
                key: column,
                order: 1
            })
        }
    };
    return (
        <Box sx={{display: 'flex', justifyContent: 'center' }}>
            <Box>
                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                        <InputLabel htmlFor="outlined-adornment-amount"><SearchIcon /></InputLabel>

                        <OutlinedInput
                            id="outlined-adornment-amount"
                            placeholder="検索ワード"
                            value={filterQuery.title || ''}
                            onChange={handleFilter}
                            name="title"
                        />
                    </FormControl>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
                        <InputLabel id="demo-simple-select-filled-label">カテゴリー選択</InputLabel>
                        <Select
                            name="category_id"
                            value={filterQuery.category_id}
                            onChange={handleFilter}
                        >

                            {
                                categories.map((category) => {
                                    return (
                                        <MenuItem
                                            key={category.id}
                                            value={category.id}>
                                            {category.category}
                                        </MenuItem>
                                    );
                                })
                            }
                        </Select>
                    </FormControl>

                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {
                        questions.map((questions) => {
                            return (
                                <QuestionCard question ={questions} key={questions.id} />
                            );
                        })
                    //     filteredQuestion.map((questions) => {
                    //         return (
                    //             <tr key={questions.id}>
                    //                 <td>
                    //                     <QuestionCard Category_id ={questions.category}  Title = {questions.title} Question={questions.question} />
                    //                 </td>
                    //             </tr>
                    //          );
                    //      })
                    }
                </Box>
            </Box>
        </Box>
    );
}