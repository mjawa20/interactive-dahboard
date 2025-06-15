import { forwardRef, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  className,
  options,
  label,
  error,
  fullWidth = false,
  ...props
}, ref) => {
  return (
    <div className={cn('flex items-center gap-3', fullWidth ? 'w-full' : 'w-fit')}>
      {label && (
        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            'appearance-none pl-3 pr-10 py-2 border rounded-md shadow-sm',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
            'disabled:opacity-50 disabled:bg-gray-100',
            error ? 'border-red-500' : 'border-gray-300',
            'bg-white text-sm',
            fullWidth ? 'w-full' : 'w-48',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';