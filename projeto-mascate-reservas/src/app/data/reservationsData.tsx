interface Reservation {
  id: number;
  customerName: string;
  cpf: string;
  phoneNumber: string;
  email: string;
  reservation: {
    date: string;
    time: string;
    tableNumber: number;
  };
}

const reservationsData: Reservation[] = [
  {
    id: 1,
    customerName: "João da Silva",
    cpf: "123.456.789-00",
    phoneNumber: "(11) 99999-9999",
    email: "joao@example.com",
    reservation: {
      date: "2024-05-30",
      time: "12:00",
      tableNumber: 3
    }
  },
  {
    id: 2,
    customerName: "Maria Oliveira",
    cpf: "987.654.321-00",
    phoneNumber: "(22) 88888-8888",
    email: "maria@example.com",
    reservation: {
      date: "2024-06-01",
      time: "14:00",
      tableNumber: 1
    }
  },
  {
    id: 3,
    customerName: "Pedro Souza",
    cpf: "111.222.333-44",
    phoneNumber: "(33) 77777-7777",
    email: "pedro@example.com",
    reservation: {
      date: "2024-06-03",
      time: "18:00",
      tableNumber: 5
    }
  }
];

export default reservationsData;
