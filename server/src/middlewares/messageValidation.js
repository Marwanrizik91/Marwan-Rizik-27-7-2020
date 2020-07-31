const { message } = require('../validators/message.schema')

module.exports = async (req, res, next) => {

    try {
        const value = await message.validate(req.body)
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