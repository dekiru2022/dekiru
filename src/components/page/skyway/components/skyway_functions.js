export const sfuJoinRoom = async function(peer, roomId, localStream){
  //sfuルームに接続
  const room = peer.joinRoom(roomId, {
  mode: 'sfu',
  stream: localStream,
  });
  console.log(room);
  return room;
}

export const getExpiryTimeStamp = (meetingTime) => {
  const expiryTimestamp = new Date();
  return expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 60*meetingTime);
}