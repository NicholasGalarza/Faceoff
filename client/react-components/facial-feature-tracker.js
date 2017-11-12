import React from 'react';
import getUserMedia from 'getusermedia';
import emotionClassifier from './emotion_classifier.js';
import emotionModel from './emotionmodel.js';
import pModel from './model_pca_20_svm.js';
import clm from './clmtrackr.min.js';
import _ from 'lodash';

export default class ReactFacialFeatureTracker extends React.Component {

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

		getUserMedia({ video : true}, this.getUserMediaCallback.bind(this) );

		let ctrack = new clm.tracker({useWebGL : true});

		ctrack.init(pModel);

		this.ctrack = ctrack;
		this.overlayCC = overlayCC;
		this.ec = ec;

		let self = this;

		this.video.addEventListener('canplay', (this.startVideo).bind(this), false);

	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.emotion.emotion !== nextState.emotion.emotion) {
			this.PubSub.publish('emotion.update', nextState.emotion);
			return true;
		}

		return false;
	}

	getUserMediaCallback(err, stream ) {
		this.video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
		this.video.play();
	}

	startVideo(){

		// start video
		this.video.play();
		// start tracking
		this.ctrack.start(this.video);
		// start loop to draw face
		this.drawLoop();
	}

	drawLoop(){

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

	render() {
		return (
			<div className="the-video">
				<video
					width="400"
					height="300"
					controls="false"
					ref={ (video) => { this.video = video } } ></video>

				<canvas
					width="400"
					height="300"
					ref={ (canvas) => this.overlay = canvas }></canvas>

			</div>
		)
	}
}
