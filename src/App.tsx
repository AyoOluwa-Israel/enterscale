import {} from '@chakra-ui/icons';
import { Container, Heading, SimpleGrid } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TicketColumn from './components/TicketColumn';

import { ColumnType } from './utils/enums';

function App() {
  return (
    <main>
      <Heading
        fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        fontWeight="bold"
        textAlign="center"
        bgGradient="linear(to-l, #090909, #090909)"
        bgClip="text"
        pt={4}
      >
        Ticket DropBoard
      </Heading>
      {/* <DarkModeIconButton position="absolute" top={0} right={2} /> */}
      <DndProvider backend={HTML5Backend}>
        <Container maxWidth="container.lg" px={4} py={10} centerContent>
          <SimpleGrid
            columns={{ base: 1, md: 4 }}
            spacing={{ base: 16, md: 4 }}
          >
            <TicketColumn column={ColumnType.TO_DO} />
            <TicketColumn column={ColumnType.IN_PROGRESS} />
            <TicketColumn column={ColumnType.BLOCKED} />
            <TicketColumn column={ColumnType.COMPLETED} />
          </SimpleGrid>
        </Container>
      </DndProvider>
    </main>
  );
}

export default App;
