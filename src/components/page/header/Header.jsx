import React from 'react';
import Box from '@mui/material/Box';
import { AppBar, Toolbar } from "@material-ui/core";
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import logo2 from '../../../images/DEKIRU-logo2.jpg'
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { Grid } from '@material-ui/core'
import { Auth } from "aws-amplify";
import { StyleButton } from '../../ui/styleButton';

import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import {MuiThemeProvider} from "@material-ui/core";

const theme = createMuiTheme({
  shadows: ["none"]
});

const Header = ({ signOut, user }) => {

  return (
    <MuiThemeProvider theme={theme}>
    <Grid container direction="column">
      <Grid item>
        <AppBar position="static" style={{ backgroundColor: "#fff"}}>
          <Toolbar>
            <Box sx={{ display: 'flex', justifyContent: 'stretch', alignItems: 'center', width: '100%' }}>
              <Box sx={{ width: '15%', minWidth: '100px' }}>
                <Button color="primary" component={Link} to="/" ><img width="100%" src={logo2} alt="DEKIRU"></img></Button>
              </Box>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }} m={1}>
                <div style={{ margin: '0.5% 1% 0.5% 1%' }} ><StyleButton title="ホーム" to="/" /></div>
                <div style={{ margin: '0.5% 1% 0.5% 1%' }} ><StyleButton title="設定" to="/setting" /></div>
                {/* <AmplifySignOut buttonText="ログアウト"></AmplifySignOut> */}
                {/* 認証機能をボタンで実装できれば・・・ */}
                <div style={{ margin: '0.5% 1% 0.5% 1%' }} ><StyleButton title="ログアウト" to="/" /></div>
                <AmplifySignOut buttonText="ログアウト"></AmplifySignOut>
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
