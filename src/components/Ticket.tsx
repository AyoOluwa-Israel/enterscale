import { DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';
import { memo } from 'react';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { TicketModel } from '../utils/models';
import { AutoResizeTextarea } from './AutoResizeTextArea';

type TaskProps = {
  index: number;
  ticket: TicketModel;
  onUpdate: (id: TicketModel['id'], updatedTask: TicketModel) => void;
  onDelete: (id: TicketModel['id']) => void;
  onDropHover: (i: number, j: number) => void;
};

function Ticket({
  index,
  ticket,
  onUpdate: handleUpdate,
  onDropHover: handleDropHover,
  onDelete: handleDelete,
}: TaskProps) {
  const { ref, isDragging } = useDragAndDrop<HTMLDivElement>(
    { ticket, index: index },
    handleDropHover,
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    handleUpdate(ticket.id, { ...ticket, title: newTitle });
  };

  const handleDeleteClick = () => {
    handleDelete(ticket.id);
  };

  return (
    <ScaleFade in={true} unmountOnExit>
      <Box
        ref={ref}
        as="div"
        role="group"
        position="relative"
        rounded="lg"
        w={200}
        pl={3}
        pr={7}
        pt={3}
        pb={1}
        boxShadow="xl"
        cursor="grab"
        fontWeight="bold"
        userSelect="none"
        bgColor={ticket.color}
        opacity={isDragging ? 0.5 : 1}
      >
        <IconButton
          position="absolute"
          top={0}
          right={0}
          zIndex={100}
          aria-label="delete-ticket"
          size="md"
          colorScheme="solid"
          color={'gray.700'}
          icon={<DeleteIcon />}
          opacity={0}
          _groupHover={{
            opacity: 1,
          }}
          onClick={handleDeleteClick}
        />
        <AutoResizeTextarea
          value={ticket.title}
          fontWeight="semibold"
          cursor="inherit"
          border="none"
          p={0}
          resize="none"
          minH={70}
          maxH={200}
          focusBorderColor="none"
          color="gray.700"
          onChange={handleTitleChange}
        />
      </Box>
    </ScaleFade>
  );
}
export default memo(Ticket, (prev, next) => {
  if (
    _.isEqual(prev.ticket, next.ticket) &&
    _.isEqual(prev.index, next.index) &&
    prev.onDelete === next.onDelete &&
    prev.onDropHover === next.onDropHover &&
    prev.onUpdate === next.onUpdate
  ) {
    return true;
  }

  return false;
});
