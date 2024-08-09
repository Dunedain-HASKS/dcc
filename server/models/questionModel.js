import { Schema, model } from 'mongoose';

const exampleSchema = new Schema({
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    },
    explanation: {
        type: String,
        // required: true
    },
    isSample: {
        type: Boolean,
        required: true
    }
});

const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    examples: [{
        type: exampleSchema,
        required: true
    }],
    constraints: {
        type: String,
        // required: true
    }
});

export default model('Question', questionSchema);