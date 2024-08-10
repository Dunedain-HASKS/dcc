import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    solvedQuestions: [{
        type: Schema.Types.ObjectId, ref: 'Question'
    }],
    rightSub: [{
        type: Number,
        // required: true
    }],
    wrongSub: {
        type: Number,
        // required: true
    }
});

export default model('User', userSchema);