import {
  FiCode,
  FiServer,
  FiLayers,
  FiFilm,
  FiFileText,
  FiBriefcase,
} from "react-icons/fi";
import React from "react";

const iconComponents: Record<string, React.ReactNode> = {
  code: <FiCode className="text-blue-400" aria-label="code" />,
  server: <FiServer className="text-purple-400" aria-label="server" />,
  layers: <FiLayers className="text-green-400" aria-label="layers" />,
  film: <FiFilm className="text-red-400" aria-label="film" />,
  fileText: <FiFileText className="text-yellow-400" aria-label="file" />,
  briefcase: <FiBriefcase className="text-indigo-400" aria-label="briefcase" />,
};

export default iconComponents;