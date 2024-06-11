export interface Table {
  type: string;
  tableID: number;
  size: string;
  chairs: number;
}
export interface TableAvailability {
  [date: string]: {
    [time: string]: {
      G: { tableId: number, number: number }[];
      M: { tableId: number, number: number }[];
      P: { tableId: number, number: number }[];
    };
  };
}
