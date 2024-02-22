import mongoose from 'mongoose';

const customerSchema = mongoose.Schema({
    userId: {
        type: String,
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
        required: true
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
    bookingDate: {
        type: Date,
        default: Date.now
    },
    bookedTime:{
        type: Array,
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