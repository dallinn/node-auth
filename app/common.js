class Common {
    sanitize(param, name, res) {
        var error = [];
        if (!param) error.push(name + ' cannot be empty');
        if (param.indexOf(' ') >= 0) error.push(name + ' cannot contain spaces');
        if (name != 'password') {
            if (!/^[a-z0-9]+$/i.test(param)) error.push(name + ' can only contain letters and numbers');
        }
        return error;
    }
}

module.exports = new Common();
