//
//  IndexQuestion.jsx
//  我喜屋
//  2022/01/31
//
//  質問一覧
//

// インポート一覧
import React, { useState, useEffect, useMemo } from 'react';
// Material UI インポート
import { Grid } from '@material-ui/core'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
// 質問カード　インポート
import QuestionCard from '../QuestionCard';

// テスト用データ
import { questions as TestQuestions } from '../../../../database/questions_table';
import { categories as TestCategories } from '../../../../database/categories_table';


export default function IndexQuestion() {

    // カテゴリー
    const [categories, setCategories] = useState([]);
    // 検索条件
    const [filterQuery, setFilterQuery] = useState({});
    // ソート条件
    const [sort, setSort] = useState({});
    // DBからとってきた質問
    const [questions, setQuestions] = useState([]);

    // 再描画のたびに実行
    useEffect(() => {
        getQuestionsData();
        getCategoriesData();
    }, [])

    // 一覧情報を取得しステートquestionsにセットする
    const getQuestionsData = () => {

        //テスト用データ代入
        setQuestions(TestQuestions);
        console.log(TestQuestions);
    }
    const getCategoriesData = () => {

        //テスト用データの代入
        setCategories(TestCategories);
    }

    const filteredTask = useMemo(() => {

        // 入力した文字は小文字にする
        const filterTitle = filterQuery.title && filterQuery.title.toLowerCase();
        const filterQuestion = filterQuery.question && filterQuery.question.toLowerCase();

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
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
            {/* カテゴリ選択 */}
            <Grid item xs={4} style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <p style={{ fontSize: '2rem' }}>新着相談</p>
            </Grid>
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
                            <MenuItem style={{ fontSize: '18px' }} value={category.id} key={index}>{category.category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            {/* 質問一覧　カードを表示 */}
            {
                questions.map((questions) => {
                    return (
                        <Grid item xs={5} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                            <QuestionCard question={questions} key={questions.id} />
                        </Grid>
                    );
                })
            }
        </Grid>
    );
}
