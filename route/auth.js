import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../model/User.js';

const authRouter = express.Router();



//Add user
authRouter.post('/user/register', async (req, res) => {
    const encryptedPassword = await bcrypt.hash(req.body.Password, 10);
    const newUser = new User({
        Email: req.body.Email,
        Password: encryptedPassword
    });
    const userExist = await User.findOne({ Email: req.body.Email });
    if (!userExist) {
        await newUser.save(async (err) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).send("User created successfully");
            }
        });
    } else {
        res.status(409).send("User with this email already exists");
    }
});

//Get users
authRouter.get('/user/get', authenticateToken, async (req, res) => {
    const usersList = await User.find();
    res.json(usersList);
});

// Authenticate
authRouter.post('/user/login', async (req, res) => {
    const email = req.body.Email;
    const password = req.body.Password;
    const emailValidationRes = emailValidator(email);
    if(emailValidationRes) return res.status(401).send(emailValidationRes);
    if (password == null) return res.status(401).send('Password is required');
    const user = { Email: email };

    User.findOne({ Email: email }, (error, foundUser) => {
        if (error) return res.status(500).send('Error on the server.');
        if (!foundUser) return res.status(404).send('No user found.');

        var passwordIsValid = bcrypt.compare(password, foundUser.password);
        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, token: null });

        } else {
            const accessToken = jwt.sign(
                user,
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: 86400 }
            );
            res.status(200).send({ auth: true, token: accessToken });
        }
    })

});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).send({auth: false, message: 'No token provided.'});
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        req.user = user;
        next();
    });
}

function emailValidator(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email == null || email == "" || email == undefined) {
        return 'Email can not be null.';
    }
    else if (!email.match(mailformat)) {
        return 'Email is invalid.';
    }
}
export default authRouter;