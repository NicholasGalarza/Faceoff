import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ClmTrackr from './react-components/clmtrackr.jsx'
import { Entity, Scene } from 'aframe-react'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bulletAttribute: ""
    }
    this.setBulletAttribute = this.setBulletAttribute.bind(this);
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

            {/* All mixin properties */}
            <a-mixin id="asteroid-features"
              geometry="primitive: sphere; radius: 4; segmentsWidth: 18; segmentsHeight: 36">
            </a-mixin>
            <a-mixin id="position"
              random-spherical-position="radius: 40; startX: 0; lengthX: 360; startY: 0; lengthY: 360"
              random-rotation="min: 0; max: 360"
              random-position="min: -43 15 -43; max: 43 60 43">
            </a-mixin>
            <a-mixin id="laser"
              geometry="primitive: cylinder; height: 2; radius: 0.5"
              material="color: red; metalness: 0.2; opacity: 0.4; roughness: 0.3; side: double"
              rotation="90 0 0"
              projectile={`speed: -0.15; target: ${this.state.bulletAttribute}; destroy: asteroid`}>
            </a-mixin>
          </a-assets>
          {/* Buisness logic */}
          <a-plane position="0 .1 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
          {/* <a-sky height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"></a-sky> */}
          <a-circle src="#groundTexture" rotation="-90 0 0" radius="32"></a-circle>

          <Entity generate-asteroids={{ mixin: "asteroid-features position", num: 15 }} />

          <a-camera face-watcher="empty: true"
            spawner="mixin: laser; on: keyup">
            <a-cursor></a-cursor>
          </a-camera>
        </Scene>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))