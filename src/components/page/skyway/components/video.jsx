import React from "react";
import Box from '@mui/material/Box';

export default function Video(props){
  const {isReverse, stream} = props; //true: 反転（自分）, false: そのまま

  return (
    <Box sx={isReverse ? [videoStyle, reverseVideoStyle] : videoStyle}>
      <video
        width="100%"
        height="100%"
        ref={stream}
        autoPlay 
        muted={true} />
    </Box>
  );
}

const videoStyle = {
  outline: `1px solid #eee`,
  width: "100%",
  height: "100%",
  maxWidth: "100%",
  maxHeight: "100%",
  pointerEvents: "none",
};
const reverseVideoStyle = {
  transform: 'scale(-1,1)',
};
