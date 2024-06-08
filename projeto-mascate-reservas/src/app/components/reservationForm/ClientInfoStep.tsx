"use client"
import React, { useState } from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { FormData } from '../../types/formData';
import ReactInputMask from 'react-input-mask';
import Btn from '../Btn';
import Image from 'next/image';

import logo from "@/../../public/images/Logo.png"

interface ClientInfoStepProps {
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
  isStep1Complete :boolean;
  handleNextStep: () => void;

}

const ClientInfoStep: React.FC<ClientInfoStepProps> = ({ register, watch, handleNextStep }) => {
  const { name, cpf, phoneNumber, employeeId } = watch();
  const [nameFocused, setNameFocused] = useState(false);
  const [cpfFocused, setCpfFocused] = useState(false); // Adicionado o estado para CPF
  const [phoneNumberFocused, setPhoneNumberFocused] = useState(false);
  const [employeeIdFocused, setEmployeeIdFocused] = useState(false);

  const isStep1Complete = !!name && !!cpf && !!phoneNumber && !!employeeId;

  return (
    <div>
      <div className='flex flex-col justify-center items-center'>
        <Image src={logo} alt="logo" className="w-30 h-30 p-5"/>
        <h2 className="text-xl font-semibold mb-5 text-white">Realizar nova reserva</h2>
      </div>
      <div className="mb-4 relative z-0">
        <input
          {...register('name', { required: true, pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/ })}
          type="text"
          id="name"
          className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-primary appearance-none focus:outline-none focus:ring-0 focus:border-white"
          required
          onClick={() => setNameFocused(true)}
          onBlur={() => setNameFocused(false)}
        />
        <label
          htmlFor="name"
          className={`absolute text-sm ${nameFocused ? 'text-white' :'text-primary'} duration-300 scale-75 top-4 left-0 origin-[0] ${
            (name || nameFocused) ? '-translate-y-5' : ''
          }`}
        >
          Nome:
        </label>
      </div>
      <div className="mb-4 relative z-0">
        <ReactInputMask
          {...register('cpf', { required: true, pattern: /[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/ })}
          mask="999.999.999-99"
          inputMode="numeric"
          id="cpf"
          className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-primary appearance-none focus:outline-none focus:ring-0 focus:border-white"
          required
          onFocus={() => setCpfFocused(true)} 
          onBlur={() => setCpfFocused(false)} 
        />
        <label htmlFor="cpf" className={`absolute text-sm ${cpfFocused ? 'text-white' :  'text-primary'} duration-300 scale-75 top-4 left-0 origin-[0] ${cpf ? '-translate-y-6' : ''}`}>CPF:</label>
      </div>
      
      <div className="mb-4 relative z-0">
        <ReactInputMask
          {...register('phoneNumber', { required: true, pattern: /\(\d{2}\) \d{1} \d{4}-\d{4}/ })}
          mask="(99) 9 9999-9999"
          inputMode="numeric"
          id="phoneNumber"
          className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-primary appearance-none focus:outline-none focus:ring-0 focus:border-white"
          required
          onFocus={() => setPhoneNumberFocused(true)}
          onBlur={() => setPhoneNumberFocused(false)}
        />
        <label htmlFor="phoneNumber" className={`absolute text-sm ${phoneNumberFocused ? 'text-white' : 'text-primary'} duration-300 scale-75 top-4 left-0 origin-[0] ${phoneNumber ? '-translate-y-6' : ''}`}>Número de Telefone:</label>
      </div>
      
      <div className="mb-4 relative z-0">
        <input
          {...register('employeeId', { required: true, pattern: /^[0-9]*$/ })}
          type="text"
          id="employeeId"
          className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-primary appearance-none focus:outline-none focus:ring-0 focus:border-white"
          required
          onClick={() => setEmployeeIdFocused(true)}
          onBlur={() => setEmployeeIdFocused(false)}
        />
        <label
          htmlFor="employeeId"
          className={`absolute text-sm ${employeeIdFocused ? 'text-white' : 'text-primary'} duration-300 scale-75 top-4 left-0 origin-[0] ${
            (employeeId || employeeIdFocused) ? '-translate-y-5' : ''
          }`}
        >
          ID do Funcionário:        
        </label>
      </div>
      
      <div className="mt-4 flex justify-between">
        <button className='text-white bg-red-600 hover:bg-red-500 p-3 rounded-md'>Cancelar</button>
        <Btn onClick={handleNextStep} text='next' disabled={!isStep1Complete} />
      </div>
    </div>
  );
};

export default ClientInfoStep;
