const users = require('../modules/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


exports.addUser = async (req, res) => {

    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email
    }

    // check if the user exists in the DB
    try {
        const [userData] = await users.getUserByEmail(newUser.email);
        if (userData) {
            return res.status(401).json({ message: 'user already exists in the database' })
        }
    } catch ({ message }) {
        return res.status(500).json({ message })
    }


    // hash the password and then add to DB
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

exports.edit = (req, res) => {
    const userId = res.locals.user

    const updatedDetails = {
        id: userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }

    users.edit(updatedDetails).then(() => {
        res.status(200).json({ message: 'user edited successfully', code: 200 })
    }).catch(err => {
        console.error(err)
        return res.status(500).json({ error: err.code })
    });
}

exports.login = async (req, res) => {

    const password = req.body.password;
    const email = req.body.email;


    const [userData] = await users.getUserByEmail(email);

    // check if there is a user with this credentials
    try {
        (!userData) ? res.status(404).json({ message: 'No user found' }) :

            bcrypt.compare(password, userData.password, (err, result) => {
        // if both inputs are the same, continue and add cookie
                if (result) {
                    const accessToken = generateAccessToken((userData.id).toString())
                    res.cookie('access_token', accessToken)
                    res.status(200).json({ user: userData, code: 200 })
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
        res.status(200).json({ message: 'logged out successfully', code: 200 })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err })
    }
}



const generateAccessToken = user => jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '72h' })

