const User = require('../models/User');
const bcrypt = require('bcrypt');
const auth = require('../auth.js');

module.exports.registerUser = (req, res) => {
    let newUser = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        isAdmin: req.body.isAdmin || false
    });

    return newUser.save()
        .then(() => res.status(201).send({ message: 'Registered successfully' }))
        .catch(err => auth.errorHandler(err, req, res));
};

module.exports.loginUser = (req, res) => {
    return User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) return res.status(404).send({ message: 'User not found' });

            const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
            if (isPasswordCorrect) {
                return res.status(200).send({ access: auth.createAccessToken(user) });
            } else {
                return res.status(401).send({ message: 'Incorrect password' });
            }
        })
        .catch(err => auth.errorHandler(err, req, res));
};