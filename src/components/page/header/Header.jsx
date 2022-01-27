import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { AppBar, SvgIcon, Toolbar, Container } from "@material-ui/core";
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import logo2 from '../../../pages/images/DEKIRU-logo2.jpg'
import { AmplifySignOut } from '@aws-amplify/ui-react';


const Header = ({ signOut, user }) => {
  
  return (
    <AppBar position="static" style={{ backgroundColor: "#fff" }}>
      <Toolbar>
        {/* <Container maxWidth="xl"> */}
          <Box sx={{display: 'flex', justifyContent: 'stretch', alignItems: 'center', width: '100%'}}>
            <Box sx={{width: '15%' , minWidth: '100px' }}>
              <Button color="primary" component={Link} to="/" ><img width="100%" src={logo2} alt="DEKIRU"></img></Button>
            </Box>
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'flex-end'}} m={1}>
              <Button color="primary" component={Link} to="/notifications" ><NotificationsIcon /></Button>
              <Button color="primary" component={Link} to="/myPage" ><PersonIcon /></Button>
              <Button color="primary" component={Link} to="/settings" ><SettingsIcon /></Button>
              <AmplifySignOut buttonText="ログアウト"></AmplifySignOut>
            </Box>
          </Box>
        {/* </Container> */}
      </Toolbar>
    </AppBar>
  );
};
export default Header;