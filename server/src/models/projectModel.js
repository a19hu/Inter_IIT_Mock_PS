import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    issueId: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    applicationDate: {
        type: Date,
        required: true
    },
    freelancers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    prIds: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['resolved', 'unresolved'],
        default: 'unresolved'
    }
}, { timestamps: true });

projectSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Project = mongoose.model('Project', projectSchema);
export default Project;