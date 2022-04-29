import React, {useState, useEffect} from "react";
import Box from '@mui/material/Box';
import logo from '../../../../images/MyDEREAMS2.png';

export default function Video(props){
  const {me, stream} = props; //me  true: 自分、反転、ミュート, false: 相手
  const [isNoVideo, setIsNoVideo] = useState(false);
  //映像が無かったらマイドリのロゴを表示（未実装）
  useEffect(() => {
    if(stream.current){
      if(stream.current.srcObject){
        setIsNoVideo(!stream.current.srcObject.getVideoTracks()[0].videoTrack.enabled);
        console.log(isNoVideo);
      }
    }
  }, [stream]);
  
  return (
    <>
      {isNoVideo
      ? <Box sx={[videoStyle, noVideoStyle]} />
      :
      <Box sx={me ? [videoStyle, reverseVideoStyle] : videoStyle}>
        <video
          width="100%"
          height="100%"
          ref={stream}
          autoplay
          playsinline
          muted={me} />
      </Box>
      }
    </>
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
const noVideoStyle = {
  backgroundColor: "#000",
  backgroundImage: `url(${logo})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
}
