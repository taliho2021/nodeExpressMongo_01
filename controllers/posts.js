const Post = require('../models/post')

exports.getPosts = (async(req, res, next) => {
    try {
        const posts = await Post.find()
        res.json(posts)
     } catch (err) {
     res.status(500).json({ message: err.message})
     }
})