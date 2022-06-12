import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  goal: {
    type: String,
    required: true,
  },
  paperSigned: {
    type: Boolean,
    required: true,
  },
  homeBought: {
    type: Boolean,
    required: true,
  },
  archived: {
    type: Boolean,
    required: true,
  },
  documents: {
    type: String,
    required: true,
  },
  pictures: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  likes: {
    type: String,
    required: true,
  },
  investments: {
    type: String,
    required: true,
  },
  conversations: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Proposal", proposalSchema);
