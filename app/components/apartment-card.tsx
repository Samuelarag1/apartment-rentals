import Image from "next/image";

interface ApartmentCardProps {
  title: string;
  description: string;
  price: number;
  image: string;
}

export function ApartmentCard({
  title,
  description,
  price,
  image,
}: ApartmentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={image}
        alt={title}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-800">
            ${price.toLocaleString()}/mes
          </span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
}
