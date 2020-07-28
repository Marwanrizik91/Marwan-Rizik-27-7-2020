const users = require('../modules/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


exports.addUser = (req, res) => {

    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email
    }

    bcrypt.hash(req.body.password, 10, (err, hash) => {

        newUser.password = hash;

        // add to database
        users.add(newUser)
            .then(() => {
                res.status(200).json({ message: 'user added successfully', code: 200 })
            })
            .catch(err => {
                console.error(err)
                return res.status(500).json({ error: err.code })
            });
    });
}

exports.login = async (req, res) => {

    const password = req.body.password;
    const email = req.body.email;


    const [userData] = await users.getUserByEmail(email);


    try {

        (!userData) ? res.status(404).json({ message: 'No user found' }) :

            bcrypt.compare(password, userData.password,  (err, result) => {

                if (result) {
                    const accessToken = generateAccessToken((userData.id).toString())
                    res.cookie('access_token', accessToken)
                    res.status(200).json({ user: userData[0], code: 200 })
                    res.end()

                } else {
                    res.status(404).json({ message: 'Your username or password seems to be incorrect' });
                }
            })

    } catch {

        return res.status(500).json({ error: "Error Occurred" })

    }

}

exports.logout = (req, res) => {

    try {
        res.clearCookie('access_token');
        res.status(200).json({ code: 200 })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err })
    }
}



const generateAccessToken = user => jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '72h' })

