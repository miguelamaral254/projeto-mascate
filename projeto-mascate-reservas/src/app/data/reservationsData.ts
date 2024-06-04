// src/data/reservas.ts
import { Reservation } from '../../types/reservation';

const reservationsData: Reservation[] = [
  {
    id: 1,
    customerName: "Alexandre Torres",
  cpf: "999.888.777-08",
  phoneNumber: "(88) 8888-8888",
  employeeId: "12046",
  reservationId: "e8765b23-4e56-7e89-1a23-f4568cb50f2",
  reservation: {
    date: "2024-06-03",
    time: "18:00",
    tableNumber: 3
  }
},
  {
    id: 2,
    customerName: "Fernanda Oliveira",
  cpf: "123.456.789-09",
  phoneNumber: "(99) 9999-9999",
  employeeId: "12047",
  reservationId: "e9876c34-5d67-8e90-1b23-a4568dc59f3",
  reservation: {
    date: "2024-06-05",
    time: "19:00",
    tableNumber: 5
  }
},
  {
    id: 3,
    customerName: "Rafael Silva",
    cpf: "111.222.333-10",
    phoneNumber: "(77) 7777-7777",
    employeeId: "12048",
    reservationId: "e0123d45-6f78-9a01-2c34-b5678ed60f4",
    reservation: {
      date: "2024-06-10",
      time: "20:00",
      tableNumber: 1
    }
  },
    {
    id: 4,
    customerName: "Carla Santos",
    cpf: "555.666.777-11",
    phoneNumber: "(66) 6666-6666",
    employeeId: "12049",
    reservationId: "e1234f56-7g89-0h12-3d45-c6789fe70f5",
    reservation: {
      date: "2024-06-15",
      time: "12:00",
      tableNumber: 2
    }
  },
  {
    id: 5,
    customerName: "Mariana Oliveira",
    cpf: "444.555.666-12",
    phoneNumber: "(55) 5555-5555",
    employeeId: "12050",
    reservationId: "e2345g67-8h90-1i23-4e56-d7890gf80f6",
    reservation: {
      date: "2024-06-20",
      time: "14:00",
      tableNumber: 4
    }
  },{
    id: 7,
    customerName: "Thiago Souza",
    cpf: "777.888.999-13",
    phoneNumber: "(44) 4444-4444",
    employeeId: "12051",
    reservationId: "e3456h78-9i01-2j34-5f67-g8901hg90f7",
    reservation: {
      date: "2024-06-25",
      time: "18:00",
      tableNumber: 6
    }
  },{
    id: 8,
    customerName: "Laura Oliveira",
    cpf: "666.777.888-14",
    phoneNumber: "(33) 3333-3333",
    employeeId: "12052",
    reservationId: "e4567i89-0j12-3k45-6g78-h9012ij00f8",
    reservation: {
      date: "2024-06-30",
      time: "19:00",
      tableNumber: 7
    }
  }
  

  
  
  
];

export default reservationsData;
