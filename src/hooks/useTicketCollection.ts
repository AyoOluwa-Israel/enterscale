import { useLocalStorage } from 'usehooks-ts';

import { v4 as uuidv4 } from 'uuid';
import { ColumnType } from '../utils/enums';
import { TicketModel } from '../utils/models';

function useTicketCollection() {
  return useLocalStorage<{
    [key in ColumnType]: TicketModel[];
  }>('tickets', {
    Pending: [
      {
        id: uuidv4(),
        column: ColumnType.PENDING,
        title: 'Ticket 1',
        color: 'blue.300',
      },
    ],
    'In Progress': [
      {
        id: uuidv4(),
        column: ColumnType.IN_PROGRESS,
        title: 'Ticket 2',
        color: 'yellow.300',
      },
    ],
    Blocked: [
      {
        id: uuidv4(),
        column: ColumnType.BLOCKED,
        title: 'Ticket 3',
        color: 'red.300',
      },
    ],
    Resolved: [
      {
        id: uuidv4(),
        column: ColumnType.RESOLVED,
        title: 'Ticket 4',
        color: 'green.300',
      },
    ],
  });
}

export default useTicketCollection;
