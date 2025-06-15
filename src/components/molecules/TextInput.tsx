import { Input, InputProps } from '@/components/atoms/Input';
import { cn } from '@/lib/utils';

interface TexInput extends InputProps {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export function TexInput({ label, error, fullWidth, ...props }: TexInput) {
  return (
    <div className={cn('flex flex-col gap-1', fullWidth ? 'w-full' : 'w-fit')}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

      <Input
        {...props}
        className={cn(
          props.className,
          error ? 'border-red-500' : 'border-gray-300'
        )}
      />

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
