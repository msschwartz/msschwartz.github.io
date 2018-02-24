window.onload = function() {
  setBlinds(25, 50);
  setTime(10 * 60);

  cast.receiver.logger.setLevelValue(0);
  window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
  console.log('Starting Receiver Manager');

  // handler for the 'ready' event
  castReceiverManager.onReady = function(event) {
    console.log('Received Ready event: ' + JSON.stringify(event.data));
    window.castReceiverManager.setApplicationState('Application status is ready...');
  };
  // handler for 'senderconnected' event
  castReceiverManager.onSenderConnected = function(event) {
    console.log('Received Sender Connected event: ' + event.data);
    console.log(window.castReceiverManager.getSender(event.data).userAgent);
  };

  // handler for 'senderdisconnected' event
  castReceiverManager.onSenderDisconnected = function(event) {
    console.log('Received Sender Disconnected event: ' + event.data);
    if (window.castReceiverManager.getSenders().length == 0) {
      window.close();
    }
  };

  // handler for 'systemvolumechanged' event
  castReceiverManager.onSystemVolumeChanged = function(event) {
    console.log('Received System Volume Changed event: ' + event.data['level'] + ' ' + event.data['muted']);
  };

  // create a CastMessageBus to handle messages for a custom namespace
  window.messageBus = window.castReceiverManager.getCastMessageBus('urn:x-cast:com.google.cast.sample.helloworld');
  
  // handler for the CastMessageBus message event
  window.messageBus.onMessage = function(event) {
    console.log('Message [' + event.senderId + ']: ' + event.data);
    
    // display the message from the sender
    handleMessage(event.data);
    
    // inform all senders on the CastMessageBus of the incoming message event
    // sender message listener will be invoked
    window.messageBus.send(event.senderId, event.data);
  }

  // initialize the CastReceiverManager with an application status message
  window.castReceiverManager.start({statusText: 'Application is starting'});
  console.log('Receiver Manager started');
};

// utility function to display the text message in the input field
function handleMessage(message) {
  console.log(message);
  if (message.startsWith('setTime:')) {
    var parts = message.split(':');
    setTime(parseInt(parts[1]));
  }
  if (message.startsWith('setBlinds:')) {
    var parts = message.split(':');
  }
  if (message.startsWith('stopTimer')) {
    stopTimer();
  }
  if (message.startsWith('startTimer')) {
    startTimer();
  }
};

var blinds = {
  low: 0,
  high: 0
};
function setBlinds(low, high) {
  blinds.low = low;
  blinds.high = high;
  document.querySelector('#blinds').textContent = blinds.low + "/" + blinds.high;
}

var curTime = 0;
function setTime(newTime) {
  curTime = newTime;
  updateTimeDisplay();
}

var timer = null;
function startTimer() {
    clearInterval(timer);
    timer = setInterval(function () {
      if (--curTime < 0) {
        curTime = 0;
        clearInterval(timer);
        timer = null;
        playAlarm();
      }
      updateTimeDisplay();
    }, 1000);
}

function stopTimer() {
  if (timer) {
    clearInterval(timer);
  } else {
    startTimer();
  }
}

function updateTimeDisplay() {
  minutes = parseInt(curTime / 60, 10)
  seconds = parseInt(curTime % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  document.querySelector('#time').textContent = minutes + ":" + seconds;
}


var alarm = new Audio("/assets/alarm.mp3");
function playAlarm() {
  alarm.play();
}
