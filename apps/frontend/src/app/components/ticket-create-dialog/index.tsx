/* UI */
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

/* Components */
import { useState } from 'react'

/* Types */
import { Ticket } from '../ticket-view'

/* Models */
import { TicketModel } from '../../models/ticket'

type TicketCreateDialogProps = {
    eventID: string
    open: boolean
    onTicketCreated?: (ticket: Ticket) => unknown
    onTicketCreateCancelled?: () => unknown
}

const TicketCreateDialog = ({eventID, open, onTicketCreated, onTicketCreateCancelled}: TicketCreateDialogProps) => {

    /* state */
    const [ticketDTO, setTicketDTO] = useState(TicketModel.createDTO({
        eventID: eventID,
        firstName: '',
        lastName: ''
    }))

    /* business logic */
    const resetState = () => {
        setTicketDTO({ 
            eventID: eventID,
            firstName: '',
            lastName: ''
        })
    }

    const finishTicketCreation = () => {
        if(onTicketCreated) {
            TicketModel.create(ticketDTO).then(onTicketCreated).catch(console.error)
        }
        resetState()
    }

    const cancelTicketCreation = () => {
        if(onTicketCreateCancelled) {
            onTicketCreateCancelled()
        }
        resetState()
    }

    return (
        <Dialog open={open}>
            <DialogTitle>Neues Ticket hinzufügen</DialogTitle>
            <FormControl sx={{
                minWidth: '300px',
                '& .MuiTextField-root': { m: 1, minWidth: '25ch' }
            }}>
                <TextField
                    id="ticket-create-dialog-firstname"
                    label="Vorname"
                    multiline
                    maxRows={4}
                    value={ticketDTO.firstName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTicketDTO({
                        ...ticketDTO,
                        firstName: event.currentTarget.value
                    })}
                />
                <TextField
                    id="ticket-create-dialog-lastname"
                    label="Nachname"
                    multiline
                    maxRows={4}
                    value={ticketDTO.lastName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTicketDTO({
                        ...ticketDTO,
                        lastName: event.currentTarget.value
                    })}
                />
                 <Stack
                    direction="row"
                    spacing={2} 
                    justifyContent="center"
                    alignItems="center"
                    sx={{  m: 1, minWidth: '25ch'}}
                >
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={cancelTicketCreation}
                    >
                        Abbrechen
                    </Button>
                    <Button
                        variant="contained"
                        onClick={finishTicketCreation}
                    >
                       Hinzufügen
                    </Button>
                </Stack>
            </FormControl>
        </Dialog>
    )
}

export { TicketCreateDialog }