import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ColumnType } from '../utils/enums';
import { pickRandomColor, swap } from '../utils/helpers';
import { debug } from '../utils/logging';
import { TicketModel } from '../utils/models';
import useTicketCollection from './useTicketCollection';

const MAX_TASK_PER_COLUMN = 100;

function useColumnTasks(column: ColumnType) {
  const [tickets, setTickets] = useTicketCollection();

  const columnTickets = tickets[column];

  const addEmptyTicket = useCallback(() => {
    debug(`Adding new empty ticket to ${column} column`);
    setTickets((allTickets) => {
      const columnTickets = allTickets[column];

      if (columnTickets.length > MAX_TASK_PER_COLUMN) {
        debug('Too many ticket!');
        return allTickets;
      }

      const newColumnTicket: TicketModel = {
        id: uuidv4(),
        title: `New ${column} ticket`,
        color: pickRandomColor('.300'),
        column,
      };

      return {
        ...allTickets,
        [column]: [newColumnTicket, ...columnTickets],
      };
    });
  }, [column, setTickets]);

  const deleteTicket = useCallback(
    (id: TicketModel['id']) => {
      debug(`Removing ticket ${id}..`);
      setTickets((allTickets) => {
        const columnTickets = allTickets[column];
        return {
          ...allTickets,
          [column]: columnTickets.filter((ticket) => ticket.id !== id),
        };
      });
    },
    [column, setTickets],
  );

  const updateTicket = useCallback(
    (id: TicketModel['id'], updatedTicket: Omit<Partial<TicketModel>, 'id'>) => {
      debug(`Updating ticket ${id} with ${JSON.stringify(updateTicket)}`);
      setTickets((allTickets) => {
        const columnTickets = allTickets[column];
        return {
          ...allTickets,
          [column]: columnTickets.map((ticket) =>
          ticket.id === id ? { ...ticket, ...updatedTicket } : ticket,
          ),
        };
      });
    },
    [column, setTickets],
  );

  const dropTicketFrom = useCallback(
    (from: ColumnType, id: TicketModel['id']) => {
      setTickets((allTickets) => {
        const fromColumnTickets = allTickets[from];
        const toColumnTickets = allTickets[column];
        const movingTicket = fromColumnTickets.find((ticket) => ticket.id === id);

        console.log(`Moving ticket ${movingTicket?.id} from ${from} to ${column}`);

        if (!movingTicket) {
          return allTickets;
        }

        // remove the task from the original column and copy it within the destination column
        return {
          ...allTickets,
          [from]: fromColumnTickets.filter((ticket) => ticket.id !== id),
          [column]: [{ ...movingTicket, column }, ...toColumnTickets],
        };
      });
    },
    [column, setTickets],
  );

  const swapTickets = useCallback(
    (i: number, j: number) => {
      debug(`Swapping task ${i} with ${j} in ${column} column`);
      setTickets((allTickets) => {
        const columnTickets = allTickets[column];
        return {
          ...allTickets,
          [column]: swap(columnTickets, i, j),
        };
      });
    },
    [column, setTickets],
  );

  return {
    tickets: columnTickets,
    addEmptyTicket,
    updateTicket,
    dropTicketFrom,
    deleteTicket,
    swapTickets,
  };
}

export default useColumnTasks;
