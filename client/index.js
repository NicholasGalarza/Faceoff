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
            emotion: [],
            bulletHead: "", 
            start: props.start
        }
        this.emotionHandler = this.emotionHandler.bind(this)
        this.createBullet = this.createBullet.bind(this)
        this.tick = this.tick.bind(this) 
    }

    componentDidMount(event) {
        this.timer = setInterval(this.tick, 5000)
        this.currentTime = new Date()
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    createBullet() {
        let emotion = this.state.emotion.reduce((pre, cur, i) => {
            if (cur.value === Math.max(cur.value, pre.value)) return cur
            return pre
        }, {emotion: "", value: -1}).emotion
        // const emotion = _.maxBy(er, (o) => { return o.value; });
        console.log('[bullet = ', emotion, ']', this.state)
        return emotion
    }

    tick() {
        //this.setState({ bulletHead: this.createBullet() })
        this.timer = setInterval(this.tick, 1000)
        let elapsedTime = new Date - this.state.start
        this.setState({ bulletHead: this.createBullet() })
        
        if (elapsedTime > 5000) { 
            console.log(elapsedTime )
            console.log('boom')
            this.setState({start: new Date})
            
            this.timer = setInterval(this.tick, 1000)
        }
    }

    emotionHandler(emotion) {
        this.setState({ emotion: emotion })
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
                <ClmTrackr emotionHandler={this.emotionHandler} />

                {/* <Scene>
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
                </Scene> */}
            </div>
        )
    }
}

ReactDOM.render(<Index start={Date.now()}/>, document.getElementById('app'))