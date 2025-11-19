 
import type { ChangeEvent } from "react";

interface SearchInputProps {
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string; // للتحكم فى الشكل
}

export const SearchInput = ({
  type,
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}: SearchInputProps) => {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleInput}
      placeholder={placeholder}
      className={`border p-2 rounded w-full ${className}`}
    />
  );
};
