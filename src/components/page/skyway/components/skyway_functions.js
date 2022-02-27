export const sfuJoinRoom = async function(peer, roomId, localStream){
  //sfuルームに接続
  const room = peer.joinRoom(roomId, {
  mode: 'sfu',
  stream: localStream,
  });
  return room;
}