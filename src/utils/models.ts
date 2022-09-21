import { ColumnType } from './enums';

export interface TicketModel {
  id: string;
  title: string;
  column: ColumnType;
  color: string;
}

export interface DragItem {
  index: number;
  id: TicketModel['id'];
  from: ColumnType;
}
