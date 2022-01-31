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




const Header = ({ signOut, user }) => {

  return (
    <Grid container direction="column">
      <Grid item>
        <AppBar position="static" style={{ backgroundColor: "#fff" }}>
          <Toolbar>
            <Box sx={{ display: 'flex', justifyContent: 'stretch', alignItems: 'center', width: '100%' }}>
              <Box sx={{ width: '15%', minWidth: '100px' }}>
                <Button color="primary" component={Link} to="/" ><img width="100%" src={logo2} alt="DEKIRU"></img></Button>
              </Box>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }} m={1}>
                <Button color="primary" component={Link} to="/" ><HomeIcon /></Button>
                <Button color="primary" component={Link} to="/setting" ><SettingsIcon /></Button>
                <AmplifySignOut buttonText="ログアウト"></AmplifySignOut>
                {/* 認証機能をボタンで実装できれば・・・ */}
                {/* <StyleButton title="ログアウト" onClick={() => Auth.signOut()} to="/" /> */}
              </Box>
            </Box>
          </Toolbar>

        </AppBar>
      </Grid>
      {/* 質問・質問一覧とかぶっている */}
      <Grid item style={{ width: '100%', height: '3rem', backgroundColor: '#0093FD', float: 'none', marginBottom: '1%'}}></Grid>
    </Grid>
  );
};
export default Header;