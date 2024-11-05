import type { HTMLInputTypeAttribute } from 'react';

interface InputProps {
  id: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  error?: string;
  register: React.HTMLProps<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  error,
  register,
  type = 'text',
}) => {
  return (
    <div className='relative'>
      <input
        {...register}
        type={type}
        id={id}
        className={`
          block 
          rounded-md 
          px-6 
          pt-6 
          pb-1 
          w-full 
          text-md 
          text-slate-100 
          bg-slate-800 
          appearance-none 
          focus:outline-none 
          focus:ring-0 peer
          ${error ? 'border-red-500 border-2' : 'border-slate-800'}
        `}
        placeholder=' '
      />
      <label
        htmlFor={id}
        className='
          absolute 
          text-md 
          text-slate-400
          duration-150 
          transform 
          -translate-y-3 
          scale-75 
          top-4 
          z-10 
          origin-[0] 
          left-6 
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75 
          peer-focus:-translate-y-3
        '
      >
        {label}
      </label>
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
};

export default Input;
