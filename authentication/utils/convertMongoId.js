import mongoose from 'mongoose';
import { isString } from './isString';

async function convertMongoId(id) {
    if (isString(id))
        return mongoose.Types.ObjectId(id);
    return null;
}

export default convertMongoId;
