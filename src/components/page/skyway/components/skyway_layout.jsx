import React,{ useContext } from "react";
import { SkywayStoreContext } from "../Skyway";
import logo from '../../../../images/MyDEREAMS2.png';

import Box from '@mui/material/Box';

import Chat from './chat';
import Video from './video';
import Timer from './timer';
import MenuBar from './menuBar';
import EndMessage from "./endMessage";

export default function SkywayLayout(){
  const {
    startFlag, closeFlag,
    loading,
    isChat,
    localVideoRef, remoteVideoRef,
  } = useContext(SkywayStoreContext);

  return (
    <>
      <Box sx={{display: (loading? 'block': 'none')}}>
        <Box sx={wrapperStyle}>
          {/* 相手の画面 */}
          <Box sx={{ height: '100vh', display: 'flex', 'justifyContent': 'center', margin: 'auto'}}>
            <Video isReverse={false} stream={remoteVideoRef} />
          </Box>

          {/* チャット */}
          <Box sx={{display: (isChat ? 'block' : 'none')}} >
            <Chat />
          </Box>

          {/* タイマー */}
          {startFlag &&
          <Box sx={{position: 'absolute', top: 10, right: 10}} >
            <Timer />
          </Box>
          }

          {/* 操作バー */}
          <Box sx={menuBarStyle}>
            <MenuBar />
          </Box>

          {/* 自分の映像 */}
          <Box sx={localStreamStyle}>
            <Video isReverse={true} stream={localVideoRef} />
          </Box>
        </Box>
      </Box>

      {closeFlag &&
      <EndMessage />
      }
      
      
    </>
  );
}

//全体
const wrapperStyle = {
  height: "100vh",
  width: "100%",
  position: "relative",
  backgroundColor: "#333",
  backgroundImage: `url(${logo})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
};

//自分の映像
const localStreamWidth = 240;
const localStreamStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: localStreamWidth,
  height: (localStreamWidth / 4) * 3,
  backgroundColor: "#000",
};

//操作バー
const menuBarStyle = {
  width: '100%',
  height: '60px',
  position: 'absolute',
  bottom: 0,
  left: 0,
}