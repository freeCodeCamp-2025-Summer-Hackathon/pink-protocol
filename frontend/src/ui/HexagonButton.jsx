export const HexagonButton = ({
  children,
  onClick,
  variant = 'green',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) => {
  const baseClasses =
    'relative font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center'
  const sizeClasses = {
    sm: 'w-14 h-16 text-xs',
    md: 'w-18 h-20 text-sm',
    lg: 'w-21 h-24 text-base',
    xl: 'w-24 h-28 text-lg',
  }
  const variantClasses = {
    green: `
      bg-green-leaf-500 hover:bg-green-leaf-600 text-white
      focus:ring-green-leaf-500 disabled:bg-green-leaf-300 disabled:cursor-not-allowed
    `,
    red: `
      bg-red-terra-500 hover:bg-red-terra-600 text-white
      focus:ring-red-terra-500 disabled:bg-red-terra-300 disabled:cursor-not-allowed
    `,
    primary: `
      bg-blue-500 hover:bg-blue-600 text-white
      focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed
    `,
    secondary: `
      bg-gray-500 hover:bg-gray-600 text-white
      focus:ring-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed
    `,
    success: `
      bg-green-500 hover:bg-green-600 text-white
      focus:ring-green-500 disabled:bg-green-300 disabled:cursor-not-allowed
    `,
    warning: `
      bg-yellow-500 hover:bg-yellow-600 text-white
      focus:ring-yellow-500 disabled:bg-yellow-300 disabled:cursor-not-allowed
    `,
    danger: `
      bg-red-500 hover:bg-red-600 text-white
      focus:ring-red-500 disabled:bg-red-300 disabled:cursor-not-allowed
    `,
    hive: `
      bg-honey-500 hover:bg-honey-600 text-white
      focus:ring-honey-500 disabled:bg-honey-300 disabled:cursor-not-allowed
    `,
  }
  return (
    <button
      className={` ${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className} `}
      disabled={disabled}
      style={{
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
      }}
      onClick={onClick}
      {...props}
    >
      <div className="p-2 text-center">{children}</div>
    </button>
  )
}

export default HexagonButton
