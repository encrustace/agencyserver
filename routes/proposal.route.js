import express from "express";

const ProposalRouter = express.Router();

//Add Proposal
ProposalRouter.post("/add", async (req, res) => {
  const newUser = new user(req.body);
  const existingUser = await user.findOne({
    email: req.body.email,
  });
  if (!existingUser) {
    await newUser.save(async (err, user) => {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.status(200).send(user);
      }
    });
  } else {
    res.status(400).send("Email is already taken!");
  }
});

export default ProposalRouter;
