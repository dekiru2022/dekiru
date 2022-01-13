import React from 'react';
import { Button } from '@material-ui/core';
import { Link  as LinkRouter } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from "@material-ui/core/TextField";



export default function Secession1() {
    const [value, setValue,category,detail] = React.useState(localStorage.getItem('category'));
  
    return(
        <>
        <Typography component="h1" variant="h5">
              退会の理由をお答えください。
            </Typography>

        <InputLabel id="select-label">退会理由</InputLabel>
        <Select
                    labelId="select-label"
                    value={category}
                    label="退会理由"
                >
                    <MenuItem value={'operation'}>操作性が悪い</MenuItem>
                    <MenuItem value={'other'}>その他</MenuItem>
                </Select>

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
                        placeholder="
                                    - 任意 &#13;
                                    - 気兼ねなくお答えください &#13;
                                    ※ご自由に記載ください"
                    />
                </Tooltip>

        <Grid 
        container
        justifyContent="flex-end">
        <Button
                variant="contained"
                component={LinkRouter} to="/componets/TopBar"
              >
                退会
              </Button>
              </Grid>
        <Grid
        container
        justifyContent="flex-start"> 
        <Button
              variant="contained"
              component={LinkRouter} to="/componets/TopBar"
            >
              見直す
            </Button>
            </Grid>

            </>
        );
    }

