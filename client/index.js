'use strict'


import 'aframe';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

class Index extends React.Component {
    render() {
        return (
            <div>
                <h1>Tru is webpack king</h1>
            </div>
        )
    }
}
console.log('sadasdasdasdsaasdadsasdsaddsasadsdasd')
console.log(document.getElementById('app'))
ReactDOM.render(<Index/>, document.getElementById('app'))