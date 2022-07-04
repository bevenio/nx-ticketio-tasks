/* Database */
import Database from "../../database"

/* Types */
export type EventID = string

export type Event = {
    ID: EventID
    title: string
    city: string
    date: Date
}

export type EventDTO = {
    title: string
    city: string
    date: Date
}

/* Methods and functions */
const EventModel = () => {

    const createEvent = (eventDTO: EventDTO): Event => {
        const event = {
            ...eventDTO,
            ID: `event-id-${Math.round(Math.random() * 100)}`,
        }
        Database.saveOne('event', event)
        return event
    }

    const createEventDTO = (eventDTO: EventDTO): EventDTO=> {
        return eventDTO
    }

    const getEvent =  (ID: EventID): Event => {
        return Database.findByID('event', ID)
    }

    const getAllEvents =  (): Event[] => {
        return Database.findAll('event')
    }

    const deleteEvent = (ID: EventID): string => {
        return Database.deleteByID('event', ID)
    }

    return {
         // Create
        create: createEvent,
        createDTO: createEventDTO,
         // Get
        get: getEvent,
        getAll: getAllEvents,
         // Delete
        delete: deleteEvent
    }
}

/* Singleton definition */
const EventModelSingleton = EventModel()

export {EventModelSingleton as EventModel}