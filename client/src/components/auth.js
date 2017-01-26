var React = require('react');

var Auth = React.createClass({
    buttonClicked: function() {
        //TODO
        var users = [];
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/users');
        xhr.send(null);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    users.push(xhr.responseText);
                } else {
                    users = 'Error: ' + xhr.status;
                }
            } 
        };
        console.log(users);
    },
    render: function() {
        return <button onClick={this.buttonClicked}>Authenticate</button>
    }
});

module.exports = Auth;
