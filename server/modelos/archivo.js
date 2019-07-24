const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        require: [true, "El campo nombre es obligatorio"]
    },
    email: {
        type: String,
        unique: true,
        require: [true, 'El campo email es obligatorio']
    },
    password: {
        type: String,
        require: [true, 'El campo comtraseña es obligatorio']
    },
    img: {
        type: String,
        require: false
    },
    role: {
        type: String,
        default: "USER_ROLE"
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

module.exports = mongoose.model('Usuario', usuarioSchema);