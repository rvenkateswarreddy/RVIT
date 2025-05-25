import React, { memo } from "react";

interface Props {
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  name: string;
  ariaLabel: string;
}

const CategoryButton = memo(({ active, onClick, icon, name, ariaLabel }: Props) => (
  <button
    aria-label={ariaLabel}
    onClick={onClick}
    className={`
      px-5 py-2.5 rounded-full text-sm font-semibold 
      transition-all duration-200 flex items-center shadow-sm 
      focus:outline-none focus:ring-2 focus:ring-blue-500
      ${active
        ? "bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-lg shadow-blue-500/30 scale-105"
        : "bg-gray-900 text-blue-300 border border-blue-700 hover:bg-blue-950 hover:text-white"
      }
    `}
    tabIndex={0}
    type="button"
  >
    {icon && <span className="mr-2">{icon}</span>}
    {name}
  </button>
));

CategoryButton.displayName = "CategoryButton";
export default CategoryButton;