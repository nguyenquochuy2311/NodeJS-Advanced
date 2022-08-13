import mongoose from 'mongoose';

function isMongoId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

export default isMongoId;
