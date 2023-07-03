const Teacher = require('../../models/lol')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.index = async (req, res) => {
    let data = await Teacher.find({ status: 'teacher' })
    if (data) {
        res.json({ title: "All teacher", data })
    }
}
exports.show = async (req, res) => {
    let data = await Teacher.findById(req.params.id)
    if (data) {
        res.json({ title: "Special teacher", data })
    }
}
exports.create = async (req, res) => {
    let { firstName, lastName, email, subject, phone, password} = req.body
    if (firstName && lastName && email && subject && phone && password) {
        let user = await Teacher.find({ email: email })
        if (user.length > 0) {
            res.json({ title: "bunday email bilan foydalanuvchi allaqachon mavjud" })
        } else {
            let hash = await bcrypt.hash(password, 10)
            let DATA = await Teacher.create({ ...req.body, status: "teacher", password: hash })
            if (DATA) {
                res.json({ title: "User created", data: DATA })
            }
        }
    } else {
        res.json({ title: 'malumot toliq kiritilmagan' })
    }
}
exports.remove = async (req, res) => {
    let data = await Teacher.findByIdAndDelete(req.params.id)
    if (data) {
        res.json({ title: "Teacher removed" })
    }
}
exports.edit = async (req, res) => {
    let { firstName, lastName, email, subject, phone, password, } = req.body
    if (firstName || lastName || email || subject || phone || password) {
        let data = await Teacher.findByIdAndUpdate(req.params.id, req.body)
        if (data) {
            res.json({ title: "Teacher edited ", data })
        }
    } else {
        res.json({ title: 'malumot yoq' })
    }
}