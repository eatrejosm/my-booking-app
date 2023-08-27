import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        requiredz: true
    },
    country: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    classCount: {
        type: Number,
        default: 0
    },
    belt: {
        type: String,
        required: true
    },
    stripes: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'pending'
    }
},
{
    timestamps: true
}
)



const studentModel = mongoose.model('Student', studentSchema)

export default studentModel;