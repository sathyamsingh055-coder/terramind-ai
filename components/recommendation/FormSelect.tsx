'use client';

interface FormSelectProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export function FormSelect({
  label,
  name,
  options,
  value,
  onChange,
  error,
  required = false,
}: FormSelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-black dark:text-white">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 dark:border-red-500 focus:ring-red-500'
            : 'border-zinc-300 dark:border-zinc-600 focus:ring-green-500'
        } bg-white dark:bg-zinc-800 text-black dark:text-white`}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
