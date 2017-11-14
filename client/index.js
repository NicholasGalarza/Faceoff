'use strict'

import 'aframe';
import ClmTrackr from './react-components/clmtrackr.js'
import { Entity, Scene } from 'aframe-react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { setInterval } from 'timers';
import _ from 'lodash'
const EMOTION_RANGE = ['HAPPY', 'SAD', "ANGRY", "SURPRISED"]

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
        this.setState({bulletAttribute: emotion})
    }

    generateLinearRow(startingPoint, limit) {
        let row = [], right = 0;
        const color = ["red", "green", "black", "blue", "yellow"]
        for (let i = 0; i <= limit; i++) {
            row.push(
                <a-box key={i} color={color[i % 5]} position={`${startingPoint} 2 -5`} rotation="0 45 45" scale="2 2 2" scale-on-mouseenter="to: 2.2 2.2 2.2">
                    <a-animation width="4" height="10" attribute="position" to={`${startingPoint} 2.2 -5`} direction="alternate" dur="2000" repeat="indefinite"></a-animation>
                    <a-animation attribute="scale" begin="mouseenter" dur="300" to="2.3 2.3 2.3"></a-animation>
                    <a-animation attribute="scale" begin="mouseleave" dur="300" to="2 2 2"></a-animation>
                    <a-animation attribute="rotation" begin="click" dur="2000" to="360 405 45"></a-animation>
                </a-box>
            )
            startingPoint += i + 8;
        }
        return row
    }

    render() {
        return (
            <div>
                <ClmTrackr setBulletAttribute={this.setBulletAttribute}/>

                <Scene>
                    <a-assets>
                        <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg" />
                        <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg" />
                    </a-assets>

                    {this.generateLinearRow(-17, 6)}

                    <a-plane position="0 .1 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
                    <a-sky height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"></a-sky>
                    <a-circle src="#groundTexture" rotation="-90 0 0" radius="32"></a-circle>
                    <a-camera>
                        <a-cursor></a-cursor>
                    </a-camera>
                </Scene>
            </div>
        )
    }
}

ReactDOM.render(<Index/>, document.getElementById('app'))