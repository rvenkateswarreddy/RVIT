"use client";

const techCategories = [
  {
    title: "Frontend",
    color: "from-blue-400 to-cyan-400",
    techs: [
      { name: "React", icon: "⚛️" },
      { name: "Angular", icon: "🅰️" },
      { name: "Vue", icon: "🖖" },
      { name: "Next.js", icon: "⏭️" },
      { name: "TypeScript", icon: "📘" },
      { name: "Tailwind", icon: "🎨" },
      { name: "SAP UI5", icon: "💠" },
    ],
  },
  {
    title: "Backend",
    color: "from-green-400 to-teal-400",
    techs: [
      { name: "Node.js", icon: "🟢" },
      { name: "Python", icon: "🐍" },
      { name: "Java", icon: "☕" },
      { name: ".NET", icon: "🔷" },
      { name: "Go", icon: "🐹" },
      { name: "Ruby", icon: "💎" },
      { name: "SAP ABAP", icon: "🅱️" },
    ],
  },
  {
    title: "Mobile & Cross-Platform",
    color: "from-pink-400 to-purple-400",
    techs: [
      { name: "React Native", icon: "📱" },
      { name: "Flutter", icon: "🦋" },
      { name: "Swift", icon: "🍏" },
      { name: "Kotlin", icon: "🟪" },
      { name: "SAP Fiori", icon: "🌺" },
    ],
  },
  {
    title: "Databases & Cloud",
    color: "from-yellow-400 to-green-400",
    techs: [
      { name: "MongoDB", icon: "🍃" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "MySQL", icon: "🐬" },
      { name: "Redis", icon: "🔴" },
      { name: "SAP HANA", icon: "🔶" },
      { name: "AWS", icon: "☁️" },
      { name: "Azure", icon: "🔵" },
      { name: "GCP", icon: "🌤️" },
    ],
  },
  {
    title: "DevOps & Automation",
    color: "from-indigo-400 to-blue-400",
    techs: [
      { name: "Docker", icon: "🐳" },
      { name: "Kubernetes", icon: "☸️" },
      { name: "Terraform", icon: "🏗️" },
      { name: "Git", icon: "📌" },
      { name: "CI/CD", icon: "🔁" },
      { name: "Jenkins", icon: "🤖" },
      { name: "Ansible", icon: "🅰️" },
    ],
  },
  {
    title: "Trending Tech & All Courses",
    color: "from-fuchsia-400 to-sky-400",
    techs: [
      { name: "AI & Machine Learning", icon: "🤖" },
      { name: "Deep Learning", icon: "🌊" },
      { name: "AI Agents", icon: "🕵️‍♂️" },
      { name: "SEO", icon: "🔍" },
      { name: "Data Science", icon: "📊" },
      { name: "SAP All Courses", icon: "🎓" },
      { name: "All Trending Clouds", icon: "☁️" },
      { name: "All Training & Remaining Tech", icon: "🗂️" },
    ],
  }
];
export default function TechCardsGrid() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {techCategories.map((category, catIdx) => (
        <div
          key={category.title}
          className={`bg-gradient-to-br ${category.color} rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-gray-800
            hover:scale-105 transition-transform duration-500 animate-fade-in`}
          style={{ animationDelay: `${catIdx * 0.12}s` }}
        >
          <h2 className="text-2xl font-bold text-white mb-5">{category.title}</h2>
          <div className="flex flex-wrap justify-center gap-5">
            {category.techs.map((tech, idx) => (
              <div
                key={tech.name}
                className={`flex flex-col items-center m-2 bg-black/40 rounded-xl px-4 py-3 border border-gray-700 shadow-lg
                  hover:bg-black/60 transition-colors duration-300 group animate-pop-in`}
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                <span className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">{tech.icon}</span>
                <span className="text-white font-medium text-lg">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <style jsx global>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: scale(0.96) translateY(40px);}
          100% { opacity: 1; transform: scale(1) translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.9s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.7);}
          100% { opacity: 1; transform: scale(1);}
        }
        .animate-pop-in {
          animation: pop-in 0.7s cubic-bezier(.4,0,.2,1) both;
        }
      `}</style>
    </div>
  );
}