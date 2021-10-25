const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 20
        },
        prenom: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 20
        },
        poste: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            index: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        photo: {
            type: String,
            default: './upload/profil/random-user.png'
        },
        conv: {
            type: [String]
        },
        favoris: {
            type: [String]
        },
        admin: {
            type: Boolean,
            default: false
        },
        accept: {
            type: Boolean,
            default: false
        },
        reject: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Faire attention à ne pas avoir 2 adresses mail pareil sinon le mot de passe ne passera pas.
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email')
};

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel;