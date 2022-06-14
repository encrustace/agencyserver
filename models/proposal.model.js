import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const investmentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const conversationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const documentSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
});

const proposalSchema = new mongoose.Schema({
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
  documents: [
    {
      type: documentSchema,
      required: true,
    },
  ],
  pictures: [
    {
      type: documentSchema,
      required: true,
    },
  ],
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
  likes: [
    {
      type: likeSchema,
      required: false,
    },
  ],
  investments: [
    {
      type: investmentSchema,
      required: false,
    },
  ],
  conversations: [
    {
      type: conversationSchema,
      required: false,
    },
  ],
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
