import React from "react";

interface SkillGridProps {
  skills: string[];
  label?: string;
  className?: string;
}

export default function SkillGrid({ skills, label, className }: SkillGridProps) {
  if (!skills || skills.length === 0) return null;
  return (
    <section className={className || "mb-8"}>
      {label && (
        <h3 className="text-xl font-bold text-blue-400 mb-3">{label}</h3>
      )}
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="inline-block bg-blue-800/90 text-blue-100 px-4 py-2 rounded-lg font-medium text-base shadow-sm hover:bg-blue-700/90 transition-all duration-150"
            style={{
              maxWidth: "300px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title={skill}
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}