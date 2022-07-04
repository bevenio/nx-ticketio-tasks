/* UI */
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

/* Components */
import { useState, useEffect } from 'react'
import { EventPreview } from '../event-view';
import { EventCreateDialog } from '../event-create-dialog'

/* Models */
import { EventModel } from '../../models/event';

/* Types */
import { Event } from '../../models/event'

/* Reusable styling would be put in a separate file / dir */
const ColoredBackground = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    overflow: 'scroll-x',
    paddingTop: '14px',
    paddingBottom: '14px',
    margin: '0',
}));

/* Styling */
const dividerStyle = {
    marginTop: '14px',
    marginBottom: '14px',
};

const TicketIOTask = () => {

    const [events, setEvents] = useState<Event[]>([])
    const [isEventCreateDialogOpen, setEventCreateDialogOpen] = useState(false)

    useEffect(() => {
        EventModel.getAll().then(events => {
            setEvents(events)
        }).catch(console.error)
      }, [isEventCreateDialogOpen])

    const onUpdate = () => {
        EventModel.getAll().then(events => {
            setEvents(events)
        }).catch(console.error)
    }

    return (
        <ColoredBackground>
            <Container maxWidth="sm">
                <Card sx={{ minWidth: 320 }}>
                    <CardContent>
                        <Typography variant="h2" component="div" gutterBottom>
                            Ticket.io - Aufgaben
                        </Typography>
                        <Typography variant="h4" component="div" gutterBottom>
                            Lösung - Aufgabe 1
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                            Entnimmt man die Münzen pro Maschine so, dass man von der ersten eine nimmt,
                            von der zweiten zwei und von der x-ten x Münzen (max. 10), gibt die Zehnerstelle der
                            Summe aller zusammen gewogenen Münzen einen Hinweis darauf, welche Maschine defekt ist. 
                            Voraussetzung ist aber, dass wie beschrieben genau eine defekt ist. 
                            Ist die Zehnerstelle eine 1, ist die erste Maschine defekt, ist die Zehnerstelle x, ist die x-te
                            Maschine defekt. Einzige Ausnahme wäre bei diesem Vorgehen die zehnte Maschine, die in einer 
                            Zehnerstelle von 0 resultieren würde.
                        </Typography>
                        <Typography variant="h4" component="div" gutterBottom>
                            Lösung - Aufgabe 2
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                            In der folgenden Ansicht werden alle gespeicherten Events geladen, mit den jeweils den Events zugeordneten
                            Tickets. Provisorsich wurden einige kurze UI-Tests geschrieben. Für die Umsetzung wurden im Frontent folgende Technologien genutzt:
                            <p>
                                NX, React, Material-UI, TypeScript, Axios, react-qr-code
                            </p>
                            Für die Umsetzung im Backend habe ich auf eine Node/Express Lösung zurückgegriffen, da NestJS noch nicht zu
                            meinem aktuellen Tech-Stack gehört und die Bearbeitungszeit limitiert war. Weitere Technologien:
                            <p>
                                NX, Express, NodeJS, randomstring
                            </p>
                        </Typography>
                        <hr></hr>
                        <Stack
                            direction="row"
                            spacing={2} 
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Button variant="contained" onClick={() => setEventCreateDialogOpen(true)}>
                                Veranstaltung hinzufügen
                            </Button>
                        </Stack>
                        <Divider sx={dividerStyle}/>
                        {events.map(event => {
                            return <EventPreview key={event.ID} event={event} onUpdate={onUpdate} />
                        })}
                        <EventCreateDialog
                            open={isEventCreateDialogOpen}
                            onEventCreateCancelled={() => setEventCreateDialogOpen(false)}
                            onEventCreated={() => setEventCreateDialogOpen(false)}
                        />
                    </CardContent>
                </Card>
            </Container>
        </ColoredBackground>
    )
}

export { TicketIOTask }