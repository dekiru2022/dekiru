import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

export default function Notice() {

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      </Box>
      <div>
      <Button variant="outlined" >
        2022-01-11 DEKIRUが開設しました。 <br />卒制企画書完成
      </Button><Button variant="outlined" >
        2022-01-11 DEKIRUが開設しました。 <br />まだまだ課題が沢山あります。
      </Button>
      <Dialog
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"2022-01-11 DEKIRUが開設しました。"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            本日からDEKIRUを私用することができます。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus>
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </Box>
  );
}

