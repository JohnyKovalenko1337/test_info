const User = require('../models/users');

exports.userGet = async (req, res, next) => {
    console.log(req.body);
    const username = req.body.login;
    const user = await User.findByName(username);

    if (!user) {
        console.log('no user');
        return res.json({ message: "no user with this username" });
    }
    return res.json({ user: user });
};

exports.signup = (req, res, next) => {
    const { login, password } = req.body;
    const user = new User(login, password)
    user.save()
    return res.status(200).json({ message: "success" });
}        