import express from "express";
import proposal from "../models/proposal.model.js";
import user from "../models/user.model.js";

const ProposalRouter = express.Router();

//Add Proposal
ProposalRouter.post("/add", async (req, res) => {
  const existingUser = await user.findOne({
    email: req.body.email,
  });
  if (existingUser) {
    const newProposal = new proposal(req.body);
    await newProposal.save(async (err, proposal) => {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.status(200).send(proposal);
      }
    });
  } else {
    res.status(404).send("User does not exist");
  }
});

//Get All Proposal
ProposalRouter.get("/all", async (req, res) => {
  proposal.find().exec(function (err, proposal) {
    if (err) {
      res.status(400).send(err.message);
    } else {
      res.status(200).send(proposal);
    }
  });
});

//Add Likes
ProposalRouter.post("/like", async (req, res) => {
  const existingProposal = await proposal.findById(req.body.id).exec();
  if (existingProposal) {
    const liked = existingProposal.likes.findIndex(function (item, i) {
      return item.email == req.body.email;
    });
    if (liked === -1) {
      existingProposal.likes.push({
        email: req.body.email,
        timestamp: new Date(),
      });
    } else {
      existingProposal.likes.splice(liked, 1);
    }
    proposal.updateOne(existingProposal, function (err, docs) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(docs);
      }
    });
  } else {
    res.status(404).send("Proposal not found!");
  }
});

//Invest
ProposalRouter.post("/invest", async (req, res) => {
  const existingProposal = await proposal.findById(req.body.id).exec();
  if (existingProposal) {
    const invested = existingProposal.investments.findIndex(function (item, i) {
      return item.email == req.body.email;
    });
    if (invested === -1) {
      existingProposal.investments.push({
        email: req.body.email,
        amount: req.body.amount,
        timestamp: new Date(),
      });
    } else {
      existingProposal.investments.splice(invested, 1);
      existingProposal.investments.push({
        email: req.body.email,
        amount: req.body.amount,
        timestamp: new Date(),
      });
    }
    proposal.updateOne(existingProposal);
    res.status(200).send(existingProposal);
  } else {
    res.status(404).send("Proposal not found!");
  }
});

export default ProposalRouter;
