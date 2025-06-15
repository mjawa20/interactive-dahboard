import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const buttonVariants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
  outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-blue-500',
  link: 'bg-transparent text-blue-600 hover:text-blue-800 hover:underline p-0 h-auto'
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  isLoading = false,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'transition-colors duration-200',
        'disabled:opacity-50 disabled:pointer-events-none',
        buttonVariants[variant],
        buttonSizes[size],
        fullWidth ? 'w-full' : 'w-auto',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
      )}
      {children}
    </button>
  );
});

Button.displayName = 'Button';