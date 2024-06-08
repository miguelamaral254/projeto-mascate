import React from 'react';
import Image from 'next/image';
import tables from "@/../../public/images/mesap.png"
import tablem from "@/../../public/images/mesam.png"
import tableg from "@/../../public/images/mesag.png"
import Btn from '../Btn';
import logo from "@/../../public/images/Logo.png";

interface TableSizeStepProps {
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleTableSizeSelect: (size: string) => void;
  tableSize: string;
  isStep3Complete: boolean;
}

const TableSizeStep: React.FC<TableSizeStepProps> = ({
  handleNextStep,
  handlePreviousStep,
  handleTableSizeSelect,
  tableSize,
  isStep3Complete
}) => {
  return (
    <div className='flex flex-col w-full min-h-96 items-center p-10'>
      <Image src={logo} alt="logo" className="w-30 h-30 p-5"/>
          <h2 className="text-xl font-semibold mb-4 text-primary">Selecione o Tamanho da Mesa</h2>
          <div className="flex justify-around">
           <div className='flex flex-col gap-10'>
             <div onClick={() => handleTableSizeSelect('P')} className={`cursor-pointer ${tableSize === 'P' ? 'border-2 border-blue-500' : ''}`}>
               <Image src={tables} alt='small table'/>
               <p className="text-center text-primary mt-2">Pequena</p>
             </div>
             <div onClick={() => handleTableSizeSelect('M')} className={`cursor-pointer ${tableSize === 'M' ? 'border-2 border-blue-500' : ''}`}>
               <Image src={tablem} alt='medium table'/>
               
               <p className="text-center text-primary mt-2">Média</p>
             </div>
             <div onClick={() => handleTableSizeSelect('G')} className={`cursor-pointer ${tableSize === 'G' ? 'border-2 border-blue-500' : ''}`}>
               <Image src={tableg} alt='Great table'/>
               <p className="text-center text-primary mt-2">Grande</p>
             </div>
           </div>
          </div>
          <div className="mt-4 flex w-full justify-between">
          <Btn onClick={handlePreviousStep} text='back'/>
         <Btn onClick={handleNextStep} text='next' disabled={!isStep3Complete}/>
          </div>
        </div>
      )};
export default TableSizeStep;
