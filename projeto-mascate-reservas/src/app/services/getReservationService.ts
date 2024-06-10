import axios from 'axios';
import Swal from 'sweetalert2';
import config from '../config';

export const fetchReservations = async () => {
  try {
    const response = await axios.get(`${config.apiUrl}/reservation/getReservationList`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar as reservas:', error);
    return [];
  }
};

export const checkInReservation = async (idReservation: number) => {
  try {
    await axios.put(`${config.apiUrl}/reservation/checkin`, { id: idReservation });
    const result = await Swal.fire({
      title: 'Check-In Realizado',
      text: 'O check-in foi realizado com sucesso!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    if (result.isConfirmed) {
      window.location.href = window.location.href; 
    }
  } catch (error) {
    Swal.fire({
      title: 'Erro',
      text: 'Ocorreu um erro ao realizar o check-in.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
};

export const checkOutReservation = async (idReservation: number, onCheckout: (idReservation: number, checkoutTime: string) => void) => {
  const currentTime = new Date().toLocaleTimeString();
  onCheckout(idReservation, currentTime);

  try {
    await axios.put(`${config.apiUrl}/reservation/checkout`, { tableID: idReservation });
    const result = await Swal.fire({
      title: 'Check-Out Realizado',
      text: 'O check-out foi realizado com sucesso!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    if (result.isConfirmed) {
      window.location.href = window.location.href; 
    }
  } catch (error) {
    Swal.fire({
      title: 'Erro',
      text: 'Ocorreu um erro ao realizar o check-out.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
};

export const cancelReservation = async (idReservation: number) => {
  const result = await Swal.fire({
    title: 'Tem certeza?',
    text: 'Você realmente deseja cancelar esta reserva?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sim, cancelar!',
    cancelButtonText: 'Não, manter'
  });

  if (result.isConfirmed) {
    const { value: motivo } = await Swal.fire({
      title: 'Motivo do cancelamento',
      input: 'radio',
      inputOptions: {
        'Cliente não comparece': 'Cliente não comparece',
        'Outro motivo': 'Outro motivo'
      },
      inputValidator: (value) => {
        if (!value) {
          return 'Você precisa escolher uma opção!';
        }
      },
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar'
    });

    if (motivo) {
      let especificarMotivo = motivo;
      if (motivo === 'Outro motivo') {
        const { value: outroMotivo } = await Swal.fire({
          title: 'Especifique o motivo',
          input: 'text',
          inputPlaceholder: 'Digite o motivo do cancelamento',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Enviar',
          cancelButtonText: 'Cancelar'
        });
        if (outroMotivo) {
          especificarMotivo = outroMotivo;
        }
      }

      try {
        await axios.delete(`${config.apiUrl}/reservation/cancellation`, {
          data: { id: idReservation }
        });
        const result = await Swal.fire({
          title: 'Reserva Cancelada',
          text: `A reserva foi cancelada. Motivo: ${especificarMotivo}`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        if (result.isConfirmed) {
          window.location.href = window.location.href; 
        }
      } catch (error) {
        Swal.fire({
          title: 'Erro',
          text: 'Ocorreu um erro ao cancelar a reserva.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  }
};
