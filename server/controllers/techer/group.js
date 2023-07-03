const Teacher = require('../../models/lol')



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

exports.post = async (req, res) => {
    if (req.body.data) {
        let next1 = false
        for (let i = 0; i < req.body.data.length; i++) {
            let student = await Teacher.findById(req.body.data[i]._id, {})
            if(student.attendance[0]){
                next1 = student.attendance[student.attendance.length-1].time === req.body.data[0].time
            }
        }
        if (!next1) {
            req.body.data.map(async item => {
                let student = await Teacher.findByIdAndUpdate(item._id, {
                    $push: {
                        attendance: {
                            // status: item.status,
                            time: item.time,
                            absend: Boolean(item.absend),
                            score: item.score
                        }
                    }
                })
            })
            res.json({ message: "Success", next1 })
        } else {
            res.json({ title: "Error", message: "You are already add attendance to students" })
        }
    }
}