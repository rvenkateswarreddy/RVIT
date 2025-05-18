import React from "react";
import Image from "next/image";
import Link from "next/link";

const SupportCard = ({ item }) => {
  return (
    <div className="bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300">
      {/* Image Section */}
      <div className="relative h-48 w-full">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-800 text-gray-400">
            <span>No Image</span>
          </div>
        )}
        {item.isTrending && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Trending
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white font-medium">{item.category}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex items-center mb-3">
          {item.icon && <div className="mr-3 text-xl">{item.icon}</div>}
          <h3 className="text-xl font-bold text-gray-100">{item.title}</h3>
        </div>
        <p className="text-gray-300 mb-4 line-clamp-3">{item.description}</p>
        <Link
          href={{
            pathname: `/supports/${item.id}`,
            query: {
              item: JSON.stringify({
                id: item.id,
                title: item.title,
                description: item.description,
                image: item.image,
                category: item.category,
                icon: item.icon,
                details: item.details,
              }),
            },
          }}
          className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors text-center w-full"
        >
          Get Support
        </Link>
      </div>
    </div>
  );
};

export default React.memo(SupportCard);
