/**
 * Input Component
 * Reusable input field with label, error state, and icon support
 */

/**
 * @param {Object} props - Component props
 * @param {string} [props.label] - Input label
 * @param {string} [props.error] - Error message
 * @param {React.ReactNode} [props.icon] - Icon element
 * @param {string} [props.className=''] - Additional CSS classes
 */
const Input = ({ label, error, icon, className = '', ...props }) => {
    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <div className="relative rounded-md shadow-sm">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    className={`
            block w-full rounded-lg border-gray-300 focus:ring-brand-500 focus:border-brand-500 sm:text-sm p-3
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border'}
            ${className}
          `}
                    {...props}
                />
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default Input;
