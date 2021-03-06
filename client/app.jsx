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
        <Scene physics>
          <a-assets>
            {/* Images & Textures */}
            <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg" crossOrigin="anonymous"/>
            <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg" crossOrigin="anonymous"/>

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
          <a-plane src="#groundTexture"
            position="0 0 0"
            rotation="-90 0 0"
            width="128"
            height="128"
            static-body="shape: auto">
          </a-plane>
          {/* <a-sky height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"></a-sky> */}

          <Entity generate-asteroids={{ mixin: "asteroid-features position", num: 15 }} />

          <Entity
            camera="userHeight: 2"
            face-watcher="empty: true"
            universal-controls="enabled: true"
            spawner={`mixin: laser; on: keyup; emote: ${this.state.bulletAttribute}`}
            jump-ability="maxJumps: 1; distance: 15;"
            kinematic-body="mass: 5"
            boundary="width: 128; depth: 128"
          >
            <Entity
              cursor="fuse: true; fuseTimeout: 500"
              position="0 0 -1"
              geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
              material="color: green; shader: flat">
            </Entity>
          </Entity>
        </Scene>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))