//
//  ファイル名
//  作成者
//  作成日時
//
//  質問詳細
//


import React, { useState } from 'react';

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

// テスト用データ
import { questions as TestQuestions } from '../../../../database/questions_table';
import { users as TestUsers } from '../../../../database/users_table';


function QuestionPage(props) {

    const [question, setQuestion] = useState(TestQuestions[0]);
    const [user, setUser] = useState(TestUsers[0]);
    const [time, setTime] = useState(10);
    const meetingTimeArray = [10, 20, 30, 40, 50, 60]

    const inputChange = (e) => {
        const value = e.target.value;
        setTime(value);
    }

    return (
        <Grid container>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Box>

                    <Card sx={{ my: 4, minWidth: 300, maxWidth: 600 }}>
                        <CardHeader
                            avatar={
                                question.user_id == 1
                                    ?
                                    <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                                        {question.user_char_name}
                                    </Avatar>
                                    :
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        {question.user_char_name}
                                    </Avatar>
                            }
                            action={<IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>}
                            title={user.name + ' さん'} 歳
                            subheader={user.ages + '歳'}
                        />

                        <CardContent>
                            <Typography variant="subtitle1" color="text.primary">
                                {question.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {question.content}
                            </Typography>
                            <Typography mt={2} variant="body2" color="text.secondary">
                                {question.created_at}
                            </Typography>
                        </CardContent>

                        <CardActions disableSpacing>

                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>


                        </CardActions>
                    </Card>

                    <Box sx={{ display: 'flex', alignItems: 'end' }}>
                        <Box>
                            <InputLabel id="time">解決想定時間</InputLabel>
                            <Select
                                labelId="time"
                                id="demo-simple-select"
                                label="カテゴリー"
                                onChange={inputChange}
                                name="category_id"
                                defaultValue={10}
                            >
                                {meetingTimeArray.map((meetingTime, index) => (
                                    <MenuItem value={meetingTime} key={index}>{meetingTime} 分</MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Button size='large' variant='contained' color="success" component={LinkRouter} to={`/skyway/${time}/${user.id}`} target="_blank" >解決開始！</Button>
                    </Box>
                </Box>
            </Box>
        </Grid>

    )
}

export default QuestionPage