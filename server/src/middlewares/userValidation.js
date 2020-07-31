const { addUser, editUser } = require('../validators/user.schema')

const addUserValidation = async (req, res, next) => {

    try {
        const value = await addUser.validate(req.body)
        if (value.error) {
            res.status(400).json({ error: value.error.details[0].message })
            return;
        } else {
            next()
        }
    } catch ({ message }) {
        res.status(500).json({ error: message })
        return;
    }
}

const editUserValidation = async (req, res, next) => {
    try {
        const value = await editUser.validate(req.body)
        if (value.error) {
            res.status(400).json({ error: value.error.details[0].message })
            return;
        } else {
            next()
        }
    } catch ({ message }) {
        res.status(500).json({ error: message })
        return;
    }
}

module.exports = {
    addUserValidation,
    editUserValidation
}