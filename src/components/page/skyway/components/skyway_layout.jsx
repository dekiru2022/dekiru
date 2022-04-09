import React,{ useContext } from "react";
import { SkywayStoreContext } from "../Skyway";
import Spinner from 'react-spinkit';

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
      <Box sx={wrapperStyle}>
        <Box sx={{display: (loading? 'block': 'none')}}>
          {/* 相手の画面 */}
          <Box sx={{ height: '100vh', display: 'flex', 'justifyContent': 'center', margin: 'auto'}}>
            <Video me={false} stream={remoteVideoRef} />
          </Box>
          {/* チャット */}
          <Box sx={chatStyle} >
            <Chat />
          </Box>
          {/* タイマー */}
          {startFlag &&
          <Box sx={{position: 'absolute', top: 10, right: 10}} >
            <Timer />
          </Box>
          }
          {/* 自分の映像 */}
          <Box sx={localStreamStyle}>
            <Video me={true} stream={localVideoRef} />
          </Box>
        </Box>
        {/* ページが読み込まれるまではローディングアイコンが表示 */}
        <Box sx={{display: (loading? 'none': 'block')}}>
          <Box sx={loadingStyle}>
            <Spinner name="line-spin-fade-loader" color="gray"/>
          </Box>
        </Box>

        {/* 操作バー */}
        <Box sx={menuBarStyle}>
          <MenuBar />
        </Box>
      </Box>



      {closeFlag &&
      <EndMessage />
      }
      
      
    </>
  );
}
// *
// *CSS
// *
//全体
const wrapperStyle = {
  height: "100vh",
  width: "100%",
  position: "relative",
  backgroundColor: "#333",
};

//チャット
const chatStyle = {
  position: 'absolute',
  top: 0, 
  right: 0,
  zIndex: '1'
}

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

//ローディングアイコン
const loadingStyle = {
  width: '100%',
  height: '100vh',
  display: 'flex', 
  alignItems: 'center',
  justifyContent: 'center'
}