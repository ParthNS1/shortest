/**
 * Card Component
 * Reusable card container with consistent styling
 */

/**
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className=''] - Additional CSS classes
 */
const Card = ({ children, className = '' }) => {
    return (
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
            {children}
        </div>
    );
};

export default Card;
