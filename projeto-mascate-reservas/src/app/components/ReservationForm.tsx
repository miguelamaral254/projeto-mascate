import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Table } from '../types/table';
import ConfirmationStep from './reservationForm/ConfirmationStep';
import ClientInfoStep from './reservationForm/ClientInfoStep';
import CalendarStep from './reservationForm/CalendarStep';
import TableSizeStep from './reservationForm/TableSizeStep';
import TableStep from './reservationForm/TableStep';
import { createReservation } from '../services/createReservationService';
import { FormData } from '../types/formData';
//import { v4 as uuidv4 } from 'uuid';

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
  //  const reservationId = uuidv4();
  //data.idReservation = reservationId;
    data.table = selectedTable?.tableId || 0; // Atribua apenas o número da mesa
    data.date = selectedDate.toISOString().split('T')[0]; // Formatar a data
    data.time = selectedTime;
    let cpfFormatado = data.cpf.replace(/[.-]/g, ''); 
    let phone
    data.cpf = cpfFormatado;
    data.employeeId = Number(employeeId)
    console.log(data); 

    try {
      await createReservation(data);

      const confirmationText =
        `Reserva para a mesa ${selectedTable?.tableId} com ${selectedTable?.chairs} cadeiras<br/>` +
        `no dia ${selectedDate?.toISOString().split('T')[0]} às ${selectedTime}<br/>` +
        `foi realizada com sucesso.<br/>` +
        `Nome do cliente: ${name}<br/>` +
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
    setValue('table', table.tableId); 
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
          name={customerName}
          employeeId={employeeId}
        />
      )}
    </form>
  );
};

export default ReservationForm;
