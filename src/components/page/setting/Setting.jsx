import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BasicDetail from './userInformation/BasicDetail';
import NDA from './NDA';
import Notice from './Notice';
import Certification from './userInformation/Certification';
import {Auth} from 'aws-amplify'
import UpLoadTest from './userInformation/upLoad';

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
        <Box sx={{ p: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Setting() {
  const [value, setValue] = React.useState(0);
  const [user, setUser] = useState([]);
  const id = 1;

  //一覧情報を取得しステートquestionsにセットする
  const getUserData = (id) => {
  }

  useEffect(() => {
    getUserData(id);
    
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="マイページ" {...a11yProps(0)} />
          <Tab label="お知らせ" {...a11yProps(1)} />
          <Tab label="秘密保持契約" {...a11yProps(2)} />
          <Tab label="秘密保持契約" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <BasicDetail />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Notice />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Certification />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <UpLoadTest />
      </TabPanel>
    </Box>
  );
}