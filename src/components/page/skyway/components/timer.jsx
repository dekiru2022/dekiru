import React,{ useContext } from "react";
import axios from 'axios';
import { SkywayStoreContext } from "../Skyway";

import { useTimer } from "react-timer-hook";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Timer = () => {
  const { questionId, meetingTime, onClose } = useContext(SkywayStoreContext);

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

  const onClickExtension = () => {
    console.log('時間延長処理の予定');
  }

  return (
    <div>
      <div style={{fontSize: '30px', color: '#fff'}}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <button onClick={() => {
        // Restarts to 5 minutes timer
        const time = new Date();
        const newExpiryTimeStamp = 'dbから取って来る終了時刻';
        //time.setSeconds(newExpiryTimeStamp);
        //restart(time)
      }}>5分延長</button>
    </div>
  );
};

export default Timer;