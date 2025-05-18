"use client";

import { useRef, useEffect, Suspense } from "react";
import { useInView } from "framer-motion";

// Testimonials data
const testimonials = [
  {
    quote:
      "RV IT Consulting transformed our recruitment process, delivering top-tier talent 50% faster than our previous partners.",
    name: "Sarah Johnson",
    title: "CTO, TechCorp",
    avatar: "👩‍💼",
  },
  {
    quote:
      "Their project support team seamlessly integrated with our developers, becoming an invaluable extension of our team.",
    name: "Michael Chen",
    title: "Engineering Director, FinTech Solutions",
    avatar: "👨‍💻",
  },
  {
    quote:
      "The technical training program upskilled our entire department, with measurable improvements in productivity.",
    name: "David Rodriguez",
    title: "Head of Learning, Enterprise Inc.",
    avatar: "👨‍🏫",
  },
  {
    quote:
      "We scaled from 10 to 100 engineers in 6 months thanks to RV's global staffing solutions.",
    name: "Emily Wilson",
    title: "VP of Engineering, StartupX",
    avatar: "👩‍🔬",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      // Animate heading and cards when in view
      headingRef.current?.classList.add("animate-in-left");

      cardsRef.current.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        card.classList.add("animate-in-up");
      });
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-gray-950 flex items-center justify-center "
    >
      <Suspense
        fallback={<div className="text-white text-center">Loading...</div>}
      >
        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24 ">
          <div className="text-center mb-16">
            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl font-bold text-white mb-4 opacity-0"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Client Testimonials
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hear what our clients say about working with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 opacity-0 hover:bg-gray-700/30 transition-colors"
              >
                <div className="flex items-start mb-6">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <p className="text-white font-bold">{testimonial.name}</p>
                    <p className="text-gray-400">{testimonial.title}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                <div className="flex mt-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-yellow-400"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Suspense>
    </section>
  );
}
