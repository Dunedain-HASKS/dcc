import { Schema, model } from 'mongoose';

const solutionSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    question: {
        type: Schema.Types.ObjectId, ref: 'Question',
        required: true
    },
    language: {
        type: String,
        required: true
    },
});

export default model('Solution', solutionSchema);