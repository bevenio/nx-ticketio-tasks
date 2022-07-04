/* Rest API */
import { api } from '../../api/rest'

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

    const createTicket = (ticket: TicketDTO): Promise<Ticket> => {
        return new Promise((resolve, reject) => {
            api.post<Ticket>('ticket/', ticket)
                .then(({data}) => {
                    resolve(data)
                })
                .catch(reject)
        })
    }

    const createTicketDTO = (ticketDTO: TicketDTO): TicketDTO=> {
        return ticketDTO
    }

    const getByEventID = (ID: string): Promise<Ticket[]> => {
        return new Promise((resolve, reject) => {
            api.get<Ticket[]>(`ticket/event/${ID}`)
                .then(({data}) => {
                    resolve(data)
                })
                .catch(reject)
        })
    }

    const deleteTicket = (ID: TicketID): Promise<unknown> => {
        return new Promise((resolve, reject) => {
            api.delete<Ticket>(`ticket/${ID}`)
                .then(resolve)
                .catch(reject)
        })
    }

    return {
        create: createTicket,
        createDTO: createTicketDTO,
        getByEventID: getByEventID,
        delete: deleteTicket
    }
}

/* Singleton definition */
const TicketModelSingleton = TicketModel()

export {TicketModelSingleton as TicketModel}