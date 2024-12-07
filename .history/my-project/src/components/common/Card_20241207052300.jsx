export const Card = ({ title, description, image, ...props }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden" {...props}>
        {image && (
          <img src={image} alt={title} className="w-full h-48 object-cover" />
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    );
  };