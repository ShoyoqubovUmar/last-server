const Student = require('../../models/lol')
const jwt = require('jsonwebtoken')

exports.index = async (req, res) => {
    let data = await Student.find({}).sort({ score: -1 }).limit(3)
    res.json(data)
}
exports.profileSt = async (req, res) => {
    jwt.verify(req.headers.authorization, 'Key', async function (err, decoded) {
        if (err) {
            res.json(err)
        } else if (decoded) {
            let data = await Student.findById(decoded.id)
            if (data) {
                res.json({ title: "Your profile", data })
            }
        }
    });
}