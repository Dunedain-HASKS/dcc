import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    solvedQuestions: [{
        type: Schema.Types.ObjectId, ref: 'Question'
    }],
    rightSub: {
        type: Number,
        // required: true,
        default: 0
    },
    wrongSub: {
        type: Number,
        // required: true,
        default: 0
    }
});

export default model('User', userSchema);