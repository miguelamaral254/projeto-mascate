import React, { useState } from 'react';
import CustomerInfoStep from './CustomerInfoStep';
import TableSelectionStep from './TableSelectionStep';
import ConfirmationStep from './ConfirmationStep';

const ReservationWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [reservationData, setReservationData] = useState<any>({});

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleCustomerInfoSubmit = (data: any) => {
    setReservationData({ ...reservationData, ...data });
    handleNextStep();
  };

  const handleTableSelect = (tableType: string, tableNumber: number) => {
    setReservationData({ ...reservationData, tableType, tableNumber });
    handleNextStep();
  };

  const handleConfirm = () => {
    // Aqui você pode enviar os dados da reserva para a API
    // Implemente a lógica de envio dos dados da reserva para a API aqui
    console.log('Dados da reserva:', reservationData);
    // Reinicie os dados da reserva após a confirmação
    setReservationData({});
    setCurrentStep(1); // Reinicie o wizard para a etapa inicial
  };

  return (
    <div>
      {currentStep === 1 && (
        <CustomerInfoStep onNextStep={handleCustomerInfoSubmit} />
      )}
      {currentStep === 2 && (
        <TableSelectionStep
          date={new Date()} // Adicione a data desejada aqui
          time="12:00" // Adicione o horário desejado aqui
          onTableSelect={handleTableSelect}
          onNextStep={handleNextStep}
        />
      )}
      {currentStep === 3 && (
        <ConfirmationStep
          reservationData={reservationData}
          onConfirm={handleConfirm}
        />
      )}
      {/* Botões de navegação entre as etapas */}
      {currentStep > 1 && (
        <button
          onClick={handlePrevStep}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mr-2"
        >
          Anterior
        </button>
      )}
      {currentStep < 3 && (
        <button
          onClick={handleNextStep}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Próximo
        </button>
      )}
    </div>
  );
};

export default ReservationWizard;
