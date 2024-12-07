export const Form = ({ children, onSubmit, ...props }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit?.(e);
    };
  
    return (
      <form 
        onSubmit={handleSubmit} 
        className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
        {...props}
      >
        {children}
      </form>
    );
  };