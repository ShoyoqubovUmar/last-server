const Teacher = require('../../models/lol')

exports.index = async (req, res) => {
    try {
        let data = await Teacher.find({ status: 'teacher' })
        if (data) {
            res.json({ title: "All group", data: data.group })
        }
    } catch (e) {
        res.json({ title: "ERROR", e })
    }
}

exports.indexAll = async (req, res) => {
    try {
        let { idTeacher } = req.query
        console.log(idTeacher);
        if (!idTeacher) {
            res.json("techer id is not available")
        } else {
            let data = await Teacher.findById(idTeacher, ["group"])
            if (data) {
                res.json({ title: "Teacher`s All group", data })
            }
        }
    } catch (e) {
        res.json({ title: "ERROR", e })
    }
}
exports.show = async (req, res) => {
    let data = await Teacher.findById(req.query.idTeacher).select({ group: { $elemMatch: { _id: req.params.id } } })
    if (data) {
        let arr = []
            for (let i = 0; i < data.group[0].students.length; i++) {
                const newData = await Teacher.findById(data.group[0].students[i])
                arr.push(newData)
            }
            res.json({ title: "Special group students", students: arr })
    }else{
        res.json({title: 'error'})
    }
}
exports.create = async (req, res) => {
    let { title, day, time } = req.body
    let { idTeacher } = req.query
    try {
        if (title && day && time) {
            console.log(title, day, time, idTeacher);

            let data = await Teacher.findByIdAndUpdate(idTeacher, { $push: { group: req.body } })
            if (data) {
                res.json({ title: 'Group added to teacher', data })
            } else {
                res.json({ title: 'xatolik !!!' })
            }
        } else {
            res.json({ title: 'malumot toliq kiritilmagan' })
        }
    } catch (e) {
        res.json({ title: 'err', e })
    }
}
exports.remove = async (req, res) => {
    if (req.query.idTeacher && req.query.idGroup) {
        let data = await Teacher.findByIdAndUpdate(req.query.idTeacher, { $pull: { group: { _id: req.query.idGroup } } })
        if (data) {
            res.json({ title: "Group deleted", data })
        }
    } else {
        res.json({ title: "ERROR", desc: "bunday oqtivuchi mavjud emas" })
    }
}
exports.edit = async (req, res) => {
    let { title, day, time } = req.body
    let { idGroup, idTeacher } = req.query
    if (idTeacher && idGroup) {
        if (title || day || time) {
            let data = await Teacher.findOneAndUpdate(
                {
                    _id: idTeacher,
                    "group._id": idGroup
                },
                {
                    $set: {
                        "group.$": { 
                            ...req.body,
                            _id: idGroup 
                        }
                    }
                }
            )
            res.json({ title: "Group Updated", data })
        } else {
            res.json({ title: "ERROR", desc: "bunday oqtivuchi mavjud emas" })
        }
    }
}