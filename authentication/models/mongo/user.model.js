import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import {
    authConnection,
    shipngayConnection
} from '../../config/mongodb.multi-connection';

const schema = mongoose.Schema;

const Authentication = new schema({
    refresh_token: {
        type: String,
        required: false
    },
    access_token: {
        type: String,
        required: false
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

const User = new schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: false
    },
    api_key: {
        type: String,
        required: false
    },
    api_secret: {
        type: String,
        required: false
    },
    is_verified: {
        type: Boolean,
        required: true,
        default: false
    },
    role: {
        type: Number,
        required: true,
        default: 0
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

/* Getter Setter */
// User.path('password').
//     get(function () {
//         return this.password;
//     }).
//     set(function (password) {
//         this.password = password;
//     });

/* Methods */
User.methods.toJSON = function () {
    return {
        id: this._id,
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        is_verified: this.is_verified,
        role: this.role,
    }
};
User.set('toJSON', { virtuals: true });
User.set('toObject', { getters: true, virtuals: true });

User.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.log(error);
        return false;
    }
}

/* Hook DB */
User.pre('save', async function (next) {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        next(error);
    }
});

module.exports = {
    Authentication: authConnection.model('authentication', Authentication),
    User: shipngayConnection.model('sn_users', User)
};