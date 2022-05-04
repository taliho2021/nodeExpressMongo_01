const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: {
      type: String,
      unique: true
    },
    
    password: {
      type: String,
    },

    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
      }
    ],
    date: {
      type: Date,
      default: Date.now
    }
})

// //hash the password
// userSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
// }

// // checking if password is valild
// userSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.passowrd)
// }

// pre-hook.  Before the user info is saved in db, this fxn will be called, get plain text, salt it, hash it and store it.  this refers to current doc about to be saved

// userSchema.pre("save", function (next) {                
//     const user = this

//     if (this.isModified("password") || this.isNew) {
//       bcrypt.genSalt(10, function (saltError, salt) {
//         if (saltError) {
//           return next(saltError)
//         } else {
//           bcrypt.hash(user.password, salt, function(hashError, hash) {
//             if (hashError) {
//               return next(hashError)
//             }
  
//             user.password = hash
//             next()
//           })
//         }
//       })
//     } else {
//       return next()
//     }
//   })
  
  // next() moves to the next middleware. Make the user tyring to log in has the correct credentials.

  // userSchema.methods.comparePassword = function(password, callback) {
  //   bcrypt.compare(password, this.password, function(error, isMatch) {
  //     if (error) {
  //       return callback(error)
  //     } else {
  //       callback(null, isMatch)
  //     }
  //   })
  // }

// Compile a model from the schema
module.exports=
    mongoose.model.User || mongoose.model('User', userSchema)

