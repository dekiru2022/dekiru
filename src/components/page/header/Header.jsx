import React from 'react';
import Box from '@mui/material/Box';
import { AppBar, Toolbar } from "@material-ui/core";
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import { Link as LinkRouter } from 'react-router-dom';
import Button from '@mui/material/Button';
import logo2 from '../../../images/MyDEREAMS2.png'
import { Grid } from '@material-ui/core'
import { Auth } from "aws-amplify";
import { StyleButton } from '../../ui/styleButton';

import { createTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from "@material-ui/core";

import "../../../styles/App.css";

const theme = createTheme({
  shadows: ["none"]
});

const Header = ({ signOut, user }) => {

  const SignOut = async () => {
    try {
      await Auth.signOut();
      window.location.reload();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Grid container direction="column">
        <Grid item>
          <AppBar position="static" style={{ backgroundColor: "#fff" }}>
            <Toolbar>
              <Box sx={{ display: 'flex', justifyContent: 'stretch', alignItems: 'center', width: '100%' }}>

                {/* ロゴの表示 */}
                <Button color="primary" component={LinkRouter} to="/" style={{ marginBottom: '1.1%' }}>
                  <img width="60%" src={logo2} alt="DEKIRU"></img>
                </Button>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>

                  {/* 各種ボタン（PC） */}
                  <div className="pc-area">
                  <Button
                    className="pc-area" style={{ margin: '0.5% 1% 0.5% 1%' }} 
                    variant="contained"
                    component={LinkRouter}
                    to={"/"}
                    sx={{ fontSize: 20 }}
                     >ホーム
                  </Button>
                  
                  <Button
                    className="pc-area" style={{ margin: '0.5% 1% 0.5% 1%' }} 
                    variant="contained"
                    component={LinkRouter}
                    to={"/setting"}
                    sx={{ fontSize: 20}}
                    >設定
                  </Button>
                  <Button
                    className="pc-area" style={{ margin: '0.5% 1% 0.5% 1%' }} 
                    variant="contained"
                    onClick={SignOut}
                    sx={{ fontSize: 20 }} 
                    >ログアウト
                  </Button>
                  </div>
                  {/* 各種ボタン（スマホ） */}
                  <div className="smartphone-area" style={{ margin: '2% 0% 1% 0%' }} >
                    <IconButton component={LinkRouter} to="/">
                      <HomeIcon sx={{ fontSize: 40 }} color="primary" />
                    </IconButton>
                  </div>
                  <div className="smartphone-area" style={{ margin: '2% 0% 1% 0%' }} >
                    <IconButton component={LinkRouter} to="/setting">
                      <SettingsIcon sx={{ fontSize: 40 }} color="primary" />
                    </IconButton>
                  </div>
                  <div className="smartphone-area" style={{ margin: '2% 0% 1% 0%' }} >
                    <IconButton onClick={SignOut}>
                      <LogoutIcon sx={{ fontSize: 40 }} color="primary" onClick={SignOut} />
                    </IconButton>
                  </div>

                </Box>
              </Box>
            </Toolbar>
          </AppBar>
        </Grid>
        
        {/* 境界線 */}
        <Grid item style={{
          width: '95%',
          height: '2px',
          backgroundColor: '#72B3D6',
          float: 'none',
          marginBottom: '1%',
          marginLeft: '2.5%',
          marginRight: '2.5%'
        }}></Grid>
      </Grid>
    </MuiThemeProvider>
  );
};

export default Header;
