import express from "express";
import "dotenv/config";
import monggose from "mongoose";
import cors from "cors";
//Import Routes
import UserRouter from "./routes/user.route.js";
import ProposalRouter from "./routes/proposal.route.js";

const app = express();
const port = process.env.PORT || 3000;

//Connect to Database
monggose.connect(
  "" + process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true},
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to the database");
    }
  }
);

//Middleware
app.use(cors());
app.use(express.json());

//Route Middleware
app.use("/api/user", UserRouter);
app.use("/api/proposal", ProposalRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
