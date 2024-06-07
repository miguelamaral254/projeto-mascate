import React from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { FormData } from '../../../types/formData';
import ReactInputMask from 'react-input-mask';
import NavBtn from '../NavBtn';

interface ClientInfoStepProps {
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
  isStep1Complete :boolean;
  handleNextStep: () => void;
}

const ClientInfoStep: React.FC<ClientInfoStepProps> = ({ register, watch, handleNextStep }) => {
  const { name, cpf, phoneNumber, employeeId } = watch();

  const isStep1Complete = !!name && !!cpf && !!phoneNumber && !!employeeId;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Informações do Cliente</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Nome:</label>
        <input {...register('name', { required: true, pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/ })} type="text" className="input-field" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">CPF:</label>
        <ReactInputMask
          {...register('cpf', { required: true, pattern: /[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/ })}
          mask="999.999.999-99"
          inputMode="numeric"
          className="input-field"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Número de Telefone:</label>
        <ReactInputMask
          {...register('phoneNumber', { required: true, pattern: /\(\d{2}\) \d{1} \d{4}-\d{4}/ })}
          mask="(99) 9 9999-9999"
          inputMode="numeric"
          className="input-field"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">ID do Funcionário:</label>
        <input {...register('employeeId', { required: true, pattern: /^[0-9]*$/ })} type="text" className="input-field" required />
      </div>
      <div className="mt-4 flex justify-between">
        <button>
          Cancelar
        </button>
        <NavBtn onClick={handleNextStep} text='next' disabled={!isStep1Complete} />
      </div>
    </div>
  );
};

export default ClientInfoStep;
