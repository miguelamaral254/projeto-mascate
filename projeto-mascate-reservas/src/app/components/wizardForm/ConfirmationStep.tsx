import React from 'react';
import Swal from 'sweetalert2';

interface ConfirmationStepProps {
  reservationData: any; // Dados da reserva
  onConfirm: () => void;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ reservationData, onConfirm }) => {
  const handleConfirm = () => {
    // Aqui você pode enviar os dados da reserva para a API
    onConfirm();

    // Exibir alerta de sucesso
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Reserva salva com sucesso!',
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <>
      <h2>Confirmação da Reserva</h2>
      <p>Nome: {reservationData.name}</p>
      <p>CPF: {reservationData.cpf}</p>
      <p>Telefone: {reservationData.phone}</p>
      <p>Data: {reservationData.date.toLocaleDateString()}</p>
      <p>Horário: {reservationData.time}</p>
      {/* Adicione outros detalhes da reserva aqui */}
      <button onClick={handleConfirm}>Confirmar Reserva</button>
    </>
  );
};

export default ConfirmationStep;
