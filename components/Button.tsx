import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-button transition-all duration-fast focus-visible-ring disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantStyles = {
      primary: 'bg-primary text-neutral-white hover:bg-primary-dark active:bg-primary-dark',
      secondary: 'bg-neutral-white text-primary border-2 border-primary hover:bg-neutral-light-gray active:bg-neutral-medium-gray',
      outline: 'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-neutral-white active:bg-primary-dark',
    };
    
    const sizeStyles = {
      sm: 'h-8 px-4 text-small',
      md: 'h-10 px-6 text-body',
      lg: 'px-8 py-4 text-lg',
    };
    
    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
    
    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
