import Link from '@mui/material/Link';
import React from 'react';
import Typography from '@mui/material/Typography';


function Copyright(props) {
    return (
      <div>
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {'Copyright © '}
          <Link color="inherit" href="https://top.dekiru2021.com/">
            DEKIRU
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
          <Link color="inherit" href="https://mui.com/">
            プライバシーポリシー
          </Link>{' '}
          <Link color="inherit" href="https://mui.com/">
            利用規約
          </Link>{' '}
        </Typography>
      </div>
    );
  }
  export default Copyright;