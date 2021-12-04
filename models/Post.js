const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId
      },
    text: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    likes: [
      {
        user: {
          type: mongoose.Types.ObjectId
        }
      }
    ],
    comments: [
      {
        user: {
          type: mongoose.Types.ObjectId
        },
        text: {
         type: String,
         required: true
       },
       name: {
        type: String
        },
       avatar: {
         type: String
        },
       date: {
        type: Date,
        default: Date.now
        }
      }
    ],
    date: {
      type: Date,
      default: Date.now
    }
})

module.exports = mongoose.model('Post', postSchema, 'posts')