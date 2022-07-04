import express = require('express')
import { TicketModel } from '../../models/ticket'

const router = express.Router()

router.post('/', (req, res) => {
    const { eventID, firstName, lastName } = req.body
    if(eventID && firstName && lastName) {
        const ticketDTO = TicketModel.createDTO({eventID, firstName, lastName})
        const hasTicketBeenCreated = TicketModel.create(ticketDTO)
        if(hasTicketBeenCreated) {
            res.sendStatus(200)
        } else {
            res.sendStatus(500)
        }
    } else {
        res.send(400)
    }
})

router.get('/event/:ID', (req, res) => {
    try {
        const { ID } = req.params
        const tickets = TicketModel.getByEventID(ID)
        if(tickets) {
            res.send(tickets)
        } else {
            res.send([])
        }
    } catch(error) {
        console.error(error)
        res.sendStatus(500)
    }
})

router.get('/:ID', (req, res) => {
    try {
        const { ID } = req.params
        const ticket = TicketModel.get(ID)
        if(ticket) {
            res.send(ticket)
        } else {
            res.sendStatus(404)
        }
    } catch(error) {
        console.error(error)
        res.sendStatus(500)
    }
})

router.get('/', (req, res) => {
    try {
        const tickets = TicketModel.getAll()
        res.send(tickets)
    } catch(error) {
        console.error(error)
        res.sendStatus(500)
    }
})

export default router
