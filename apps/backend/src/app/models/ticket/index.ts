import RandomString = require("randomstring");

/* Database */
import Database from "../../database"

/* Types */
export type TicketID = string

export type Ticket = {
    ID: TicketID,
    eventID: string,
    firstName: string
    lastName: string
    barcode: string
}

export type TicketDTO = {
    eventID: string,
    firstName: string
    lastName: string
}

/* Methods and functions */
const TicketModel = () => {

    const createTicket = (ticketDTO: TicketDTO): Ticket => {
        const ticket = {
            ...ticketDTO,
            ID: `ticket-id-${Math.round(Math.random() * 100)}`,
            barcode: RandomString.generate(8)
        }
        Database.saveOne('ticket', ticket)
        return ticket
    }

    const createTicketDTO = (ticketDTO: TicketDTO): TicketDTO=> {
        return ticketDTO
    }

    const getTicket =  (ID: TicketID): Ticket => {
        return Database.findByID('ticket', ID)
    }

    const getByEventID = (ID: TicketID): Ticket => {
        return Database.findByField('ticket', {
            name: 'eventID',
            value: ID
        })
    }

    const getAllTickets =  (): Ticket[] => {
        return Database.findAll('ticket')
    }

    const deleteTicket = (ID: TicketID): string => {
        return Database.deleteByID('ticket', ID)
    }

    return {
        // Create
        create: createTicket,
        createDTO: createTicketDTO,
        // Get
        get: getTicket,
        getByEventID: getByEventID,
        getAll: getAllTickets,
        // Delete
        delete: deleteTicket
    }
}

/* Singleton definition */
const TicketModelSingleton = TicketModel()

export {TicketModelSingleton as TicketModel}