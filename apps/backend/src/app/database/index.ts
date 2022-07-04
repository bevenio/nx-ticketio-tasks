
/* Types */
import { Event } from '../models/event'
import { Ticket } from '../models/ticket'

type DatabaseScheme = {
    event: Event[],
    ticket: Ticket[]
}

const preset: DatabaseScheme = {
    event: [
        {
            ID: 'event-id-0',
            city: 'Osnabrück',
            title: 'Maiwoche',
            date: new Date('5/10/2022')
        },
        {
            ID: 'event-id-1',
            city: 'Berlin',
            title: 'Streetfood Festival',
            date: new Date('6/12/2022')
        }
    ],
    ticket: [
        {
            ID: 'ticket-id-0',
            eventID: 'event-id-0',
            firstName: 'Max',
            lastName: 'Test',
            barcode: 'jf30ufjf'
        },
        {
            ID: 'ticket-id-1',
            eventID: 'event-id-0',
            firstName: 'Maya',
            lastName: 'Testina',
            barcode: 'ok8z7he6'
        },
        {
            ID: 'ticket-id-2',
            eventID: 'event-id-1',
            firstName: 'Armin',
            lastName: 'Tester',
            barcode: '34k4ufjf'
        },
        {
            ID: 'ticket-id-3',
            eventID: 'event-id-1',
            firstName: 'Karl',
            lastName: 'Unit',
            barcode: 'ok8z7236'
        }
    ]
}

type DatabaseDocument = keyof DatabaseScheme
type DatabaseFieldInput = {
    name: string,
    value: unknown
}

const database = {...preset}

const DatabaseConnection = () => {

    const findByID = (document: DatabaseDocument, ID: string) => {
        // @ts-ignore
        const entry =  database[document].find((entry) => ID === entry.ID)
        console.log(`document (${document}) entry found:`, entry)
        return entry
    }

    const findByField = (document: DatabaseDocument, field: DatabaseFieldInput) => {
        // @ts-ignore
        const entry =  database[document].filter((entry) => field.value === entry[field.name])
        console.log(`document (${document}) entry found:`, entry)
        return entry
    }

    const findAll = (document: DatabaseDocument): any => {
        console.log(`document (${document}) entry found:`, database[document])
        return database[document]
    }

    const deleteByID = (document: DatabaseDocument, ID: string): string => {
        // @ts-ignore
        const entryIndex = database[document].findIndex((entry) => ID === entry.ID)
        database[document].splice(entryIndex, 1); 
        console.log(`document (${document}) entry deleted:`, ID)
        return ID
    }

    const saveOne = (document: DatabaseDocument, entry: any) => {
        console.log(`document (${document}) entry saved:`, entry)
        database[document].push(entry)
    }

    return {
        findByID,
        findByField,
        findAll,
        deleteByID,
        saveOne,
    }
}

/* Singleton definition */
const Database = DatabaseConnection()
export default Database
