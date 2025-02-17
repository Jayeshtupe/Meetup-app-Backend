const initializeDatabase = require("./db/db.connect")
const Event = require("./models/event.models")
const express = require("express")
const cors = require("cors")
const corsOptions = {
    origin: "*",
    credentials: true 
}

initializeDatabase()

const app = express()
app.use(express.json())
app.use(cors(corsOptions))


async function createEvent(newEvent){
    try{
        const event = new Event(newEvent)
        const saveEvent = await event.save()
        return saveEvent
    }catch(error){
        throw error
    }
}

app.post("/events", async (req, res) => {
    try{
        const addedEvent = await createEvent(req.body)
        if(addedEvent !=0){
            res.status(200).json({message: "Event added successfully.", event: addedEvent})
        } else {
            res.status(400).json({error: "Event not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to add event details."})
    }
})

app.get("/events", async (req, res) => {
    try{
        const events = await Event.find()
        res.json(events)
    }catch(error){
        res.status(500).json({error: "Failed to get Events."})
    }
})

async function deleteById(eventId){
    try{
        const event = await Event.findByIdAndDelete(eventId)
        return event
    }catch(error){
        throw error
    }
}

app.delete("/events/:eventId", async (req, res) => {
    try{
        const deletedEvent = await deleteById(req.params.eventId)
        if(deletedEvent !=0){
            res.status(200).json({message: "Event deleted successfully."})
        }else{
            res.status(400).json({error: "Event not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to delete event."})
    }
})

async function updateEventDetails(eventId, updateData){
    try{
        const event = await Event.findByIdAndUpdate(eventId, {updateData, new: true})
        return event
    }catch(error){
        throw error
    }
}

app.put("/events/id/:eventId", async (req, res) => {
    try{
        const updatedData = await updateEventDetails(req.params.eventId, req.body)
        if(updatedData !=0){
            res.status(200).json({message: "Event updated successfully.", event: updatedData})
        } else {
            res.status(404).json({error: "Event not found."})
        }

    }catch(error){
        res.status(500).json({error: "Failed to update data."})
    }
})

const PORT = 5000
app.listen(PORT, (req, res) => {
    console.log("Server is running on port", PORT )
})