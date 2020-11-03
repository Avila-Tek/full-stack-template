import React from 'react';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

function Card({ children, className = '' }: CardProps) {
  return (
    <section
      className={`flex flex-col flex-wrap w-full bg-white rounded-md shadow mx-auto mb-8 ${className}`}
    >
      <div className="flex flex-col flex-wrap w-full bg-white rounded-md shadow mx-auto px-6 pt-4 pb-6">
        {children}
      </div>
    </section>
  );
}

export default Card;
