const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const Client = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        default: "",
    },
    commit: {
        type: String,
        default: "",
    },
    trip: {
        type: Object,
        default: {}
    },
    number: {
        type: String,
        required: true
    },
    payment: {
        type: Boolean,
        default: false
    }
});

module.exports = model("Client", Client);