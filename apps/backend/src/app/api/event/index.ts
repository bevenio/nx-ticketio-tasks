import express = require('express')
import { EventModel } from '../../models/event'

const router = express.Router()

router.post('/', (req, res) => {
    const { title,  city, date } = req.body
    if(title && city && date) {
        const eventDTO = EventModel.createDTO({title, city, date})
        const hasEventBeenCreated = EventModel.create(eventDTO)
        if(hasEventBeenCreated) {
            res.sendStatus(200)
        } else {
            res.sendStatus(500)
        }
    } else {
        res.send(400)
    }
})

router.get('/', (req, res) => {
    try {
        const events = EventModel.getAll()
        res.send(events)
    } catch(error) {
        console.error(error)
        res.sendStatus(500)
    }
})

router.get('/:ID', (req, res) => {
    try {
        const { ID } = req.params
        const event = EventModel.get(ID)
        if(event) {
            res.send(event)
        } else {
            res.sendStatus(404)
        }
    } catch(error) {
        console.error(error)
        res.sendStatus(500)
    }
})

router.delete('/:ID', (req, res) => {
    try {
        const { ID } = req.params
        const event = EventModel.get(ID)
        if(event) {
            EventModel.delete(ID)
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    } catch(error) {
        console.error(error)
        res.sendStatus(500)
    }
})

export default router
