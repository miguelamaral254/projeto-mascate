"use client"
import React from 'react';
import Image from 'next/image';

interface ReservationCategoryCardProps {
  imageSrc: string;
  title: string;
  description: string;
  onClick: () => void;
}

const ReservationCategoryCard: React.FC<ReservationCategoryCardProps> = ({ imageSrc, title, description, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer border border-gray-300 rounded-lg  p-4 hover:shadow-lg transition duration-300">
      <Image src={imageSrc} alt={title} width={300} height={200} className="w-full h-32 object-fit rounded-t-lg" />
      <h3 className="text-xl font-semibold mt-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default ReservationCategoryCard;
