
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ClmTrackr extends Component {

  componentDidMount() {
    var vid = document.getElementById('videoel');
    var vid_width = vid.width;
    var vid_height = vid.height;
    var overlay = document.getElementById('overlay');
    var overlayCC = overlay.getContext('2d');

    /********** check and set up video/webcam **********/

    function adjustVideoProportions() {
      // resize overlay and video if proportions are different
      // keep same height, just change width
      var proportion = vid.videoWidth / vid.videoHeight;
      vid_width = Math.round(vid_height * proportion);
      vid.width = vid_width;
      overlay.width = vid_width;
    }

    function gumSuccess(stream) {
      // add camera stream if getUserMedia succeeded
      if ("srcObject" in vid) {
        vid.srcObject = stream;
      } else {
        vid.src = (window.URL && window.URL.createObjectURL(stream));
      }
      vid.onloadedmetadata = function () {
        adjustVideoProportions();
        vid.play();
      }
      vid.onresize = function () {
        adjustVideoProportions();
        if (trackingStarted) {
          ctrack.stop();
          ctrack.reset();
          ctrack.start(vid);
        }
      }
    }

    function gumFail() {
      alert("There was some problem trying to fetch video from your webcam. If you have a webcam, please make sure to accept when the browser asks for access to your webcam.");
    }

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

    // check for camerasupport
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(gumSuccess).catch(gumFail);
    } else if (navigator.getUserMedia) {
      navigator.getUserMedia({ video: true }, gumSuccess, gumFail);
    } else {
      alert("This demo depends on getUserMedia, which your browser does not seem to support. :(");
    }

    vid.addEventListener('canplay', startEmotionListener, false);

    /*********** setup of emotion detection *************/

    // set eigenvector 9 and 11 to not be regularized. This is to better detect motion of the eyebrows
    pModel.shapeModel.nonRegularizedVectors.push(9);
    pModel.shapeModel.nonRegularizedVectors.push(11);

    var ctrack = new clm.tracker({ useWebGL: true });
    ctrack.init(pModel);
    var trackingStarted = false;

    var startEmotionListener = function () {
      let eToggle = 0
      function _initWatcher(event) {
        const key = String.fromCharCode(event.keyCode).toLowerCase()
        if (key === 'e' && eToggle < 1) {
          startVideo()
          eToggle++;
        }
      }

      function _resetWatcher(event) {
        eToggle = 0
        stopVideo()
        var cp = ctrack.getCurrentParameters();
        var finalVal = ec.meanPredict(cp)
        console.log('DESIRED VALUE', finalVal)
      }

      var charElement = document.getElementById("clm-emotion");
      charElement.addEventListener('keydown', _initWatcher, false);
      charElement.addEventListener('keyup', _resetWatcher, false);
    }

    function stopVideo() {
      ctrack.stop();
      trackingStarted = false;
    }

    window.addEventListener("load", startEmotionListener, false);

    function startVideo() {
      // start video
      vid.play();
      // start tracking
      ctrack.reset();
      ctrack.start(vid);
      trackingStarted = true;
      // start loop to draw face
      drawLoop();
    }

    function drawLoop() {
      if (trackingStarted) {
        requestAnimFrame(drawLoop);
        overlayCC.clearRect(0, 0, vid_width, vid_height);
        //psrElement.innerHTML = "score :" + ctrack.getScore().toFixed(4);
        if (ctrack.getCurrentPosition()) {
          ctrack.draw(overlay);
        }
        var cp = ctrack.getCurrentParameters();

        var er = ec.meanPredict(cp);
        console.log("EMOTION LEVEL", er)
        if (er) {
          for (var i = 0; i < er.length; i++) {
            if (er[i].value > 0.4) {
              document.getElementById('icon' + (i + 1)).style.visibility = 'visible';
            } else {
              document.getElementById('icon' + (i + 1)).style.visibility = 'hidden';
            }
          }
        }
      }
    }

    delete emotionModel['disgusted'];
    delete emotionModel['fear'];
    var ec = new emotionClassifier();
    ec.init(emotionModel);
    var emotionData = ec.getBlank();
  }

  render() {
  
    return (
      <div>

        <div id="clm-emotion">
          <script src="./utils.js" async></script>
          <script src="./clmtrackr.min.js" async></script>
          <script src="./model_pca_20_svm.js" async></script>
          <script src="./emotion_classifier.js" async></script>
          <script src="./emotionmodel.js" async></script>
          <div id="content">
            <h2>Emotion Detection</h2>
            <div id="container">
              <video id="videoel" width="400" height="300" preload="auto" loop playsInline autoPlay>
              </video>
              <canvas id="overlay" width="400" height="300"></canvas>
            </div>
            <div id="emotion_container">
              <div id="emotion_icons">
                <img className="emotion_icon" id="icon1" src="./media/icon_angry.png" />
                <img className="emotion_icon" id="icon2" src="./media/icon_sad.png" />
                <img className="emotion_icon" id="icon3" src="./media/icon_surprised.png" />
                <img className="emotion_icon" id="icon4" src="./media/icon_happy.png" />
              </div>
              <div id='emotion_chart'></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
