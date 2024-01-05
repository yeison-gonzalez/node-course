import { UuidAdapter } from "../../config/uuid.adapter";
import { Ticket } from "../../domain/interfaces/ticket";

export class TicketService {
  private readonly tickets: Ticket[] = [
    { id: UuidAdapter.v4(), number: 1, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 2, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 3, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 4, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 5, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 6, createdAt: new Date(), done: false },
  ];

  public get pendingTickets(): Ticket[] {
    return this.tickets.filter(ticket => !ticket.handleAtDesk);
  }

  public lastTicketNumber() {
    return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0;
  }

  public createTicket() {
    const ticket: Ticket = {
      id: UuidAdapter.v4(),
      number: this.lastTicketNumber() + 1,
      createdAt: new Date(),
      done: false,
      handleAt: undefined,
      handleAtDesk: undefined,
    };

    this.tickets.push(ticket);

    return ticket;
  }

  public drawTicket(desk: string) {
    const ticket = this.tickets.find(t => !t.handleAtDesk);
    if (!ticket) return { status: 'error', message: 'No hay tickets pendientes' };

    ticket.handleAtDesk = desk;
    ticket.handleAt = new Date();

    return { status: 'ok', ticket };
  }
}
