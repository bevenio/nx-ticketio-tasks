
/* Types */
import { Ticket } from '../ticket-view';

/* Components */
import { TicketPreview } from '../ticket-view'

type TicketOverviewProps = {
    tickets: Ticket[]
}

const TicketOverview = ({tickets}: TicketOverviewProps ) => {
    return (
        <>
            {tickets.map(ticket => {
                return <TicketPreview key={ticket.ID} ticket={ticket}/>
            })}
        </>
    )
}

export { TicketOverview }