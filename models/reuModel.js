const mongoose = require("mongoose");

const reunionSchema = new mongoose.Schema(
    {
        organisateurId : {
            type: String
        },
        participant: {
            type: [
                {
                    membre: String,
                    accept: Boolean
                }
            ],
        },
        nom: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        date:{
            type: Date
        },
    },
    {
        timestamps: true
    }
)

const ReunionModel = mongoose.model('reunion', reunionSchema)

module.exports = ReunionModel;