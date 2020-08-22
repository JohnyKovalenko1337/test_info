const User = require('../models/users');

exports.userGet = async (req, res, next) => {
    const username = req.body.username;

    const user = await User.findByName(username);

    if (!user) {
        return res.json({ message: "no user with this username" });
    }
    return res.json({ user: user });
};

exports.signup = (req, res, next) => {
    const { username, password } = req.body;
    const user = new User(username, password)
    user.save()
    return res.status(200).json({ message: "success" });
}        