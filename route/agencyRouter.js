import express from 'express';
import jwt from 'jsonwebtoken';

const agencyRouter = express.Router();
import Client from '../model/Client.js';
import Agency from '../model/Agency.js';


//Add Agency and Client
agencyRouter.post('/add', authenticateToken, async (req, res) => {
    const newAgency = new Agency(req.body.agency);
    const agencyExist = await Agency.findOne({ AgencyId: req.body.agency.AgencyId });
    if (!agencyExist) {
        await newAgency.save(async (agencyError, agency) => {
            if (agencyError) {
                res.status(400).send(agencyError);
            } else {
                const clientExist = await Client.findOne({ ClientId: req.body.client.ClientId });
                if (!clientExist) {
                    const newClient = new Client({
                        ClientId: req.body.client.ClientId,
                        Agency: agency,
                        Name: req.body.client.Name,
                        Email: req.body.client.Email,
                        TotalBill: req.body.client.TotalBill,
                        PhoneNumber: req.body.client.PhoneNumber
                    });
                    await newClient.save((clientError) => {
                        if (clientError) {
                            res.status(400).send(clientError);
                        } else {
                            res.status(200).send("Agency and Client added successfully!");
                        }
                    })
                } else {
                    res.status(409).send("Client already exists");
                }
            }
        });
    } else {
        const clientExist = await Client.findOne({ ClientId: req.body.client.ClientId });
        if (!clientExist) {
            const newClient = new Client({
                ClientId: req.body.client.ClientId,
                Agency: agencyExist,
                Name: req.body.client.Name,
                Email: req.body.client.Email,
                TotalBill: req.body.client.TotalBill,
                PhoneNumber: req.body.client.PhoneNumber
            });
            await newClient.save((clientError) => {
                if (clientError) {
                    res.status(400).send(clientError);
                } else {
                    res.status(200).send("Agency already exists and Client added in that agency successfully!");
                }
            })
        } else {
            res.status(409).send("Client already exists");
        }
    }
});

//Update client
agencyRouter.put('/client/update', authenticateToken, async (req, res) => {
    const clientExist = await Client.findOne({ ClientId: req.body.ClientId });
    if (clientExist) {
        const client = {
            ClientId: req.body.ClientId,
            Name: req.body.Name,
            Email: req.body.Email,
            TotalBill: req.body.TotalBill,
            PhoneNumber: req.body.PhoneNumber
        };

        try {
            var updatedClient = await Client.updateOne({}, client);
            res.status(200).send("Updated client successfully");
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }

    } else {
        res.status(404).send(`Client ${req.body.ClientId} does not exist`);
    }

});

//Get top agencies with maximum total bill
agencyRouter.get('/agency/top', authenticateToken, async (req, res) => {
    Client.find().populate('Agency').exec(function (err, docs) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.json(docs);
        }
    });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        req.user = user;
        next();
    });
}

export default agencyRouter;