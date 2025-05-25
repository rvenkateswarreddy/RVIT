import React, { memo } from "react";
import Image from "next/image";
import { FiArrowRight, FiLoader } from "react-icons/fi";
import iconComponents from "../constants/iconComponents";
import { SupportItem } from "../types";

interface Props {
  item: SupportItem;
  loading: boolean;
  onGetSupport: (item: SupportItem) => void;
}

const SupportCard = memo(({ item, loading, onGetSupport }: Props) => (
  <div
    className={`
      flex flex-col justify-between h-full
      bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950
      rounded-2xl border border-blue-900/30 shadow-xl
      transition-all duration-300 
      hover:shadow-2xl hover:shadow-blue-700/40 hover:-translate-y-2
      group
      overflow-hidden
    `}
    tabIndex={0}
    aria-label={item.title}
    role="listitem"
  >
    {item.image && (
      <div className="w-full h-40 relative overflow-hidden rounded-t-2xl mb-0">
        <Image
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
    )}
    <div className="p-7 pb-4 flex-1 flex flex-col">
      <div className="flex items-center mb-4">
        {item.icon && iconComponents[item.icon] && (
          <span className="flex-shrink-0 text-2xl mr-3">
            {iconComponents[item.icon]}
          </span>
        )}
        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors flex-1">
          {item.title}
        </h3>
      </div>
      <p className="text-gray-300 text-base mb-6 transition-colors duration-200 group-hover:text-blue-100 line-clamp-4">
        {item.description}
      </p>
    </div>
    <div className="w-full px-7 pb-6">
      <button
        aria-label={`Get support for ${item.title}`}
        onClick={() => onGetSupport(item)}
        disabled={!!loading}
        className={`w-full flex items-center justify-center py-3 px-6
          bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700
          text-white rounded-xl font-bold shadow-lg
          hover:from-blue-800 hover:to-indigo-800
          hover:shadow-blue-700/40
          transition-all duration-300
          group-hover:scale-105
          ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"}
        `}
        tabIndex={0}
        type="button"
      >
        {loading ? (
          <>
            <FiLoader className="animate-spin mr-2 text-xl" />
            Loading...
          </>
        ) : (
          <>
            Get Support <FiArrowRight className="ml-2" />
          </>
        )}
      </button>
    </div>
  </div>
));

SupportCard.displayName = "SupportCard";
export default SupportCard;