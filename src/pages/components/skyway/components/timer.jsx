import React,{ useState, useRef, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Timer = (props) => {
  const {expiryTimestamp, roomData, onClose} = props;
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