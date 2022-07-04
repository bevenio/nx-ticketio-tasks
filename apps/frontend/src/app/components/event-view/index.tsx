/* UI */
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

/* Icons */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/* Components */
import { useState, useEffect } from 'react'
import { TicketOverview } from '../ticket-overview';
import { TicketCreateDialog } from '../ticket-create-dialog'

/* Models */
import { TicketModel } from '../../models/ticket';
import { EventModel } from '../../models/event';

/* Types */
import { Ticket } from '../../models/ticket'
import { Event } from '../../models/event'

type EventPreviewProps = {
    event: Event,
    onUpdate?: () => unknown
}

/* Styling */
const dividerStyle = {
    marginTop: '14px',
    marginBottom: '14px',
};

const EventPreview = ({event, onUpdate}: EventPreviewProps) => {

    /* state */
    const [isTicketCreateDialogOpen, setTicketCreateDialogOpen] = useState(false)
    const [tickets, setTickets] = useState<Ticket[]>([])

    useEffect(() => {
        TicketModel.getByEventID(event.ID).then(tickets => {
            setTickets(tickets)
        }).catch(console.error)
      }, [event.ID, isTicketCreateDialogOpen])

    /* business logic */
    const removeEvent = () => {
        EventModel.delete(event.ID).then(() => {
            if(onUpdate) {
                onUpdate()
            }
        }).catch(console.error)
    }

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{event.title} in {event.city} ({new Date(event.date).toLocaleDateString()})</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack
                    direction="row"
                    spacing={2} 
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={removeEvent}
                    >
                        Absagen
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => setTicketCreateDialogOpen(true)}
                    >
                        Ticket hinzufügen
                    </Button>
                </Stack>
                <Divider sx={dividerStyle}/>
                <TicketOverview tickets={tickets} />
                <TicketCreateDialog
                    open={isTicketCreateDialogOpen}
                    eventID={event.ID}
                    onTicketCreateCancelled={() => setTicketCreateDialogOpen(false)}
                    onTicketCreated={() => setTicketCreateDialogOpen(false)}
                />
            </AccordionDetails>
      </Accordion>
    )
}

export { EventPreview }