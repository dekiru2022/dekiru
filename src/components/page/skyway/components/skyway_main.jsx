import React,{ useState, useRef, useEffect, useContext } from "react";
import { SkywayStoreContext } from "../Skyway";

import Box from '@mui/material/Box';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

import Spinner from 'react-spinkit';
import Video from './video';
import Chat from './chat';
import Timer from './timer';
import MenuBar from './menuBar';

export default function SkywayMain(){
  const {
    peer, meetingTime, roomId,
    loading, setLoading,
    room, setRoom,
    roomData, setRoomData,
    localStream, setLocalStream,
    remoteStream, setRemoteStream,
    isConnected, setIsConnected,
    isChat, setIsChat,
    localVideoRef, remoteVideoRef,
  } = useContext(SkywayStoreContext);

  //チャットに変更があったとき、stateを更新する処理(setStateではうまく動かない)
  const addMessages = (text) => {
    roomData.messages += (text+ '\n');
    let data = Object.assign({}, roomData);
    setRoomData(data);
  }

  //ルームの各イベントに対して処理を追加
  const setEventListener = (room) => {
    const sendTrigger = document.getElementById('send-trigger');
    const messageForm = document.getElementById('message-form');
    
    //open: SkyWayサーバーとの接続が成功したタイミングで発火
    room.once("open", () => {
      addMessages('=== ルームに参加しました ===');
      setIsConnected(true);
    });

    //peerJoin: 誰かがroomに参加したときに発火
    room.on("peerJoin", (peerId) => {
      addMessages(`=== ${peerId} が参加しました ===`);
    });

    //stream: 相手の映像の情報
    room.on("stream", (stream) => {
      setRemoteStream(stream);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    });

    //data: チャット受信
    room.on("data", ({data, src}) => {
      addMessages(`${src}: ${data}`);
    })
    
    //peerLeave: 誰かがroomから退室したときに発火
    room.on("peerLeave", (peerId) => {
      setRemoteStream('');
      addMessages(`=== ${peerId} が退室しました ===`);
    });

    //close: 自身が退室したときに発火
    room.once('close', () => {
      sendTrigger.removeEventListener('click', onClickSend);
      addMessages('== ルームから退室しました ===');
      setRemoteStream('');
      setIsConnected(false);
    });

    //送信ボタンの処理
    sendTrigger.addEventListener('click', () => onClickSend());
    const onClickSend = () => {
      const localMessage = messageForm.value;
        if(localMessage){
          room.send(localMessage);
          addMessages(`あなた: ${localMessage}`);
          messageForm.value = '';
        }
    }
  }
  return (
    <div>
      <Box sx={{display: (loading? 'block': 'none')}}>
        <Box sx={{ width: '100%', 'backgroundColor': '#333', position: 'relative'}}>
          {/* 相手の画面 */}
          <Box sx={{ height: '100vh', display: 'flex', 'justifyContent': 'center', margin: 'auto'}}>
            <video width="100%" ref={remoteVideoRef} playsInline autoPlay muted></video>;
            {/* {castVideo()} */}
          </Box>

          {/* チャット */}
          <Box sx={{display: (isChat ? 'block' : 'none')}} >
            <Chat />
          </Box>

          {/* タイマー */}
          <Box sx={{position: 'absolute', top: 0, right: 0}} >
            <Timer />
          </Box>

          {/* 操作バー */}
          <Box sx={{ width: '100%', position: 'fixed', bottom: 0, right: 0 }}>
            <MenuBar />
          </Box>

          {/* 自分の映像 */}
          <Box sx={{ width: '20%', position: 'absolute', top: 0, left: 0 }}>
            <Box sx={{ position: 'relative', backgroundColor: '#555', width: '100%', height: '180px', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
              <VideocamOffIcon />
              <Box sx={{ position:'absolute', top: 0, left: 0 }} >
                <video
                width="100%"
                ref={localVideoRef}
                style={{transform: 'scale(-1,1)'}}
                playsInline autoPlay muted></video>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      
      
    </div>
  );
}