/* UI */
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

/* Components */
import { useState } from 'react'

/* Types */
import { Event } from '../../models/event'

/* Models */
import { EventModel } from '../../models/event'

type EventCreateDialogProps = {
    open: boolean
    onEventCreated?: (event: Event) => unknown
    onEventCreateCancelled?: () => unknown
}

const EventCreateDialog = ({open, onEventCreated, onEventCreateCancelled}: EventCreateDialogProps) => {

    /* state */
    const [eventDTO, setEventDTO] = useState(EventModel.createDTO({
        title: '',
        city: '',
        date: new Date()
    }))

    /* business logic */
    const resetState = () => {
        setEventDTO({ 
            title: '',
            city: '',
            date: new Date()
        })
    }

    const finishEventCreation = () => {
        if(onEventCreated) {
            EventModel.create(eventDTO).then(onEventCreated).catch(console.error)
        }
        resetState()
    }

    const cancelEventCreation = () => {
        if(onEventCreateCancelled) {
            onEventCreateCancelled()
        }
        resetState()
    }

    return (
        <Dialog open={open}>
            <DialogTitle>Neues Event hinzufügen</DialogTitle>
            <FormControl sx={{
                minWidth: '300px',
                '& .MuiTextField-root': { m: 1, minWidth: '25ch' }
            }}>
                <TextField
                    id="ticket-create-dialog-firstname"
                    label="Titel"
                    multiline
                    maxRows={4}
                    value={eventDTO.title}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEventDTO({
                        ...eventDTO,
                        title: event.currentTarget.value
                    })}
                />
                <TextField
                    id="ticket-create-dialog-lastname"
                    label="Stadt"
                    multiline
                    maxRows={4}
                    value={eventDTO.city}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEventDTO({
                        ...eventDTO,
                        city: event.currentTarget.value
                    })}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label="Datum und Uhrzeit"
                        value={eventDTO.date}
                        onChange={(event: React.ChangeEvent<HTMLInputElement> | null) => setEventDTO({
                            ...eventDTO,
                            date: event? new Date(event.currentTarget.value) : eventDTO.date
                        })}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
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
                        onClick={cancelEventCreation}
                    >
                        Abbrechen
                    </Button>
                    <Button
                        variant="contained"
                        onClick={finishEventCreation}
                    >
                       Hinzufügen
                    </Button>
                </Stack>
            </FormControl>
        </Dialog>
    )
}

export { EventCreateDialog }