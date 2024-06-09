import { Table } from "./table";

export interface TableLayoutProps {
  date: Date;
  time: string;
  onTableSelect: (table: Table) => void;
  tableSize: string;
}