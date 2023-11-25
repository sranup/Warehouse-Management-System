const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userProfileSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    profileUrl: {
        type: String
    },
    image: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})

const UserProfile = mongoose.model('UserProfile', userProfileSchema)
module.exports = UserProfile