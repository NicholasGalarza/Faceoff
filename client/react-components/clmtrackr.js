import React from 'react';
import PubSub from 'pubsub-js';
import FFTracker from './facial-feature-tracker'; 

export default class ClmTrackr extends React.Component {
	constructor(props) {
      super(props);
      this.state = {color: ''};

	  PubSub.subscribe('emotions.loop', (e,emotions) => {
		  //console.log('[Emotions Loop]', e, emotions)
		  props.emotionHandler(emotions)
	  } );
	 
	  
	}

	render() {

		return (
			<div>
                <FFTracker pubSub={PubSub} />
			</div>
		)
	}
}

