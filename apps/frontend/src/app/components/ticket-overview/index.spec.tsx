import { render } from '@testing-library/react';

import { TicketOverview } from './index';

const ticketMockData = [
    {
        ID: 'mock-ticket-1',
        eventID: 'mock-event-1',
        firstName: 'Test',
        lastName: 'T1',
        barcode: '1234abcd'
    },
    {
        ID: 'mock-ticket-2',
        eventID: 'mock-event-1',
        firstName: 'Test2',
        lastName: 'T2',
        barcode: '1234efgh'
    }
]

describe('TicketOverview', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TicketOverview tickets={ticketMockData}/>);
    expect(baseElement).toBeTruthy();
  });

  it('should render two tickets when two tickets are passed', () => {
    const { getByText } = render(<TicketOverview tickets={ticketMockData}/>);
    expect(getByText("Nachname: T1")).toBeTruthy();
    expect(getByText("Nachname: T2")).toBeTruthy();
  });
});
