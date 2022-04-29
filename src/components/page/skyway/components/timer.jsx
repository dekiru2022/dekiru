//firebaseをmydrのアカウントで
//延長するとリセットになってしまう。今の秒数に追加したい。
//timestampをfirebaseに送ると、getSeconds()が使えなくなる

import React,{ useContext, useEffect, useState } from "react";
import axios from 'axios';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { SkywayStoreContext } from "../Skyway";

import { useTimer } from "react-timer-hook";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { QuizTwoTone } from "@mui/icons-material";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6Ef3JjXb_MZ0JjD5JVpJODbOpRH2IeJw",
  authDomain: "mydreams-36c7f.firebaseapp.com",
  projectId: "mydreams-36c7f",
  storageBucket: "mydreams-36c7f.appspot.com",
  messagingSenderId: "1007216711491",
  appId: "1:1007216711491:web:9f1ba14c091552499641f6"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const Timer = () => {
  const { isHost, questionId, meetingTime, setMeetingTime, onClose,closeFlag } = useContext(SkywayStoreContext);
  // 今回使う参照
  const ref = doc(db, "meetingTimes", questionId);

  //最初にミーティング終了時刻を宣言
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 60*meetingTime);

  const {
    seconds,
    minutes,
    hours,
    isRunning,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: ()=> {
    onClose();
  }});

  //質問者(isHost = 1)なら、終了時刻をCloud Firestoreに保存
  useEffect(()=>{
    if(isHost == 1){
      setDoc(ref , {
        questionId: questionId,
        meetingTime: meetingTime,
        expiryTimestamp: expiryTimestamp,
        isMeeting: true
      })
    }
  },[]);

  //closeFlag=trueなら、クラウドでもミーティングを終了したことにする
  useEffect(()=>{
    if(closeFlag){
      updateDoc(ref , {
        isMeeting: false
      })
      console.log("closeFlag is true")
    }
  },[closeFlag]);
  //ミーティング時間が変更されたとき、タイマーをセットしなおす
  useEffect(()=>{
    restart(expiryTimestamp);
    console.log(meetingTime);
  },[meetingTime]);

  //延長ボタン押下時の処理
  const onClickExtension = async () => {
    alert('ミーティングを5分延長します');
    try {
      updateDoc(ref, {
        meetingTime: meetingTime + 5,
        expiryTimestamp: expiryTimestamp
      })
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  //firestoreのミーティング時間更新時の処理
  const unsub = onSnapshot(ref, (doc) => {
    const isMeeting = doc.data().isMeeting;
    if(isMeeting){
      const newExpiryTimestamp = doc.data().expiryTimestamp;//dbのミーティング終了時刻
      const newMeetingTime = doc.data().meetingTime;
      const extension = newMeetingTime - meetingTime;
      if(extension > 0){
        setMeetingTime(newMeetingTime);
        expiryTimestamp.setSeconds(newExpiryTimestamp.getSeconds() + 60*extension);
      }
    }else{
      if(closeFlag == false){
        onClose();
      }
      
    }
});

  return (
    <div>
      <div style={{fontSize: '30px', color: '#fff'}}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <button onClick={() => {
        onClickExtension()
      }}>5分延長</button>
    </div>
  );
};

export default Timer;