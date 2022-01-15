import React, { useState, useEffect, useMemo } from 'react';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography"
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Rating from '@mui/material/Rating';
import Icon from '../../images/DEKIRU-logo1.jpg'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Review(props){
  return(
    <div align='center'>
      <Box sx={{width:300, p: 2}} >
      <Paper elevation={3}>
      <Typography><img src={props.img} alt='ユーザーアイコン' width={100} align='middle'/>{props.name}</Typography>
        <Rating
          name="simple-controlled"
          value={props.rate}
          readOnly={true}
          size="large"
          />
        </Paper>
      </Box>
    </div>
  );
}

function SurveyResult(){

  const [tabValue, setTab_value] = React.useState(0);
  const tabHc = (event, newValue) => {
    // setTabValue(newValue);
  };

  return(
    <div>
      <Container>
        <div>
          <Typography align='right' variant='h3'>アンケート結果</Typography>
        </div>
        <Divider />
        <div>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={tabHc} aria-label="Survey result tab">
              <Tab label="相談者から" {...a11yProps(0)} />
              <Tab label="解決者から" {...a11yProps(1)} />
            </Tabs>
          </Box>
        </div>
        <TabPanel value={tabValue} index={0}>
            <Review img = {Icon} name="Ashida Yusuke" rate="5"/>
            <Review img = {Icon} name="Suzuki Ichiro" rate="4"/>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
            <Review img = {Icon} name="Kosaka Koju" rate="3"/>
            <Review img = {Icon} name="Kimura Daichi" rate="2"/>
            <Review img = {Icon} name="Tanaka Kisuke" rate="1"/>
        </TabPanel>
      </Container>
    </div>
  );
}

export default SurveyResult