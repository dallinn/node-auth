class Common {
    sanitize(params, names) {
        //there has got to be a way to get parameter names better than having to pass in a string
        var errors = [];
        for (var i = 0; i < params.length; i++) {
            console.log(params[i]);
            if (!params[i]) {
                errors.push(names[i] + ' cannot be empty');
                return errors;
            }
            if (params[i].indexOf(' ') >= 0) errors.push(names[i] + ' cannot contain spaces');
            if (!names[i] == 'password' || !names[i] == 'token') {
                if (!/^[a-z0-9]+$/i.test(params[i])) errors.push(names[i] + ' can only contain letters and numbers');
            }
        }
        return errors;
    }
}

module.exports = new Common();
