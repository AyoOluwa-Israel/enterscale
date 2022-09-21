import { useDrop } from 'react-dnd';
import { ColumnType, ItemType } from '../utils/enums';
import { DragItem, TicketModel } from '../utils/models';

function useColumnDrop(
  column: ColumnType,
  handleDrop: (fromColumn: ColumnType, ticketId: TicketModel['id']) => void,
) {
  const [{ isOver }, dropRef] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: ItemType.TICKET,
    drop: (dragItem) => {
      if (!dragItem || dragItem.from === column) {
        return;
      }

      handleDrop(dragItem.from, dragItem.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return {
    isOver,
    dropRef,
  };
}

export default useColumnDrop;
