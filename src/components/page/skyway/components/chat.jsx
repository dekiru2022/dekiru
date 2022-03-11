import React,{ useContext } from "react";
import { SkywayStoreContext } from "../Skyway";
import Box from '@mui/material/Box';
import { TextField } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

const Chat = () => {
  const { roomData } = useContext(SkywayStoreContext);
  const messages = roomData.messages;
  
  return (
    <div>
      <Box sx={{width: '25%', 'backgroundColor': 'rgba(255,255,255,0.96)', height: '100vh', position: 'fixed', top: 0, right: 0, zIndex: 'modal', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <Box sx={{'whiteSpace': 'pre-wrap', 'wordWrap': 'break-word', 'fontSize': '0.8rem', padding: '8px'}}>
          {messages}
        </Box>
        <Box sx={{ display: 'flex', 'fontSize': '0.7rem'}}>
            <TextField
            id="message-form"
            label="メッセージを入力"
            multiline
            fullWidth
            rows={3}
            variant="outlined"
            name="name"
            inputProps={{style: {fontSize: 12}}}
            InputLabelProps={{style: {fontSize: 12}}}
            />
            <Box>
              <IconButton id="send-trigger" color="primary">
                <SendIcon />
              </IconButton>
            </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Chat;