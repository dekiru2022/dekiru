import React, { useState } from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import { Link as LinkRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core'
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

// テスト用データ
import { questions as TestQuestions } from '../../../database/questions_table';
import { users as TestUsers } from '../../../database/users_table';


function QuestionPage(props) {

    const [question, setQuestion] = useState(TestQuestions[0]);
    const [user, setUser] = useState(TestUsers[0]);
    const [time, setTime] = useState(10);
    const meetingTimeArray = [5, 10, 15, 20, 25, 30, 40, 50, 60]

    const inputChange = (e) => {
        const value = e.target.value;
        setTime(value);
    }

    return (
        <Grid container>
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Box>

                <Card sx={{ my: 4, minWidth: 300, maxWidth: 600 }}>
                    <CardHeader
                        avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                        </Avatar>}
                        action={<IconButton aria-label="settings">
                        <MoreVertIcon />
                        </IconButton>}
                        title={user.name + ' さん'}歳
                        subheader={user.ages + '歳'} />

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

                    <Box sx={{display: 'flex', alignItems: 'end'}}>
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
                            {meetingTimeArray.map((meetingTime,index) => (
                            <MenuItem value={meetingTime} key={index}>{meetingTime} 分</MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Button size='large' variant='contained' color="success" component={LinkRouter} to={`/skyway/${time}/${user.id}`} target="_blank" >解決開始！</Button>
                    </Box>
                </Box>
            </Box>

                {/* <TextField
                    label="タイトル"
                    fullWidth
                    margin="normal"
                    value={title}
                    
                />
                <Tooltip
                    title="自由に記入することができます"
                    placement="top-start"
                    arrow
                >
                    <TextField
                        label="詳細"
                        fullWidth
                        margin="normal"
                        rows={8}
                        multiline
                        variant="outlined"
                        value={detail}
                    />
                </Tooltip>
                
                    
                    <Grid container spacing={3} alignItems="center" justify="center" margin="5px">
                        <Button
                        color="secondary"
                            variant="contained"
                            style={{ margin: "5px", fontSize: "20px", padding: "0" }}
                        >
                            解答DEKIRU
                        </Button>
                    </Grid> */}
        </Grid>

    )
}

export default QuestionPage