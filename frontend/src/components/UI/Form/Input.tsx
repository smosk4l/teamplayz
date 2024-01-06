import React, { ChangeEvent } from 'react';
import ErrorLabel from '../Error/ErrorLabel';

interface InputProps {
  type: string;
  text: string;
  id: string;
  name: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

const Input = ({
  type,
  text,
  id,
  name,
  handleChange,
  required,
  error,
}: InputProps) => {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <label htmlFor={name} className={`text-sm ${error && 'text-red-600'}`}>
        {text}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        onChange={handleChange}
        required={required}
        className={`w-full rounded-md  border-2  px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none ${
          error && 'border-red-600'
        }`}
      />
      {error && <ErrorLabel error={error} />}
    </div>
  );
};

export default Input;
