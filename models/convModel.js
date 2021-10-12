const mongoose = require("mongoose");

const convSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        },
    },
    { timestamps: true }
);

const ConvModel = mongoose.model('conv', convSchema)

module.exports = ConvModel;