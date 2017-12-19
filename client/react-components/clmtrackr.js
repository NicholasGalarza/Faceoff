import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import FFTracker from './clm-dependencies/facial-feature-tracker';
import _ from 'lodash';

export default class ClmTrackr extends Component {
  constructor(props) {
    super(props);

    PubSub.subscribe('emotions.loop', (e, emotions) => {
      let object = _.maxBy(emotions, (o) => o.value)
      props.setBulletAttribute(object.emotion)
      window.bulletAttribute = object.emotion
    });
  }

  render() {
    return (
      <div>
        <FFTracker pubSub={PubSub} />
      </div>
    )
  }
}

