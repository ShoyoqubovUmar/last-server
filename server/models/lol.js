const { model, Schema } = require('mongoose');

module.exports = model("User", new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["admin", "teacher", "student"],
        default: "student"
    },
    info: {
        type: String
    },
    firstName: String,
    lastName: String,
    phone: Number,
    password: String,
    subject: String,
    parentsNumber:
    {
        mother: Number,
        father: Number,
    },
    totalScore: Number,
    allScore: {
        type: Number
    },
    attendance: [
        {
            status: String,
            time: String,
            reason: {
                type: Boolean,
                default: false
            },
            score: Number
        }
    ],
    group: [
        {
            title: String,
            day: {
                type: String,
                enum: ["toq", "juft"],
                default: "toq"
            },
            time: {
                type: String,
                require: true
            },
            students: [{
                type: Schema.Types.ObjectId,
                ref: "User",
            }]
        }
    ]

}))