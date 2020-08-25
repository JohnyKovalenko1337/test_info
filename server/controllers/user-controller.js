const User = require('../models/users');

exports.userGet = (req, res, next) => {
    console.log(req.body);
    const username = req.body.login;
    User.findByName(username, user => {
            console.log(user);
            if (!user) {
                console.log('no user');
                return res.json({ message: "no user with this username" });
            }
            return res.json({ user: user });
        })

};

exports.signup = (req, res, next) => {
    const { login, password } = req.body;
    const user = new User(login, password)
    user.save()
    return res.status(200).json({ message: "success" });
}        