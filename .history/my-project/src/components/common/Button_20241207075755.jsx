export function Button({ children, variant = 'primary', ...props }) {
    const styles = {
      primary: 'bg-blue-500 hover:bg-blue-600 text-white',
      secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
      outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50'
    };
  
    return (
      <button 
        className={`px-4 py-2 rounded-lg transition-colors ${styles[variant]}`}
        {...props}
      >
        {children}
      </button>
    );
  }