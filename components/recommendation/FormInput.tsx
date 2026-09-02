'use client';

interface FormInputProps {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'email';
  placeholder?: string;
  value: string | number;
  onChange: (value: string | number) => void;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
}

export function FormInput({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  min,
  max,
  step,
  required = false,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-black dark:text-white">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          const val = type === 'number' ? (e.target.value === '' ? '' : parseFloat(e.target.value)) : e.target.value;
          onChange(val);
        }}
        min={min}
        max={max}
        step={step}
        className={`px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 dark:border-red-500 focus:ring-red-500'
            : 'border-zinc-300 dark:border-zinc-600 focus:ring-green-500'
        } bg-white dark:bg-zinc-800 text-black dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
