/**
 * Button Component
 * Reusable button with multiple variants and loading state
 */

/**
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {'primary'|'secondary'|'outline'|'ghost'} [props.variant='primary'] - Button style variant
 * @param {boolean} [props.isLoading=false] - Loading state
 * @param {boolean} [props.fullWidth=false] - Full width button
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.disabled] - Disabled state
 */
const Button = ({
    children,
    variant = 'primary',
    isLoading = false,
    fullWidth = false,
    className = '',
    disabled,
    ...props
}) => {

    const baseStyles = "inline-flex items-center justify-center px-4 py-3 border text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200";

    const variants = {
        primary: "border-transparent text-white bg-brand-600 hover:bg-brand-700 focus:ring-brand-500 shadow-md hover:shadow-lg",
        secondary: "border-transparent text-brand-700 bg-brand-100 hover:bg-brand-200 focus:ring-brand-500",
        outline: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-brand-500",
        ghost: "border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    };

    const widthClass = fullWidth ? 'w-full' : '';
    const loadingClass = isLoading || disabled ? 'opacity-70 cursor-not-allowed' : '';

    return (
        <button
            disabled={isLoading || disabled}
            className={`${baseStyles} ${variants[variant]} ${widthClass} ${loadingClass} ${className}`}
            {...props}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
