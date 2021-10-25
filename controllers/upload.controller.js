const UserModel = require('../models/userModel')
const fs = require('fs')
const { promisify } = require('util')
const { uploadErrors } = require('../utils/errors.utils')
const pipeline = promisify(require('stream').pipeline)

module.exports.uploadProfil = async (req, res) => {
    try {
        if (req.file.detectedMimeType !== 'image/jpg' && 
        req.file.detectedMimeType !== 'image/jpeg' &&
        req.file.detectedMimeType !== 'image/png') throw Error("Invalid File")

        if (req.file.size > 5000000) throw Error("Too much big file")
    } catch (err) {
        const errors = uploadErrors(err)
        return res.status(201).json({errors})
    }

    const fileName = req.body.name+ '.jpg'

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../client2/public/upload/profil/${fileName}`
        )
    )

    try {
        UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { photo: './upload/profil/' + fileName } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs)
                else return res.status(500).json({message: err})
            }
        )
    } catch (err) {
        return res.status(500).json({message: err})
    }
}