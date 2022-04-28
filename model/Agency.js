import mongoose from "mongoose";


const agencySchema = new mongoose.Schema({
    AgencyId: {
        type: String,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Address2: {
        type: String,
        required: false
    },
    State: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true
    }
});


export default mongoose.model('Agency', agencySchema);