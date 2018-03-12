var BUFFER_WIDTH = 10;
var CHUNK_SIZE = Math.pow(2, 20) * 5; // 5 MB
var BUFFER_POLL_FREQ = 1000; // 1 second

function getBufferEndTime(sourceBuffer) {
  return sourceBuffer.buffered.end(sourceBuffer.buffered.length - 1);
}

function getChunk(uint8array, idx) {
  return uint8array.slice(
    idx * CHUNK_SIZE,
    Math.min(uint8array.length, idx * CHUNK_SIZE + CHUNK_SIZE)
  );
}

function init(scope, cast) {
  console.log('-----RECEIVER INIT');
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
    scope.allSegments = null;

    /**
     * Loads the video and kicks off the processing.
     */
    scope.mediaSource.addEventListener('sourceopen', function () {
      scope.sourceBuffer = scope.mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42c01e"');

      scope.sourceBuffer.addEventListener('updateend', function () {
        scope.sourceBuffer.timestampOffset = getBufferEndTime(scope.sourceBuffer);
      });

      fileDownload(scope, data.data.media.contentId);
    });
  });

  // Start the receiver SDK.
  console.log('Application is ready, starting system');
  scope.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
  scope.castReceiverManager.onSenderDisconnected = function (event) {
    console.log('sender disconnected');
    if (scope.castReceiverManager.getSenders().length === 0 &&
      event.reason === cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
      scope.close();
    }
  };
  scope.castReceiverManager.start();
}

// When video data is ready, append the video source buffer
// @param {arrayBuffer} ArrayBuffer with video segments.
function onLoad(scope, arrayBuffer) {
  if (!arrayBuffer) {
    scope.video.src = null;
    return;
  }
  scope.uint8array = new Uint8Array(arrayBuffer); // eslint-disable-line no-undef
  scope.chunkIndex = 0;
  scope.sourceBuffer.appendBuffer(getChunk(scope.uint8array, 0));
  processNextSegment(scope);
}

// Processes the next video segment for the video.
function processNextSegment(scope) {
  // Wait for the source buffer to be updated
  if (!scope.sourceBuffer.updating && scope.sourceBuffer.buffered.length > 0) {
    var bufferRemaining =
      getBufferEndTime(scope.sourceBuffer) - scope.video.currentTime;

    console.log('-----processNextSegment', bufferRemaining);

    // Only push a new fragment if we are not updating and we have
    // less than BUFFER_WIDTH seconds in the pipeline
    if (bufferRemaining < BUFFER_WIDTH) {
      scope.chunkIndex += 1;
      if (scope.chunkIndex * CHUNK_SIZE >= scope.uint8array.length) {
        scope.chunkIndex = 0;
      }
      console.log('-----appendBuffer', scope.chunkIndex);
      scope.sourceBuffer.appendBuffer(
        getChunk(scope.uint8array, scope.chunkIndex)
      );
    }
    // Start playing the video
    if (scope.video.paused) {
      scope.video.play();
    }
  }
  setTimeout(processNextSegment.bind(null, scope), BUFFER_POLL_FREQ);
}

// Sends the xhr request to download the video.
function fileDownload(scope, url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.send();
  xhr.onload = function (e) {
    if (xhr.status !== 200) {
      console.log('-----fileDownload error', e);
      onLoad(scope);
      return;
    }
    onLoad(scope, xhr.response);
  };
  xhr.onerror = function (e) {
    console.log('-----fileDownload error', e);
    scope.video.src = null;
  };
}

window.onload = function () {
  init(window, cast); // eslint-disable-line no-undef
};
