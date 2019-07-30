const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un role valido'
}

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
        default: "USER_ROLE",
        enum: rolesValidos
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

usuarioSchema.plugin(uniqueValidator, { message : '{PATH} debe ser unico' });

usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

module.exports = mongoose.model('Usuario', usuarioSchema);