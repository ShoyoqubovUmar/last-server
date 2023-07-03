const Teacher = require('../../models/lol')

exports.index = async (req, res) => {
    console.log(req.user);
    let data = await Teacher.findById(req.user.id, ["group"])
    if (data) {
        res.json({ title: "All group", data })
    }
}