'use strict'
import 'aframe'
import 'aframe-extras'
import 'aframe-physics-system'
import './aframe-components/face-watcher.js'
import './aframe-components/generate-asteroids.js'
import ClmTrackr from './react-components/clmtrackr.js'
import { Entity, Scene } from 'aframe-react'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bulletAttribute: ""
    }
    this.setBulletAttribute = this.setBulletAttribute.bind(this);
  }

  componentDidMount(event) {
    this.currentTime = new Date()
  }

  setBulletAttribute(emotion) {
    this.setState({ bulletAttribute: emotion })
  }

  render() {

    return (
      <div>
        <ClmTrackr setBulletAttribute={this.setBulletAttribute} />
        <Scene>
          <a-assets>
            {/* Images & Textures */}
            <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg" />
            <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg" />

            {/* All of my mixins */}
            <a-mixin id='shape' geometery="primitive: box; width: 4; height: 4; depth: 4"></a-mixin>
            <a-mixin id="position" random-spherical-position="radius: 40; startX: 0; lengthX: 360; startY: 0; lengthY: 360" random-rotation random-position="min: -43 15 -43; max: 43 60 43"></a-mixin>

          </a-assets>

          <a-plane position="0 .1 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
          <a-sky height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"></a-sky>
          <a-circle src="#groundTexture" rotation="-90 0 0" radius="32"></a-circle>

          <a-entity generate-asteroids="mixin: shape position; num: 10;"></a-entity>
          <a-entity geometry="primitive: box" material="color: red"></a-entity>
          <a-camera face-watcher >
            <a-cursor></a-cursor>
          </a-camera>
        </Scene>
      </div>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app'))