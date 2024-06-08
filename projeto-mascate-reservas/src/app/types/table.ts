export interface Table {
    type: string;
    number: number;
    size: string;
    numChairs: number;
  }
  
  export interface TableAvailability {
    [key: string]: {
      [key: string]: {
        "G": number[];
        "M": number[];
        "P": number[];
      };
    };
  }
  