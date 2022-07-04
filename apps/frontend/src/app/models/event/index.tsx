/* Rest API */
import { api } from '../../api/rest'

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

    const createEvent = (event: EventDTO): Promise<Event> => {
        return new Promise((resolve, reject) => {
            api.post<Event>('event/', event)
                .then(({data}) => {
                    resolve(data)
                })
                .catch(reject)
        })
    }

    const createEventDTO = (eventDTO: EventDTO): EventDTO=> {
        return eventDTO
    }

    const getAllEvents = (): Promise<Event[]> => {
        return new Promise((resolve, reject) => {
            api.get<Event[]>('event/')
                .then(({data}) => {
                    resolve(data)
                })
                .catch(reject)
        })
    }

    const deleteEvent = (ID: EventID): Promise<unknown> => {
        return new Promise((resolve, reject) => {
            api.delete<Event>(`/event/${ID}`)
                .then(resolve)
                .catch(reject)
        })
    }

    return {
        create: createEvent,
        createDTO: createEventDTO,
        getAll: getAllEvents,
        delete: deleteEvent
    }
}

/* Singleton definition */
const EventModelSingleton = EventModel()

export {EventModelSingleton as EventModel}