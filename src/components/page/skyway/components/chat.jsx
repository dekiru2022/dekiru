import React,{ useContext,useEffect } from "react";
import { SkywayStoreContext } from "../Skyway";
import Box from '@mui/material/Box';
import { TextField } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { calculateNewValue } from "@testing-library/user-event/dist/utils";

const Chat = () => {
  const { roomData, isChat, setIsChat } = useContext(SkywayStoreContext);
  const messages = roomData.messages;
  
  return (
    <Box sx={{display: (isChat ? 'block' : 'none')}}>
      <Box sx={wrapperStyle}>
        {/* チャットオフボタン */}
        <Box>
          <IconButton sx={{height: IconSize, width: IconSize}} size="small" onClick={() => {setIsChat(prev => !prev)}}>
            <CloseIcon fontSize="inherit"/>
          </IconButton>
        </Box>
        <Box sx={secondWrapper}>
          {/* メッセージ表示領域 */}
          <Box sx={messageStyle}>
            {messages}
          </Box>
          {/* 入力・送信 */}
          <Box sx={formStyle}>
              <TextField
              id="message-form"
              label="チャットを入力"
              multiline
              fullWidth
              name='name'
              rows={3}
              variant="outlined"
              />
              <Box>
                <IconButton id="send-trigger" color="primary" size="small">
                  <SendIcon fontSize="inherit"/>
                </IconButton>
              </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;

const wrapperStyle = {
  width: '240px', 
  height: '100vh',
  backgroundColor: 'rgba(255,255,255,1)', 
  outline: `1px solid #ccc`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}
const IconSize = '28px';
const secondWrapper = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100vh' - IconSize,
}
const formHeight = '95px';
const messageStyle = {
  height: '100vh' - IconSize - formHeight,
  whiteSpace: 'pre-wrap', 
  wordWrap: 'break-word', 
  fontSize: '0.8rem', 
  padding: '10px 8px 20px',
}
const formStyle = {
  height: formHeight,
  display: 'flex',
  'fontSize': '0.7rem'
}