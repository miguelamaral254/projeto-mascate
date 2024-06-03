import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CalendarComponent from './CalendarComponent';
import TableLayout from './TableLayout';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import InputMask from 'react-input-mask';
import { Table } from '../../types/table';
import { FormData } from '../../types/formData';
import Image from 'next/image';
import tables from "../../../public/images/mesap.png"
import tablem from "../../../public/images/mesam.png"
import tableg from "../../../public/images/mesag.png"

const ReservationForm: React.FC = () => {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [tableSize, setTableSize] = useState<string>('');

  const customerName = watch('name');
  const cpf = watch('cpf');
  const phoneNumber = watch('phoneNumber');
  const employeeId = watch('employeeId');

  const isStep1Complete = customerName && cpf && phoneNumber && employeeId;
  const isStep2Complete = selectedTime && selectedTable;
  const isStep3Complete = tableSize !== '';

  const onSubmit = async (data: FormData) => {
    const reservationId = uuidv4();
    data.reservationId = reservationId;

    const reservationData = {
      date: selectedDate?.toISOString().split('T')[0],
      time: selectedTime,
      tableType: selectedTable?.type,
      customerName: data.name,
      cpf: data.cpf,
      phoneNumber: data.phoneNumber,
      employeeId: data.employeeId,
      table: selectedTable,
    };

    try {
      const response = await fetch('/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        throw new Error('Failed to create reservation');
      }

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
    } catch (error: unknown) {
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
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
      {currentStep === 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Informações do Cliente</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Nome:</label>
            <input {...register('name', { required: true, pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/ })} type="text" className="input-field" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">CPF:</label>
            <InputMask
              {...register('cpf', { required: true, pattern: /[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/ })}
              mask="999.999.999-99"
              inputMode="numeric"
              className="input-field"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Número de Telefone:</label>
            <InputMask
              {...register('phoneNumber', { required: true, pattern: /\(\d{2}\) \d{1} \d{4}-\d{4}/ })}
              mask="(99) 9 9999-9999"
              inputMode="numeric"
              className="input-field"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">ID do Funcionário:</label>
            <input {...register('employeeId', { required: true, pattern: /^[0-9]*$/ })} type="text" className="input-field" />
          </div>
          <div className="mt-4 flex justify-between">
            <button>
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className={`py-2 px-4 rounded-md transition duration-300 ${isStep1Complete ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              disabled={!isStep1Complete}
            >
              Próximo
            </button>
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Selecione a Data e Hora</h2>
          <CalendarComponent onDateChange={(date) => setSelectedDate(date)} />
          <div className="mb-4">
            <label className="block text-gray-700">Horário:</label>
            <select {...register('time', { required: true })} className="input-field" onChange={(e) => handleTimeSelect(e.target.value)}>
              <option value="">Selecione um horário</option>
              {['12:00', '13:00', '14:00', '17:00', '18:00', '19:00', '20:00'].map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={handlePreviousStep}
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className={`py-2 px-4 rounded-md transition duration-300 ${selectedDate && selectedTime ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              disabled={!selectedDate || !selectedTime}
            >
              Próximo
            </button>
          </div>
        </div>
      )}
      {currentStep === 3 && (
        <div className='flex flex-col w-full h-full p-10'>
          <h2 className="text-xl font-semibold mb-4">Selecione o Tamanho da Mesa</h2>
          <div className="flex justify-around">
           <div onClick={() => handleTableSizeSelect('P')} className={`cursor-pointer ${tableSize === 'P' ? 'border-2 border-blue-500' : ''}`}>
  <Image src={tables} alt='small table'/>
  <p className="text-center mt-2">Pequena</p>
</div>
<div onClick={() => handleTableSizeSelect('M')} className={`cursor-pointer ${tableSize === 'M' ? 'border-2 border-blue-500' : ''}`}>
  <Image src={tablem} alt='medium table'/>
  
  <p className="text-center mt-2">Média</p>
</div>
<div onClick={() => handleTableSizeSelect('G')} className={`cursor-pointer ${tableSize === 'G' ? 'border-2 border-blue-500' : ''}`}>
  <Image src={tableg} alt='Great table'/>
  <p className="text-center mt-2">Grande</p>
</div>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={handlePreviousStep}
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className={`py-2 px-4 rounded-md transition duration-300 ${isStep3Complete ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              disabled={!isStep3Complete}
            >
              Próximo
            </button>
          </div>
        </div>
      )}
      {currentStep === 4 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Selecione a Mesa</h2>
          <TableLayout
            date={selectedDate}
            time={selectedTime}
            onTableSelect={handleTableSelect}
            selectedTable={selectedTable}
            tableSize={tableSize}
          />
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={handlePreviousStep}
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className={`py-2 px-4 rounded-md transition duration-300 ${selectedTable ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              disabled={!selectedTable}
            >
              Próximo
            </button>
          </div>
        </div>
      )}
      {currentStep === 5 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Confirmação da Reserva</h2>
          <p>Por favor, confirme os detalhes da reserva:</p>
          <ul className="list-none mt-4">
            <li>Nome do Cliente: {customerName}</li>
            <li>CPF: {cpf}</li>
            <li>Número de Telefone: {phoneNumber}</li>
            <li>ID do Funcionário: {employeeId}</li>
            <li>Data da Reserva: {selectedDate?.toISOString().split('T')[0]}</li>
            <li>Horário da Reserva: {selectedTime}</li>
            <li>Mesa Selecionada: {selectedTable?.number} com {selectedTable?.numChairs} cadeiras</li>
          </ul>
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={handlePreviousStep}
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Anterior
            </button>
            <button
              type="submit"
              className="py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
            >
              Confirmar Reserva
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default ReservationForm;
