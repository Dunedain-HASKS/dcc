import { Schema, model } from 'mongoose';

const contestSolutionSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    contest: {
        type: Schema.Types.ObjectId, ref: 'Contest',
        required: true
    },
    question: {
        type: Schema.Types.ObjectId, ref: 'Question',
        required: true
    }, 
});

export default model('ContestSolution', contestSolutionSchema);