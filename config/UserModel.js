import mongoose, { models, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const {Schema} = mongoose

const UserSchema = Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isLogged: {
        type: Boolean,
        default: false
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'tasks',
    }],
}, {
    timestamps: true,
    versionKey: false
});

// Encriptar contraseña
UserSchema.statics.encryptPassword =  (password) => {
    const salt =  bcrypt.genSaltSync(10);
    return  bcrypt.hashSync(password,salt)
}

//Verificar contraseña cuando vuelva a ingresar
UserSchema.statics.matchPassword =  (password, receivePassword) => {
    return bcrypt.compareSync(password, receivePassword)  //true or false
}


const UserModel = models.usuarios || model('usuarios', UserSchema);

export default UserModel;