const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        enum: ["Online Event", "Offline Event"],
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    location: {
        city: {type: String},
        address: {type: String}
    },
    price: {
        type: Number,
        required: true
    },
    speaker: [{
        name: {type: String, required: true},
        role: {type: String, required: true},
        image: {type: String}
    }],
    image: {
        type: String,
        required: true
    },
    dressCode: {
        type: String,
    },
    ageRestriction: {
        type: String
    },
    tags: [{
        type: String
    }],
}, { timestamps: true })

module.exports = mongoose.model("Event", eventSchema)
