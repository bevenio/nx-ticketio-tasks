/* UI */
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

/* Components */
import QRCode from "react-qr-code";

/* Types */
export type Ticket = {
    ID: string,
    eventID: string,
    firstName: string
    lastName: string
    barcode: string
}

type TicketPreviewProps = {
    ticket: Ticket
}

/* Constants (usually everything would be defined in a SCSS file / styled component) */
const TICKET_RADIUS = 14
const TICKET_SIZE = 300

/* Reusable styling would be put in a separate file / dir */
const ColoredCard = styled(Card)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
}));

const TicketPreview = ({ticket}: TicketPreviewProps) => {
    return (  
        <Box sx={{ marginBottom: '10px', minWidth: TICKET_SIZE}}>
            <Paper elevation={3} sx={{ borderRadius: `${TICKET_RADIUS}px`}}>
                <ColoredCard sx={{ borderRadius: `${TICKET_RADIUS}px`}}>
                    <CardContent>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            divider={<Divider orientation="vertical" flexItem />}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <div>
                                <Typography variant="h6" component="div" gutterBottom>
                                Ticket  {ticket.ID}
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <p>Vorname: {ticket.firstName}</p>
                                    <p>Nachname: {ticket.lastName}</p>
                                </Typography>
                            </div>
                            <QRCode
                                value={`ticket.io/notfound/${ticket.barcode}`}
                                size={120}
                                bgColor="#291e4f"
                                fgColor='#ffffff'
                            />
                            </Stack>
                    </CardContent>
                </ColoredCard>
            </Paper>
        </Box>
    )
}

export { TicketPreview }