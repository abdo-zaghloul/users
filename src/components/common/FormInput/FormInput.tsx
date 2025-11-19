import  type  { ChangeEvent } from "react";

interface FormInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
  className?: string;
  inputClassName?: string;
}

export const FormInput = ({
  label,
  value,
  onChange,
  onFocus,
  placeholder = "",
  type ,
  required = false,
  error = "",
  className = "",
  inputClassName = "",
}: FormInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <input
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={onFocus}
        placeholder={placeholder}
        className={`border p-2 rounded outline-none focus:border-blue-500 ${inputClassName}`}
      />

      {error && (
        <span className="text-xs text-red-500 mt-1">
          {error}
        </span>
      )}
    </div>
  );
};