import Image from "next/image";
import aboutImage from "../../public/slider2.jpg"; // Replace with your image path
import Animation from "./Animation";

export default function AboutSection() {
  return (
    <section className="py-10 md:py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          {/* Image - Left Side (Desktop) */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <Image
                src={aboutImage}
                alt="Our team working together"
                fill
                className="object-cover"
                placeholder="blur"
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 mix-blend-multiply" />
            </div>
            <div className="absolute -z-10 -bottom-6 -left-6 w-full h-full border-2 border-gray-200 rounded-lg" />
          </div>

          {/* Content - Right Side (Desktop) */}
          <div className="w-full md:w-1/2">
            <Animation
              title="About Our Company"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            />

            <p className="text-lg text-gray-200 mb-6">
              Founded in 2010, we've been delivering exceptional solutions to
              our clients worldwide. Our team of dedicated professionals brings
              together decades of combined experience.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg
                      className="h-3 w-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <p className="ml-3 text-base text-gray-200">
                  <span className="font-semibold">150+ Projects</span> completed
                  successfully
                </p>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg
                      className="h-3 w-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <p className="ml-3 text-base text-gray-200">
                  <span className="font-semibold">50+ Professionals</span> in
                  our expert team
                </p>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg
                      className="h-3 w-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <p className="ml-3 text-base text-gray-200">
                  <span className="font-semibold">10+ Countries</span> served
                  worldwide
                </p>
              </div>
            </div>

            <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
              Learn More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
