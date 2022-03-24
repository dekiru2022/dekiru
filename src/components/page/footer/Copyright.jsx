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
import { padding } from '@mui/system';

function Copyright() {
  return (
    <div style={{ backgroundColor: '#26418D' }} >
      <Grid container spacing={8} justifyContent="center" alignItems="center" style={{ marginTop: '3%'}}>
        <Grid item xs={12} sm={2}>
          <Typography variant="body2" color="#FFF" align="center">
            {'Copyright © '}<Link color="inherit" href="https://top.dekiru2021.com/">DEKIRU</Link>{' '}{new Date().getFullYear()}{'.'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography variant="body2" color="#FFF" align="center">
            <Link color="inherit" href="https://mui.com/">プライバシーポリシー</Link>{' '}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography variant="body2" color="#FFF" align="center">
            <Link color="inherit" href="https://mui.com/">利用規約</Link>{' '}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Copyright;
