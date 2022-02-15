import React,{ useState, useRef, useEffect } from "react";
import Box from '@mui/material/Box';

const Video = (props) => {
  const {stream} = props;
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch((e) => console.log(e));
    }
  }, [stream]);

  return <video width="100%" ref={videoRef} playsInline autoPlay></video>;
};

export default Video;