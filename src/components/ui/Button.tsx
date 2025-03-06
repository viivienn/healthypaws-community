
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'primary' | 'subtle';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", isLoading = false, children, ...props }, ref) => {
    // Map our custom variants to shadcn variants or custom classes
    const variantClasses = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300",
      subtle: "bg-secondary/80 text-secondary-foreground hover:bg-secondary/60",
    };
    
    // Use our custom variant or the default shadcn one
    const resolvedVariant = (variant === 'primary' || variant === 'subtle') 
      ? 'default'  // Use default for shadcn, but we'll override with our classes
      : variant;   // Use shadcn's built-in variant
      
    const customClasses = (variant === 'primary' || variant === 'subtle') 
      ? variantClasses[variant]
      : '';
      
    return (
      <ShadcnButton
        ref={ref}
        variant={resolvedVariant}
        size={size}
        className={cn(
          customClasses,
          "font-medium rounded-xl transition-all duration-300",
          isLoading && "opacity-70 cursor-not-allowed",
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {children}
          </div>
        ) : (
          children
        )}
      </ShadcnButton>
    );
  }
);

Button.displayName = "Button";

export { Button };
