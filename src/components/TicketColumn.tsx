import { AddIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import useColumnDrop from '../hooks/useColumnDrop';
import useColumnTicket from '../hooks/useColumnTicket';
import { ColumnType } from '../utils/enums';
import Ticket from './Ticket';

const ColumnColorScheme: Record<ColumnType, string> = {
  Todo: 'gray',
  'In Progress': 'blue',
  Blocked: 'red',
  Completed: 'green',
};

function TicketColumn({ column }: { column: ColumnType }) {
  const {
    tickets,
    addEmptyTicket,
    deleteTicket,
    dropTicketFrom,
    swapTickets,
    updateTicket,
  } = useColumnTicket(column);

  const { dropRef, isOver } = useColumnDrop(column, dropTicketFrom);

  const columnTickets = tickets.map((ticket, index) => (
    <Ticket
      key={ticket.id}
      ticket={ticket}
      index={index}
      onDropHover={swapTickets}
      onUpdate={updateTicket}
      onDelete={deleteTicket}
    />
  ));

  return (
    <Box>
      <Heading fontSize="md" mb={4} letterSpacing="wide">
        <Badge
          px={2}
          py={1}
          rounded="lg"
          colorScheme={ColumnColorScheme[column]}
        >
          {column}
        </Badge>
      </Heading>
      <IconButton
        size="xs"
        w="full"
        color={useColorModeValue('gray.500', 'gray.400')}
        bgColor={useColorModeValue('gray.100', 'gray.700')}
        _hover={{ bgColor: useColorModeValue('gray.200', 'gray.600') }}
        py={2}
        variant="solid"
        onClick={addEmptyTicket}
        colorScheme="black"
        aria-label="add-ticket"
        icon={<AddIcon />}
      />
      <Stack
        ref={dropRef}
        direction={{ base: 'row', md: 'column' }}
        h={{ base: 300, md: 600 }}
        p={4}
        mt={2}
        spacing={4}
        bgColor={useColorModeValue('gray.50', 'gray.900')}
        rounded="lg"
        boxShadow="md"
        overflow="auto"
        opacity={isOver ? 0.85 : 1}
      >
        {columnTickets}
      </Stack>
    </Box>
  );
}

export default TicketColumn;
