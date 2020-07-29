const { message } = require('../validators/message.schema')

module.exports = async (req, res, next) => {

    try {
        const value = await message.validate(req.body)
        if (value.error) {
            res.status(403).json({ message: value.error.details[0].message })
            return;
        } else {
            next()
        }
    } catch ({ message }) {
        res.status(500).json({ message })
        return;
    }
}