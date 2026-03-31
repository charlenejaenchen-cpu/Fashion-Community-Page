import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
    slug: { type: String, unique: true, lowercase: true},       //required adden
    title: { type: String, unique: true, required: true },
    author: { type: String, unique: true, required: true },
    article: { type: String, required: true },
    date: { type: Date },
    Image: { type: String },
})

const Article = mongoose.model('Article', articleSchema)

export default Article