var React = require('react');

var Auth = React.createClass({
    getInitialState: function() {
        return {
            apikey: null
        };
    },
    getApiKey: function() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (JSON.parse(xhr.responseText).token){
                    this.setState({
                        token: (JSON.parse(xhr.responseText).token)
                    });
                    document.getElementById("tokenStatus").style.backgroundColor = 'lightgreen';
                } else {
                    document.getElementById("tokenStatus").style.backgroundColor = 'red';
                }
            }
        }
        xhr.open("POST", "/api/auth")
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("username=" + this.state.username + "&password=" + this.state.password);
    },
    viewToken: function() {
        document.getElementById("token").innerHTML = this.state.token;
    },
    readValue: function(e) {
        this.setState({[e.target.name]: e.target.value});
    },
    checkApiKey: function() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if ((JSON.parse(xhr.responseText).status) === 200){
                    document.getElementById('status').innerHTML = "<small style='color:green'>good</small>";
                }
            } else {
                document.getElementById('status').innerHTML = "<small style='color:red'>bad</small>";
            }
        }
        xhr.open("PUT", "/api/auth")
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("token=" + this.state.token);
    },
    deleteApiKey: function() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if ((JSON.parse(xhr.responseText).status) === 200){
                    document.getElementById('deletestatus').innerHTML = "<small style='color:green'>good</small>";
                    document.getElementById('token').innerHTML = "undefined";
                }
            } else {
                document.getElementById('deletestatus').innerHTML = "<small style='color:red'>bad</small>";
            }
        }
        xhr.open("DELETE", "/api/auth")
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("token=" + this.state.token);
    },
    render: function() {
        return (
            <div>
                <input type="text" placeholder="Username" onChange={this.readValue} name="username" />
                <input type="password" placeholder="Password" onChange={this.readValue} name="password" />
                <input type="button" onClick={this.getApiKey} value="Authenticate" />
                <input type="button" id="tokenStatus" onClick={this.viewToken} value="View token" />
                <p id="token" style={{color: "red"}}></p>
                <input type="button" value="Check authentication key" onClick={this.checkApiKey} />
                <span id="status"></span><br/>
                <input type="button" value="Delete authentication key" onClick={this.deleteApiKey} />
                <span id="deletestatus"></span>
            </div>
        );
    }
});

module.exports = Auth;
