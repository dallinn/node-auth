var React = require('react');
var ReactDOM = require('react-dom');
var Auth = require('./auth.js');

ReactDOM.render(
    <div>
        <h1>Hello, world!</h1>
        <Auth />
        <p>Wow this is a really good front end were going to hire you</p>
    </div>,
    document.getElementById('app')
)
