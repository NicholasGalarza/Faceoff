'use strict'

import 'aframe';
import { Entity, Scene } from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

class Index extends React.Component {
   render() {
      return (
         <div>
            <Scene>
               <a-assets>
                  <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg" />
                  <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg" />
               </a-assets>

               <a-box src="https://i.imgur.com/mYmmbrp.jpg" position="10 2 -5" rotation="0 45 45" scale="2 2 2" scale-on-mouseenter="to: 2.2 2.2 2.2">
                  <a-animation width="4" height="10" attribute="position" to="10 2.2 -5" direction="alternate" dur="2000" repeat="indefinite"></a-animation>


                  <a-animation attribute="scale" begin="mouseenter" dur="300" to="2.3 2.3 2.3"></a-animation>
                  <a-animation attribute="scale" begin="mouseleave" dur="300" to="2 2 2"></a-animation>
                  <a-animation attribute="rotation" begin="click" dur="2000" to="360 405 45"></a-animation>
               </a-box>

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

ReactDOM.render(<Index />, document.getElementById('app'))