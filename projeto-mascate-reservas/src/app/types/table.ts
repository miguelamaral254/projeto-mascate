export interface Table {
  tableID: number;
  availability: boolean;
    type: string;
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
  
  