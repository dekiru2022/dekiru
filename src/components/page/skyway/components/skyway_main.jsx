import React,{ useState, useRef, useEffect, useContext } from "react";
import { SkywayStoreContext } from "../Skyway";

import Box from '@mui/material/Box';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

import Chat from './chat';
import Timer from './timer';
import MenuBar from './menuBar';

export default function SkywayMain(){
  const {
    peer, meetingTime, roomId,
    startFlag,
    loading, setLoading,
    isChat, setIsChat,
    localVideoRef, remoteVideoRef,
  } = useContext(SkywayStoreContext);

  return (
    <div>
      <Box sx={{display: (loading? 'block': 'none')}}>
        <Box sx={{ width: '100%', 'backgroundColor': '#333', position: 'relative'}}>
          {/* 相手の画面 */}
          <Box sx={{ height: '90vh' , display: 'flex', 'justifyContent': 'center', margin: 'auto'}}>
            <video width="100%" ref={remoteVideoRef} playsInline autoPlay muted></video>
          </Box>

          {/* チャット */}
          <Box sx={{display: (isChat ? 'block' : 'none')}} >
            <Chat />
          </Box>

          {/* タイマー */}
          {startFlag &&
          <Box sx={{position: 'absolute', top: 0, right: 0}} >
            <Timer />
          </Box>
          }

          {/* 操作バー */}
          <Box sx={{ width: '100%', height: '10vh', position: 'fixed', bottom: 0, right: 0 }}>
            <MenuBar />
          </Box>

          {/* 自分の映像 */}
          <Box sx={{ width: '20%', position: 'absolute', top: 0, left: 0, transform: 'scale(-1,1)' }}>
            <video width="100%" ref={localVideoRef} playsInline autoPlay muted></video>
          </Box>
        </Box>
      </Box>
      
      
    </div>
  );
}