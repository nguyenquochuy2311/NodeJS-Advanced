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
        required: true,
        select: false
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
}, {
    toJSON: function () {
        return {
            email: this.email,
            first_name: this.first_name,
            last_name: !!this.last_name,
            api_key: !!this.api_key,
            api_secret: !!this.api_secret,
            is_verified: !!this.is_verified,
            role: !!this.role
        }
    }
});

/* Hook before */
User.pre('save', async function (next) {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        next(error);
    }
});

User.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {

    }
}

module.exports = {
    Authentication: authConnection.model('authentication', Authentication),
    User: shipngayConnection.model('sn_users', User)
};