class Common {
    sanitize(params, names) {
        //there has got to be a way to get parameter names better than having to pass in a string
        var errors = [];
        //error handling if params and names is singular
        if (!params) {
            errors.push(names + ' cannot be empty');
            return errors;
        }
        for (var i = 0; i < params.length; i++) {
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
    checkToken(token, User, jwt, res) {
        try {
            var decoded = jwt.verify(token, secret);
        } catch(err) {
            return res.json({ error: err.message });
        }
        User.findOne({ where: { username: decoded.username }})
        .then(function(user) {
            if (token == user.token) {
                res.json({ status: 200 });
            } else {
                res.json({ error: 'inavlid token' });
            }
        }).catch(function(err) {
            res.json({ error: err });
        });
    }
}

module.exports = new Common();
