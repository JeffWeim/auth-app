var express = require('express'),
    _ = require('lodash'),
    config = require('./config'),
    jwt = require('jsonwebtoken');

var app = module.exports = express.Router();

// TODO: This should be a database of users
var users = [{
    id: 1,
    username: 'gonto',
    password: 'gonto'
}];

function createToken(user) {
    return jwt.sign(_.omit(user, 'password'), config.secret, { expiresInMinutes: 60 * 5 });
}

function getUserScheme(req) {

    var username = null,
        type = null,
        userSearch = {};

    // The POST contains a username and not an email
    if (req.body.username) {
        username = req.body.username;
        type = 'username';
        userSearch = { username: username };
    }
    // The POST contains an email and not an username
    else if (req.body.email) {
        username = req.body.email;
        type = 'email';
        userSearch = { email: username };
    }

    return {
        username: username,
        type: type,
        userSearch: userSearch
    }
}

app.post('/users', function(req, res) { //signup

    var userScheme = null,
        profile = null;

    userScheme = getUserScheme(req);

    if (!userScheme.username || !req.body.password) {
        return res.status(400).send({ message: "You must send the username and the password" });
    }

    if (_.find(users, userScheme.userSearch)) {
        return res.status(400).send({ message: "A user with that username already exists" });
    }

    profile = _.pick(req.body, userScheme.type, 'password', 'extra');
    profile.id = _.max(users, 'id').id + 1;

    users.push(profile);

    res.status(201).send({
        id_token: createToken(profile)
    });
});

app.post('/sessions/create', function(req, res) { //login

    var userScheme = null,
        user = null;

    userScheme = getUserScheme(req);

    if (!userScheme.username || !req.body.password) {
        return res.status(400).send({ message: "You must send the username and the password" });
    }

    user = _.find(users, userScheme.userSearch);

    if (!user) {
        return res.status(401).send({ message: "The username or password don't match", user: user });
    }

    if (user.password !== req.body.password) {
        return res.status(401).send({ message: "The username or password don't match" });
    }

    res.status(201).send({
        id_token: createToken(user)
    });
});
