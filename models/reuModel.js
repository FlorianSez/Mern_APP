const mongoose = require("mongoose");

const reunionSchema = new mongoose.Schema(
    {
        organisateurId : {
            type: String
        },
        participant: {
            type: [],
            required : true
        },
        nom: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        /*date:{
            type: Date
        },
        heure: {
            type: cloc
        }*/
        accept: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const ReunionModel = mongoose.model('reunion', reunionSchema)

module.exports = ReunionModel;