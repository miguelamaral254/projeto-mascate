import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { Table } from '../types/table';
import { Reservation } from '../types/reservation'
import { FormData } from '../types/formData';
import ConfirmationStep from './reservationForm/ConfirmationStep';
import ClientInfoStep from './reservationForm/ClientInfoStep';
import CalendarStep from './reservationForm/CalendarStep';
import TableSizeStep from './reservationForm/TableSizeStep';
import TableStep from './reservationForm/TableStep';
import { createReservation } from '../services/reservationService';

const ReservationForm: React.FC = () => {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [tableSize, setTableSize] = useState<string>('');

  const customerName = watch('name');
  const employeeId = watch('employeeId');

  const isStep3Complete = tableSize !== '';

  const onSubmit = async (data: FormData) => {
    const reservationId = uuidv4();
    data.reservationId = reservationId;

    const reservationData: Reservation = {
      customerName: data.name,
      cpf: data.cpf,
      phoneNumber: data.phoneNumber,
      employeeId: data.employeeId,
      reservationId: reservationId,
      reservation: {
        date: selectedDate?.toISOString().split('T')[0] || '',
        time: selectedTime,
        tableId: selectedTable ? selectedTable.number : 0, // Use selectedTable.number como ID da mesa
      },
      id: 0, // Pode ser um valor padrão, pois será atribuído pelo servidor
    };
  

    try {
      await createReservation(reservationData);

      const confirmationText =
        `Reserva para a mesa ${selectedTable?.number} com ${selectedTable?.numChairs} cadeiras<br/>` +
        `no dia ${selectedDate?.toISOString().split('T')[0]} às ${selectedTime}<br/>` +
        `foi realizada com sucesso.<br/>` +
        `Nome do cliente: ${customerName}<br/>` +
        `ID do funcionário: ${employeeId}`;

      Swal.fire({
        title: 'Reserva Realizada',
        html: confirmationText,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.href = "/";
      });

      setCurrentStep(5);
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({
          title: 'Erro',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          title: 'Erro',
          text: 'Ocorreu um erro desconhecido',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleTableSelect = (table: Table) => {
    setValue('table', table);
    setSelectedTable(table);
  };

  const handleTableSizeSelect = (size: string) => {
    setTableSize(size);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-8 bg-secondary shadow-md rounded-lg">
      {currentStep === 1 && (
        <ClientInfoStep
          register={register}
          watch={watch}
          handleNextStep={handleNextStep}
          isStep1Complete={true}
        />
      )}
      {currentStep === 2 && (
        <CalendarStep
          register={register}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
          handleTimeSelect={handleTimeSelect}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
        />
      )}
      {currentStep === 3 && (
        <TableSizeStep
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
          handleTableSizeSelect={handleTableSizeSelect}
          tableSize={tableSize}
          isStep3Complete={isStep3Complete}
        />
      )}
      {currentStep === 4 && (
        <TableStep
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
        handleTableSelect={handleTableSelect}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedTable={selectedTable}
        tableSize={tableSize}
      />

      )}
      {currentStep === 5 && (
        <ConfirmationStep
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          selectedTable={selectedTable}
          onPreviousStep={handlePreviousStep}
          onSubmit={handleSubmit(onSubmit)}
          customerName={customerName}
          employeeId={employeeId}
        />
      )}
    </form>
  );
};

export default ReservationForm;
