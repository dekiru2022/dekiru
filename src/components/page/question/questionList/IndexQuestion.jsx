//
//  ファイル名
//  作成者
//  作成日時
//
//  質問一覧
//


import React, { useState, useEffect, useMemo } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import QuestionCard from '../QuestionCard';
import SearchIcon from '@mui/icons-material/Search';

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
    //DBからとってきた質問
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getQuestionsData();
        getCategoriesData();
    }, [])

    //一覧情報を取得しステートquestionsにセットする
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
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {
                        questions.map((questions) => {
                            return (
                                <QuestionCard question={questions} key={questions.id} />
                            );
                        })
                    }
                </Box>
            </Box>
        </Box>
    );
}