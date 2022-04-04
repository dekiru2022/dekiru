import React,{ useContext } from "react";
import { SkywayStoreContext } from "../Skyway";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button  from '@mui/material/Button';

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
    startFlag,
    userDisplay, setUserDisplay,
    userAudio, setUserAudio,
    userVideo, setUserVideo,
    isChat, setIsChat,
    onStart, onClose } = useContext(SkywayStoreContext);
  
  return (
    <Box sx={wrapperStyle}>
      <Stack justifyContent="center" alignItems="center" direction="row" spacing={4}>
          <Stack direction="row" spacing={2} sx={fontStyle}>
            <Button color="primary" variant="text" onClick={() => {setUserAudio(prev => !prev)}}>
              {userAudio
              ? <Stack alignItems="center"><MicIcon /><Box sx={fontStyle}>ミュート</Box></Stack>
              : <Stack alignItems="center"><MicOffIcon /><Box sx={fontStyle}>ミュート解除</Box></Stack>
              }
            </Button>
            <Button color="primary" variant="text" onClick={() => {setUserVideo(prev => !prev)}}>
              {userVideo
              ? <Stack alignItems="center"><VideocamIcon /><Box sx={fontStyle}>カメラオフ</Box></Stack>
              : <Stack alignItems="center"><VideocamOffIcon /><Box sx={fontStyle}>カメラオン</Box></Stack>
              }
            </Button>
            <Button color="primary" variant="text" onClick={() => {setUserDisplay(prev => !prev)}}>
              {userDisplay
              ? <Stack alignItems="center"><ScreenShareIcon /><Box sx={fontStyle}>共有終了</Box></Stack>
              : <Stack alignItems="center"><StopScreenShareIcon/><Box sx={fontStyle}>画面共有</Box></Stack>
              }
            </Button>
            <Button color="primary" variant="text" onClick={() => {setIsChat(prev => !prev)}}><Stack alignItems="center"><ChatIcon /><Box sx={fontStyle}>チャット</Box></Stack></Button>
          </Stack>
          <Stack justifyContent="center">
            {startFlag
            ?<Button color="secondary" variant="contained" disableElevation onClick={() => onClose()}>終了</Button>
            :<Button color="primary" variant="contained" disableElevation onClick={() => onStart()}>待機中</Button>
            }
          </Stack>
        </Stack>
    </Box>
  );
};

export default MenuBar;

const wrapperStyle = {
  width: "100%",
  height: "100%",
  backgroundColor: "#fff"
}
const fontStyle = {
  fontSize: "0.5rem"
};