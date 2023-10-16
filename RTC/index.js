function startup() {
  connectButton = document.getElementById('connectButton');
  disconnectButton = document.getElementById('disconnectButton');
  sendButton = document.getElementById('sendButton');
  messageInputBox = document.getElementById('message');
  receiveBox = document.getElementById('receivebox');

  // Set event listeners for user interface widgets

  connectButton.addEventListener('click', connectPeers, false);
  disconnectButton.addEventListener('click', disconnectPeers, false);
  sendButton.addEventListener('click', sendMessage, false);
}

localConnection = new RTCPeerConnection();

sendChannel = localConnection.createDataChannel("sendChannel");
sendChannel.onopen = handleSendChannelStatusChange;
sendChannel.onclose = handleSendChannelStatusChange;


remoteConnection = new RTCPeerConnection();
remoteConnection.ondatachannel = receiveChannelCallback;