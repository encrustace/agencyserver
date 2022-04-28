import mongoose from "mongoose";


const clientSchema = new mongoose.Schema({
    ClientId:{
        type: String,
        required: true,
        unique: true
    },
    Agency:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agency",
        required: true
    },
    Name:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true,
        unique: true
    },
    TotalBill:{
        type: Number,
        required: true
    },
    PhoneNumber:{
        type: Number,
        required: true
    }
});

export default mongoose.model('Client',clientSchema);