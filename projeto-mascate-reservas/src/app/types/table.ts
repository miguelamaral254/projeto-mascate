export interface Table {
  tableID: number;
    availability: boolean;
      size: string;
      chairs: number;
  }
  
  export interface Checkout {
    tableID: number;
  }

  export interface TableAvailability {
    
      [time: string]: {
        G: { tableId: number, number: number }[];
        M: { tableId: number, number: number }[];
        P: { tableId: number, number: number }[];
      };
    };

    export interface TableLayoutProps {
      date: Date;
      time: string;
      onTableSelect: (table: Table) => void;
      tableSize: string;
    }
  