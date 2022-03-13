import React, { useState, useEffect } from 'react';
// Material UI インポート
import { Grid } from '@material-ui/core'
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
import { Auth, API, graphqlOperation } from 'aws-amplify';

//購読
import { onCreateNotice } from '../../../graphql/subscriptions';
import { listNotices } from '../../../graphql/queries';

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

  const [notices, setNotices] = useState([]);

  useEffect(() => {
    getNotice();
  }, []);
  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onCreateNotice)).subscribe({
      next: (eventData) => {
        const post = eventData.value.data.onCreateNotice
        const posts = [...notices, post]
        setNotices(posts);
      }
    });
    return () => subscription.unsubscribe();
  });

  async function getNotice(nextToken = null) {
    let user1 = await Auth.currentAuthenticatedUser();
    const cognitoID = user1.attributes.sub;
    //filterの参考：https://qiita.com/isamuJazz/items/22b34985d9ee17d890c6
    const result = await API.graphql(graphqlOperation(listNotices, {
      filter: {
        "userId": {
          "eq": cognitoID
        }
      },
      limit: 10,
      nextToken: nextToken,
    }));
    setNotices(result.data.listNotices.items);
    console.log(result);
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      </Box> */}
      <div>
        {
          notices.map((notice, i) => {
            return (
              <>
                <Grid item xs={6}>
                  <Button variant="outlined" >
                    {notice.noticeTitle}
                  </Button>
                </Grid>
                {(() => {
                  if ((notices.length === i) && ((notices.length % 2) === 1)) {
                    return (
                      <Grid item xs={6}></Grid>
                    )
                  }
                })()}
              </>
            )
          })
        }
        {/* <Dialog
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
        </Dialog> */}
      </div>
    </Box>
  );
}

