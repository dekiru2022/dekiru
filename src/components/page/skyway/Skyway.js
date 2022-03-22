import Peer,{SfuRoom} from "skyway-js";
import React,{ useState, useRef, useEffect, createContext } from "react";
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, blue } from '@mui/material/colors';
import Spinner from 'react-spinkit';
import SkywayLayout from "./components/skyway_layout";
import { API } from "aws-amplify";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[800]
    },
    secondary: {
      main: red[400],
      dark: red[800]
    },
  },
});

export const SkywayStoreContext = createContext();

function Skyway(props){
  // propsからurlの値を取得
  const meetingTime = props.match.params.time;
  const roomId = props.match.params.room;
  const isHost = props.match.params.isHost; //質問者なら1, 回答者なら0

  const API_KEY = '95ba327e-64d1-4c05-8f9f-ad00ac893e07';
  const peer = new Peer({key: API_KEY});
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState();
  const [startFlag, setStartFlag] = useState(false); //通話が開始(相手の映像を取得）したらtrue
  const [closeFlag, setCloseFlag] = useState(false); //通話が終了したらtrue
  const [roomData, setRoomData] = useState({ messages: ''});
  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [userDisplay, setUserDisplay] = useState(false); //true: 画面共有
  const [userAudio, setUserAudio] = useState(true); //false: ミュート
  const [userVideo, setUserVideo] = useState(true); //false: カメラオフ
  const [isChat, setIsChat] = useState(false); //false: チャットオフ
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  // TODO
  // ・３分、１分、終了時に「解決しましたか？」→アンケートページへ
  // 常に右下に延長ボタンを追加
  
  //開始処理
  const onStart = async() => {
    //peer.joinRoom()で接続 => roomに接続相手の情報が帰ってくる
    const room = peer.joinRoom(roomId, {
      mode: 'sfu',
      stream: localStream,
    });
    setRoom(room);
    setEventListener(room);
    console.log('onStart()');
  }
  //終了処理
  const onClose = async() => {
    room.close();
  }
  const skywayStore = {
    peer, isHost, meetingTime, roomId,
    loading, setLoading,
    room, setRoom,
    startFlag, setStartFlag,
    closeFlag, setCloseFlag,
    roomData, setRoomData,
    localStream, setLocalStream,
    remoteStream, setRemoteStream,
    userDisplay, setUserDisplay,
    userAudio, setUserAudio,
    userVideo, setUserVideo,
    isChat, setIsChat,
    localVideoRef, remoteVideoRef,
    onStart, onClose
  }
  
  //カメラ映像と音声を取得skywayに接続
  useEffect(()=>{
    getAndSetUserMedia();
  },[]);
  
  useEffect(()=>{
    //一回のみ、onStart
    if(localStream && !loading){
      setTimeout(()=>{
        onStart()
        .then(setLoading(true));
      }, 3000)
    }
    //localStreamが変更されたら送信する映像を変更
    if(room && localStream){
      room.replaceStream(localStream);
    }
  },[localStream]);
  
  useEffect(()=>{
    if(startFlag){
      if(userDisplay){
        const newStream = new MediaStream;
        navigator.mediaDevices.getDisplayMedia({video: true, audio: true})
          .then( stream => {
            const displayMediaTrack = stream.getVideoTracks()[0];
            const audioTrack = localStream.getAudioTracks()[0];
            //共有終了時、画面共有の変数をfalseに
            displayMediaTrack.addEventListener('ended', () => {
              setUserDisplay(false);
            });
            newStream.addTrack(displayMediaTrack);
            newStream.addTrack(audioTrack);
            setLocalStream(newStream);
            localVideoRef.current.srcObject = newStream;
          }).catch( error => {
            console.error('mediaDevice.getDisplayMedia() error:', error);
            setUserDisplay(false);
            return;
          });
        
        }else{
          getAndSetUserMedia();
        }
      }
    }, [userDisplay]);
  
  useEffect(() => {
    if(localStream){
      var videoTrack = localStream.getVideoTracks()[0];
      var audioTrack = localStream.getAudioTracks()[0];
      videoTrack.enabled = userVideo;
      audioTrack.enabled = userAudio;
    }
  }, [userVideo, userAudio]);

  //通話開始時、skywayの認証クレデンシャルをミーティングの時間に設定...peer認証がわからない
  useEffect(() => {
    console.log(peer);
    // if(startFlag){
    //   peer.updateCredential({
    //     ttl: meetingTime
    //   })
    // }
  }, [startFlag]);
  const getAndSetUserMedia = () => {
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then( stream => {
        // 成功時にvideo要素にカメラ映像をセット
        setLocalStream(stream);
        localVideoRef.current.srcObject = stream;
      }).catch( error => {
        // 失敗時にはエラーログを出力
        console.error('mediaDevice.getUserMedia() error:', error);
        return;
      });
  }

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
    });

    //peerJoin: 誰かがroomに参加したときに発火
    room.on("peerJoin", (peerId) => {
      addMessages(`=== ${peerId} が参加しました ===`);
    });

    //stream: 相手の映像の情報
    room.on("stream", (stream) => {
      setRemoteStream(stream);
      setStartFlag(true);
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
      setCloseFlag(true);
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
      <SkywayStoreContext.Provider value={skywayStore}>
        <ThemeProvider theme={theme}>
          <SkywayLayout />
        </ThemeProvider>
      </SkywayStoreContext.Provider>

      {/* ページが読み込まれるまではローディングアイコンが表示 */}
      <Box sx={{display: (loading? 'none': 'block')}}>
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Spinner name="line-spin-fade-loader" color="gray"/>
        </Box>
      </Box>
    </div>
  );
};

export default Skyway;