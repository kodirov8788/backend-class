const router = require("express").Router()
const Client = require("../models/clientModel")
const express = require('express');

router.post("/create", async (req, res) => {
    const { name, email, address, trip, number, commit } = req.body;

    try {
        // Create a new client instance
        const newClient = new Client({
            name,
            email,
            number,
            address,
            trip,
            commit
        });

        await newClient.save();

        res.status(200).json(newClient);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the client.' });
    }
});
router.get("/get", async (req, res) => {
    try {
        const Clients = await Client.find();
        Clients.reverse()
        res.send(Clients);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving users");
    }
});
router.delete("/delete/:id", async (req, res) => {
    const clientid = req.params.id;
    try {
        const user = await Client.findByIdAndDelete(clientid);
        res.status(200).send(`${user.name}ni o'chirildi`);
    } catch (error) {
        return res.status(401).send(`Error bor`);
    }
});
router.put("/makepayment/:id", async (req, res) => {
    const clientid = req.params.id;
    try {
        const user = await Client.findById(clientid);
        user.payment = true
        await user.save()
        res.status(200).send(`${user.name} to'lov qildi.`);
    } catch (error) {
        return res.status(401).send(`Error bor`);
    }
});





module.exports = router