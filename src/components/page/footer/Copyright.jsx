//
// Copyright.jsx
// 我喜屋
// 2022/1/31
// コピーライト
//
import Link from '@mui/material/Link';
import React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@material-ui/core'
import { display } from '@material-ui/system';

function Copyright(props) {
  return (
    <div style={{ backgroundColor: '#26418D' }} >
      <Grid container spacing={6} justifyContent="center" alignItems="center" style={{ marginTop: '3%'}}>
        <Grid item>
          <Typography variant="body2" color="#FFF" align="center">
            {'Copyright © '}<Link color="inherit" href="https://top.dekiru2021.com/">DEKIRU</Link>{' '}{new Date().getFullYear()}{'.'}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" color="#FFF" align="center">
            <Link color="inherit" href="https://mui.com/">プライバシーポリシー</Link>{' '}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" color="#FFF" align="center">
            <Link color="inherit" href="https://mui.com/">利用規約</Link>{' '}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Copyright;