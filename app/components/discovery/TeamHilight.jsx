'use client';

import { motion } from 'framer-motion';

const stats = [
  {
    icon: "👩‍💻",
    title: "Skilled Professionals",
    value: "50+",
    desc: "AI engineers, product leaders, cloud architects, and more."
  },
  {
    icon: "🏢",
    title: "Enterprise Experience",
    value: "7+ Years",
    desc: "Proven track record delivering scalable solutions for global brands."
  },
  {
    icon: "🌍",
    title: "Global Impact",
    value: "10+ Countries",
    desc: "Our work spans continents, empowering businesses everywhere."
  }
];

const TeamHighlight = () => (
  <section className="py-20 px-4 bg-blue-600 my-20 text-white">
    <div className="max-w-7xl mx-auto">
      <div className="bg-gray-900/80 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-gray-800 shadow-2xl shadow-blue-900/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Built by Experts,{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Backed by Vision
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto">
            At <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">RV IT</span>, our strength lies in the diversity and vision of our people. From pioneering AI engineers to seasoned project managers, our global talent pool brings innovation, agility, and commitment to every challenge—local and global.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((item, idx) => (
            <motion.div
              key={item.title}
              className="group relative bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800 hover:border-cyan-500/30 transition-all duration-300 shadow-lg shadow-blue-900/10 hover:shadow-cyan-500/20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-blue-900/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex flex-col items-center text-center h-full">
                <div className="text-5xl mb-5 p-3 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-full">
                  {item.icon}
                </div>
                <span className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                  {item.value}
                </span>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base flex-grow">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Meet the minds
            </span>{' '}
            behind every solution. Our team is the catalyst for innovation, growth, and trust—today and tomorrow.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default TeamHighlight;