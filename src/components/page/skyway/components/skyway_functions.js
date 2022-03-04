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

//チャットに変更があったとき、stateを更新する処理(setStateではうまく動かない)
// export const addMessages = (text) => {
//   roomData.messages += (text+ '\n');
//   let data = Object.assign({}, roomData);
//   setRoomData(data);
//   messages += (text+ '\n');
//   setMessages(messages);
// }