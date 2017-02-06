var React = require('react');

var Users = React.createClass({
    createUser: function() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if ((JSON.parse(xhr.responseText).status) === "User Created"){
                    document.getElementById('registrationStatus').innerHTML = "<small style='color:green'>User Created</small>";
                }
            } else {
                document.getElementById('registrationStatus').innerHTML = "<small style='color:red'>" 
                                                    + xhr.responseText + "</small>";
            }
        }
        xhr.open("POST", "/api/users")
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("username=" + this.state.username + "&password=" + this.state.password);
    },
    readValue: function(e) {
        this.setState({[e.target.name]: e.target.value});
    },
    viewUsers: function() {
        if (this.state.token) {
            console.log(this.state.token);
        }
    },
    render: function() {
        return (
            <div>
                <input type="text" placeholder="Username" onChange={this.readValue} name="username" />
                <input type="password" placeholder="Password" onChange={this.readValue} name="password" />
                <input type="button" onClick={this.createUser} value="Create" />
                <p id="registrationStatus"></p>
                <br />
                <input type="button" onClick={this.viewUsers} value="View All Users" />
            </div>
        );
    }
});

module.exports = Users;
