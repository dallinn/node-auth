var React = require('react');
var ReactDOM = require('react-dom');
var Auth = require('./auth.js');
var Users = require('./users.js');

ReactDOM.render(
    <div className="container">
        <div className="authentication">
            <h1>Authentication</h1>
            <p>Enter credentials to create web token, then you can view it/check if its good/destroy it</p>
            <Auth />
            <p>Wow this is a really good front end were going to hire you</p>
        </div>
        <div className="registration">
            <h2>Create a new user</h2>
            <Users />
        </div>
    </div>,
    document.getElementById('app')
)
