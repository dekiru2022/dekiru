import React,{ useState, useRef, useEffect, useContext } from "react";
import { SkywayStoreContext } from "../Skyway";

import { useTimer } from "react-timer-hook";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Timer = (props) => {
  const {onClose} = props;
  const { meetingTime } = useContext(SkywayStoreContext);
  
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

  return (
    <div>
      <div style={{fontSize: '30px', color: '#fff'}}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      {/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}
      {/* <button onClick={() => {
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 300);
        restart(time)
      }}>5分延長</button> */}
    </div>
  );
};

export default Timer;