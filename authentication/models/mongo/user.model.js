import mongoose from 'mongoose';
const schema = mongoose.Schema();

import {
    authConnection,
    shipngayConnection
} from '../../config/mongodb.multi-connection';

const Authentication = new schema({
    refresh_token: {
        type: String,
        required: false
    },
    access_token: {
        type: String,
        required: false
    },
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
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
        required: true
    },
    api_key: {
        type: String,
        unique: true,
        required: false
    },
    api_secret: {
        type: String,
        unique: true,
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
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    toJSON() {
        return {
            email: this.email ?? null,
            first_name: this.first_name ?? null,
            last_name: this.last_name ?? null,
            api_key: this.api_key ?? null,
            api_secret: this.api_secret ?? null,
            is_verified: this.is_verified ?? null,
            role: this.role ?? null
        }
    }
});

module.exports = {
    Authentication: authConnection.model('authentication', Authentication),
    User: shipngayConnection.model('sn_users', User)
};