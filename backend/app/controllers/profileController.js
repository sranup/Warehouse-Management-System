const UserProfile = require('../models/UserProfile')

const profileController = {}

profileController.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    const path = req.file.path
    body.image = path
    UserProfile.findByIdAndUpdate({ _id: id, userId: req.user._id }, body, { new: true })
        .then((profile) => {
            res.json(profile)
        })
        .catch((err) => {
            res.json(err)
        })
}

profileController.show = (req, res) => {
    UserProfile.findOne({ userId: req.user._id })
        .then((profile) => {
            res.json(profile)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = profileController