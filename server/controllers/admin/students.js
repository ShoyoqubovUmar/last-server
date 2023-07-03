const Student = require('../../models/lol')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.index = async (req, res) => {
    let data = await Student.find({
        status: 'student'
    })
    res.json({ title: "succsess", data })
}

exports.show = async (req, res) => {
    let data = await Student.findById(req.params.id)
    if (data) {
        res.json({ title: "Special student", data })
    } else {
        res.json({ title: "Special student not founded", })
    }
}
exports.create = async (req, res) => {
    let { firstName, lastName, email, phone, password, parentsNumber, } = req.body
    if (firstName && lastName && email && phone && password && parentsNumber) {
            let hash = await bcrypt.hash(password, 10)
            let data = await Student.create({ ...req.body, password: hash })
            if (data) {
                res.json({ title: "Student created", data: data })
            }
            else {
                res.json({ title: 'malumot toliq kiritilmagan' })
            }
    } else {
        res.json({ title: 'ERROR' })
    }
}
exports.remove = async (req, res) => {
    let data = await Student.findByIdAndDelete(req.params.id)
    if (data) {
        res.json({ title: "student removed", data })
    }
}
exports.edit = async (req, res) => {
    let { firstName, lastName, email, subject, phone, parentsNumber, password } = req.body
    if (firstName || lastName || email || subject || phone || password || parentsNumber) {
        let data = await Student.findByIdAndUpdate(req.params.id, req.body)
        if (data) {
            res.json({ title: "Student edited ", data })
        }
    } else {
        res.json({ title: 'malumot yoq' })
    }
}
exports.addStudentToGroup = async (req, res) => {
    let { idTeacher, idGroup, idStudent } = req.query
    if (idTeacher && idGroup && idStudent) {

        let teacher = await Student.findById(idTeacher)
        if (!teacher) {
            res.json({ title: "teacher not found" })
        } else {
            let student = await Student.findById(idTeacher, { group: { $elemMatch: { _id: idGroup } } })
            let lol = student.group[0].students.filter(elem => elem == idStudent)
            if (lol.length > 0) {
                res.json({ title: "bunday oquvchi mavjud" })
            } else {
                let group = await Student.findOneAndUpdate(
                    {
                        _id: idTeacher,
                        "group._id": idGroup
                    },
                    {
                        $push: {
                            "group.$.students": idStudent
                        }
                    })
                res.json({ title: "success", group })
            }
        }
    } else {
        res.json({ title: "DATA is not defined" })
    }
}
exports.removeStudentFromGroup = async (req, res) => {
    let { idTeacher, idGroup, idStudent } = req.query
    if (idTeacher && idGroup && idStudent) {
        let group = await Student.findOneAndUpdate(
            {
                _id: idTeacher,
                "group._id": idGroup
            },
            {
                $pull: {
                    "group.$.students": idStudent
                }
            })
        res.json({ title: "success", group })
    } else {
        res.json({ title: "DATA is not defined" })
    }
}