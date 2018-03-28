var BUFFER_WIDTH = 15; // 15 seconds
var CHUNK_SIZE = Math.pow(2, 20) * 10; // 10 MB
var BUFFER_POLL_FREQ = 1000; // 1 second

function getBufferEndTime(scope) {
  return scope.sourceBuffer.buffered.end(0);
}

function getChunk(scope, idx) {
  console.log('ℹ️  getChunk', idx);
  var rangeStart = idx * CHUNK_SIZE;
  var rangeEnd = rangeStart + CHUNK_SIZE - 1;

  // if we've hit the end of the stream, adjust range and reset index to 0
  if (scope.rangeMax && rangeEnd >= scope.rangeMax) {
    rangeEnd = scope.rangeMax;
    scope.chunkIndex = 0; // next getChunk will start at beginning of stream
    scope.resetTimestamp = true;
  } else {
    // otherwise, increment next chunkIndex
    scope.chunkIndex = idx + 1;
  }
  var xhr = new XMLHttpRequest();
  var url = scope.mediaUrl;
  console.log('ℹ️  GET', url);
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.setRequestHeader('Range', 'bytes=' + rangeStart + '-' + rangeEnd);
  xhr.send();
  xhr.onload = function (e) {
    if (xhr.status !== 206) {
      console.log('❌  getChunk error', e);
      return;
    }
    if (!scope.rangeMax) {
      scope.rangeMax = parseInt(
        xhr.getResponseHeader('Content-Range').split('/')[1],
        10
      );
    }
    scope.sourceBuffer.appendBuffer(xhr.response);
    setTimeout(processNextSegment.bind(null, scope), BUFFER_POLL_FREQ);
  };
  xhr.onerror = function (e) {
    console.log('❌  getChunk error', e);
    scope.video.src = null;
  };
}

function init(scope, cast) {
  console.log('-----RECEIVER INIT');
  scope.loopCount = 0;

  // Turn on debugging so that you can see what is going on.  Please turn this off
  // on your production receivers to improve performance.
  cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG);

  scope.video = document.getElementById('vid');

  // Create the media manager. This will handle all media messages by default.
  scope.mediaManager = new cast.receiver.MediaManager(scope.video);

  scope.mediaManager.addEventListener('load', function (data) {
    console.log('-----MEDIAMANAGER LOAD');
    // Use MSE with the media element.
    scope.mediaSource = new MediaSource();
    scope.video.src = scope.URL.createObjectURL(scope.mediaSource);
    scope.mediaUrl = data.data.media.contentId;

    /**
     * Loads the video and kicks off the processing.
     */
    scope.mediaSource.addEventListener('sourceopen', function (args) {
      console.log('ℹ️  sourceopen', args);

      scope.sourceBuffer = scope.mediaSource.addSourceBuffer(
        'video/mp4; codecs="avc1.4D401E"'
      );

      scope.sourceBuffer.addEventListener('updateend', function () {
        if (!scope.duration) {
          // save initial duration, as it increases after the 1st loop
          scope.duration = scope.mediaSource.duration;
        }
        var bufferEndTime = getBufferEndTime(scope);

        if (scope.resetTimestamp) {
          console.log('ℹ️  timestamp reset');
          scope.sourceBuffer.timestampOffset = bufferEndTime;
          scope.resetTimestamp = false;
        }
      });

      startBuffering(scope);
    });
  });

  // Start the receiver SDK.
  console.log('Application is ready, starting system');
  scope.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
  scope.castReceiverManager.onSenderDisconnected = function (event) {
    console.log('sender disconnected');
    if (
      scope.castReceiverManager.getSenders().length === 0 &&
      event.reason === cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER
    ) {
      scope.close();
    }
  };
  scope.castReceiverManager.start();
}

// start loading data from server into video buffer
function startBuffering(scope) {
  console.log('ℹ️  startBuffer');
  scope.chunkIndex = 0;
  getChunk(scope, 0);
}

// Processes the next video segment for the video.
function processNextSegment(scope) {
  // Wait for the source buffer to be updated
  if (!scope.sourceBuffer.updating && scope.sourceBuffer.buffered.length > 0) {
    var bufferEndTime = getBufferEndTime(scope);
    var bufferRemaining = bufferEndTime - scope.video.currentTime;

    console.log('-----processNextSegment', bufferRemaining);

    // Only push a new fragment if we are not updating and we have
    // less than BUFFER_WIDTH seconds in the pipeline
    if (bufferRemaining < BUFFER_WIDTH) {
      getChunk(scope, scope.chunkIndex);
      return;
    }
    // Start playing the video
    if (scope.video.paused) {
      scope.video.play();
    }
  }
  setTimeout(processNextSegment.bind(null, scope), BUFFER_POLL_FREQ);
}

window.onload = function () {
  init(window, cast); // eslint-disable-line no-undef
};
