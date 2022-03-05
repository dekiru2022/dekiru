import React,{ useContext } from "react";
import { SkywayStoreContext } from "../Skyway";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button  from '@mui/material/Button';

import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ChatIcon from '@mui/icons-material/Chat';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';

const MenuBar = () => {
  const {
    isConnected, setIsConnected,
    userDisplay, setUserDisplay,
    userAudio, setUserAudio,
    userVideo, setUserVideo,
    isChat, setIsChat,
    onStart, onClose } = useContext(SkywayStoreContext);
  
  return (
    <Box sx={{ width: '100%', 'backgroundColor': 'rgba(255,255,255,1)' }}>
      <Stack justifyContent="center" direction="row" spacing={4}>
          <Box>
            <Button color="primary" variant="text" onClick={() => {setUserAudio(prev => !prev)}}>
              {userAudio
              ? <Stack alignItems="center"><MicIcon />ミュート</Stack>
              : <Stack alignItems="center"><MicOffIcon />ミュート解除</Stack>
              }
            </Button>
            <Button color="primary" variant="text" onClick={() => {setUserVideo(prev => !prev)}}>
              {userVideo
              ? <Stack alignItems="center"><VideocamIcon />カメラオフ</Stack>
              : <Stack alignItems="center"><VideocamOffIcon />カメラオン</Stack>
              }
            </Button>
            <Button color="primary" variant="text" onClick={() => {setUserDisplay(prev => !prev)}}>
              {userDisplay
              ? <Stack alignItems="center"><ScreenShareIcon />共有終了</Stack>
              : <Stack alignItems="center"><StopScreenShareIcon/>画面共有</Stack>
              }
            </Button>
            <Button color="primary" variant="text" onClick={() => {setIsChat(prev => !prev)}}><Stack alignItems="center"><ChatIcon />チャット</Stack></Button>
          </Box>
          <Stack justifyContent="center">
            {isConnected
            ?<Button size="small" color="secondary" variant="contained" onClick={() => onClose()} startIcon={<CallEndIcon />}>終了</Button>
            :<Button size="small" color="primary" variant="contained" onClick={() => onStart()} startIcon={<CallIcon />}>開始</Button>
            }
          </Stack>
        </Stack>
    </Box>
  );
};

export default MenuBar;