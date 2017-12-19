import React, { Component } from 'react';
import getUserMedia from 'getusermedia';
import emotionClassifier from './emotion_classifier.js';
import emotionModel from './emotionmodel.js';
import pModel from './model_pca_20_svm.js';
import clm from './clmtrackr.min.js';
import _ from 'lodash';

export default class ReactFacialFeatureTracker extends Component {

	constructor(props) {
		super(props);
		this.state = {
			emotion: { emotion: '' }
		}
		this.PubSub = props.pubSub;
	}

	componentDidMount() {
		let overlayCC = this.overlay.getContext('2d');
		let ec = new emotionClassifier();
		ec.init(emotionModel);

		let emotionData = ec.getBlank();

		getUserMedia({ video: true }, this.getUserMediaCallback.bind(this));

		let ctrack = new clm.tracker({ useWebGL: true });
		ctrack.init(pModel);
		let trackingStarted = false;

		this.trackingStarted = trackingStarted
		this.ctrack = ctrack;
		this.overlayCC = overlayCC;
		this.ec = ec;

		let self = this;
		this.video.addEventListener('canplay', (this.startEmotionListener).bind(this), false);
	}

	/* Toggle clm-trackr by hitting 'e' key */
	startEmotionListener() {
		let eToggle = 0
		function _initWatcher(event) {
			const key = String.fromCharCode(event.keyCode).toLowerCase()
			if (key === 'e' && eToggle < 1) {
				this.startVideo()
				eToggle++;
			}
		}

		function _resetWatcher(event) {
			eToggle = 0
			this.stopVideo()
		}
		window.addEventListener('keydown', _initWatcher.bind(this), false);
		window.addEventListener('keyup', _resetWatcher.bind(this), false);
	}

	stopVideo() {
		this.ctrack.stop();
		this.trackingStarted = false;
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.emotion.emotion !== nextState.emotion.emotion) {
			this.PubSub.publish('emotion.update', nextState.emotion);
			return true;
		}

		return false;
	}

	getUserMediaCallback(err, stream) {
		this.video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
		this.video.play();
	}

	startVideo() {
		this.trackingStarted = true;
		// strt video
		this.video.play();
		// start tracking
		this.ctrack.reset();
		this.ctrack.start(this.video);
		// start loop to draw face
		this.drawLoop();
	}

	drawLoop() {
		if (this.trackingStarted) {
			requestAnimationFrame((this.drawLoop).bind(this));

			let cp = this.ctrack.getCurrentParameters();

			this.overlayCC.clearRect(0, 0, 400, 300);

			if (this.ctrack.getCurrentPosition()) {
				this.ctrack.draw(this.overlay);
			}

			let er = this.ec.meanPredict(cp);

			if (er) {
				const emotion = _.maxBy(er, (o) => { return o.value; });
				this.setState({ emotion: emotion });
				this.PubSub.publish('emotions.loop', er);
			}
		}
	}

	render() {
		return (
			<div className="the-video">
				<div className="video-layer">
				<div className="video-opacity"></div>
					<video
						width="400"
						height="300"
						controls="false"
						ref={(video) => { this.video = video }} ></video>
				</div>

				<canvas
					width="400"
					height="300"
					ref={(canvas) => this.overlay = canvas}></canvas>
			</div>
		)
	}
}
