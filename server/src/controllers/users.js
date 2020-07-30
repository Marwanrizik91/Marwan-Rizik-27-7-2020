const users = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


exports.addUser = async (req, res) => {

    const newUser = { firstName, lastName, password, email } = req.body

    // hash the password and then add to DB
    // add to database
    try {
        newUser.password = await bcrypt.hash(req.body.password, 10)
        const addedUser = await users.add(newUser)
        res.status(200).json({ message: 'user added successfully', code: 200, data: addedUser })
    } catch ({ message }) {
        console.error(message)
        return res.status(500).json({ error: message })
    };

}

exports.edit = async (req, res) => {
    const userId = res.locals.user

    const updatedDetails = {
        id: userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }

    try {
        const editedUser = await users.edit(updatedDetails)
        res.status(200).json({ message: 'user edited successfully', code: 200, data: editedUser })
    } catch ({ message }) {
        console.error(err)
        return res.status(500).json({ error: message })
    }
}

exports.login = async (req, res) => {

    const password = req.body.password;
    const email = req.body.email;


    // check if there is a user with this credentials
    try {
        const userData = await users.getUserByEmail(email);
        if (!userData)
            throw new Error('email not found')
        const passwordsMatch = await bcrypt.compare(password, userData.password)
        if (!passwordsMatch)
            throw new Error('passwords do not match')

        const accessToken = generateAccessToken((userData.id).toString())
        res.cookie('access_token', accessToken)
        res.json({ data: userData, message: 'Logged successfully' })

    } catch ({ message }) {

        return res.status(500).json({ error: message })

    }

}

exports.logout = (req, res) => {

    try {
        res.clearCookie('access_token');
        res.status(200).json({ message: 'logged out successfully', code: 200 })
    } catch ({ message }) {
        console.error(err)
        res.status(500).json({ error: message })
    }
}



const generateAccessToken = user => jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '72h' })

