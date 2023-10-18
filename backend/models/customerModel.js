import mongoose from 'mongoose';

const customerSchema = mongoose.Schema({
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
    customerDetails: {
        type: String,
        required: true
    },
    attendanceCount: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    fromTime: {
        type: String,
        required: true
    },
    toTime: {
        type: String,
        required: true
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



const customerModel = mongoose.model('Customer', customerSchema)

export default customerModel;