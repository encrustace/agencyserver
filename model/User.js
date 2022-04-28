import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
   
    Email:{
        type: String,
        required: true,
        unique: true
    },
    Password:{
        type: String,
        required: true
    },
    Token: {
        type: String
    }
});

export default mongoose.model('User',userSchema);