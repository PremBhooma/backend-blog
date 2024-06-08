const mongoose = require("mongoose")
const moment = require("moment");

const commentScheme = new mongoose.Schema({
    text: { type: String, required: true },
    author_name: { type: String },
    author_email: { type: String },
    blog_id: { type: String },
    postDate: { type: String, default: moment().format("DD/MM/YYYY") },
    postTime: { type: String, default: moment().format("HH:mm") }
}, {
    timestamps: true
})

const CommentModel = mongoose.model("Comment", commentScheme)

module.exports = {
    CommentModel
}