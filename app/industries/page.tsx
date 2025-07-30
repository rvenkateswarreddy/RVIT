"use client"
import { useState, useRef,useEffect } from 'react';
import Head from 'next/head';
import { useInView } from 'react-intersection-observer';
import { industryTabs } from "../components/industries/industryTabs";
import { industryData } from "../components/industries/industryData";
import { testimonials } from "../components/Testimonials/Testimonials";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Or use any preferred icon set
import DevelopementPathway from '../components/industries/DevelopementPathway';
export default function Industries() {
  const [activeTab, setActiveTab] = useState('finance');
  const containerRef = useRef(null);

  // Hover effects for industry cards
  const [hoveredCard, setHoveredCard] = useState(null);

  // Carousel index per card
  const [carouselIndexes, setCarouselIndexes] = useState(
    () => industryData[activeTab].solutions.map(() => 0)
  );
  // Hover for carousel image
  const [hoveredImage, setHoveredImage] = useState({});

  // Intersection Observers for scroll animations
  const [headerRef, headerInView] = useInView({ threshold: 0.1 });
  const [solutionsRef, solutionsInView] = useInView({ threshold: 0.1 });
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.1 });

  // Asset images for each industry (example only, adjust with actual asset paths)
  const industryAssets = {
    finance: "/assets/Tailored Solutions_for_Financial_Services.jpg",
    healthcare: "/assets/industrires/Healthcare.jpg",
    retail: "/assets/industrires/Retail.jpg",
    pharma: "/assets/industrires/Pharmaciticals.jpg",
    education: "/assets/industrires/Education.jpg",
    banking: "/assets/industrires/banking.jpg",
    // Add more as needed
  };

  // Update carousel indexes when activeTab changes
  // (to prevent out-of-range error on tab switch)
useEffect(() => {
    setCarouselIndexes(industryData[activeTab].solutions.map(() => 0));
    setHoveredCard(null);
    setHoveredImage({});
  }, [activeTab]);

  // Utility to change carousel index for a card
  const handleCarouselNav = (cardIdx, dir, imagesLength) => {
    setCarouselIndexes((prev) => {
      const next = [...prev];
      next[cardIdx] =
        (next[cardIdx] + dir + imagesLength) % imagesLength;
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100" ref={containerRef}>
      <Head>
        <title>Industries We Serve | Consulihgn Service</title>
        <meta name="description" content="50 years of Google-level expertise serving diverse industries with cutting-edge IT solutions." />
      </Head>

      {/* Hero Section */}
 <section
  className="relative py-40 px-4 bg-no-repeat bg-cover bg-center"
  style={{
    backgroundImage: `url('/assets/industrires/expertise1.jpg')`,
    backgroundPosition: 'center 20%', // shifts the image downward slightly
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-950 opacity-90"></div>

  {/* Content */}
  <div className="relative max-w-7xl mx-auto">
    <div className="text-center">
      <h1
        ref={headerRef}
        className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${
          headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
          Industry Expertise
        </span>
      </h1>
      <p
        className={`text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-150 ${
          headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        High Experienced Production-level IT solutions tailored to your industrys unique challenges
      </p>
    </div>
  </div>
</section>



      {/* Industry Navigation Tabs */}
      <section className="sticky top-0 z-10 bg-gray-950 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {industryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium text-sm md:text-base whitespace-nowrap border-b-2 transition-colors
                  ${activeTab === tab.id
                    ? 'border-cyan-400 text-cyan-300'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Content Section with Carousel grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-cyan-300">
              {industryData[activeTab].title}
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center">
              {industryData[activeTab].description}
            </p>
          </div>

          {/* Grid layout with carousel and hover effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industryData[activeTab].solutions.map((solution, cardIdx) => {
              // For carousel: each solution.images is expected to be an array of {src, alt, caption, hoverData}
              const images = solution.images || [];
              const currentImgIdx = carouselIndexes[cardIdx] || 0;
              const currentImg = images[currentImgIdx];

              return (
                <div
                  key={cardIdx}
                  onMouseEnter={() => setHoveredCard(cardIdx)}
                  onMouseLeave={() => {
                    setHoveredCard(null);
                    setHoveredImage({});
                  }}
                  className={`relative bg-gray-900 rounded-xl shadow-md overflow-hidden border border-gray-800 transition-all duration-300
                    ${hoveredCard === cardIdx ? 'shadow-lg transform -translate-y-2 border-cyan-400' : ''}`}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl mr-4
                        ${hoveredCard === cardIdx ? 'bg-cyan-900 text-cyan-300' : 'bg-gray-800 text-gray-400'}`}>
                        {solution.icon}
                      </div>
                      <h3 className="text-xl font-bold text-cyan-200">{solution.title}</h3>
                    </div>
                    <p className="text-gray-400 mb-4">{solution.description}</p>

                    {/* Carousel */}
                    {images.length > 0 && (
                      <div className="relative group mb-4">
                        <div className="w-full aspect-video bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                          <img
                            src={currentImg.src}
                            alt={currentImg.alt}
                            className="object-cover w-full h-full transition-opacity duration-300"
                            onMouseEnter={() =>
                              setHoveredImage({ [cardIdx]: true })
                            }
                            onMouseLeave={() =>
                              setHoveredImage({ [cardIdx]: false })
                            }
                          />
                          {/* Hover overlay with image data */}
                          {hoveredImage[cardIdx] && (
                            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-opacity duration-300">
                              <span className="text-cyan-200 text-base font-medium text-center px-4">
                                {currentImg.hoverData || currentImg.caption}
                              </span>
                            </div>
                          )}
                        </div>
                        {/* Carousel controls */}
                        {images.length > 1 && (
                          <>
                            <button
                              className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-950 bg-opacity-70 hover:bg-cyan-900 text-cyan-200 rounded-full p-1.5 focus:outline-none z-10"
                              onClick={() =>
                                handleCarouselNav(cardIdx, -1, images.length)
                              }
                              aria-label="Previous image"
                              type="button"
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <button
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-950 bg-opacity-70 hover:bg-cyan-900 text-cyan-200 rounded-full p-1.5 focus:outline-none z-10"
                              onClick={() =>
                                handleCarouselNav(cardIdx, 1, images.length)
                              }
                              aria-label="Next image"
                              type="button"
                            >
                              <ChevronRight size={20} />
                            </button>
                          </>
                        )}
                        {/* Carousel dots */}
                        {images.length > 1 && (
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                            {images.map((_, dotIdx) => (
                              <button
                                key={dotIdx}
                                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 border border-cyan-300
                                    ${dotIdx === currentImgIdx ? 'bg-cyan-400' : 'bg-gray-600'}
                                `}
                                onClick={() =>
                                  setCarouselIndexes((prev) => {
                                    const next = [...prev];
                                    next[cardIdx] = dotIdx;
                                    return next;
                                  })
                                }
                                aria-label={`Go to image ${dotIdx + 1}`}
                                type="button"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tech stack on card hover */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${hoveredCard === cardIdx ? 'max-h-20' : 'max-h-0'}`}
                    >
                      <div className="pt-2 border-t border-gray-800">
                        <h4 className="text-xs font-semibold text-cyan-400 uppercase mb-2">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {solution.tech.map((tech, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 bg-gray-800 rounded-md text-cyan-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Subtle hover border effect */}
                  <div
                    className={`absolute inset-0 border-2 border-transparent pointer-events-none transition-all duration-300
                      ${hoveredCard === cardIdx ? 'border-cyan-400 opacity-100' : 'opacity-0'}`}
                    style={{
                      borderRadius: 'inherit'
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industry-Specific Asset Image and Approach */}
      <section
        ref={solutionsRef}
        className="py-16 px-4 bg-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-3xl md:text-4xl font-bold text-center mb-16 transition-all duration-1000 text-cyan-300 ${solutionsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <span className="relative inline-block">
              <span className="relative z-10">Tailored Solutions for {industryData[activeTab].title}</span>
              <span
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-400 transform scale-x-0 origin-left transition-transform duration-1000 ease-out"
                style={{ transform: solutionsInView ? 'scaleX(1)' : 'scaleX(0)' }}
              />
            </span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 delay-150 ${solutionsInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h3 className="text-2xl font-bold mb-4 text-cyan-200">Our Approach</h3>
              <p className="text-gray-300 mb-6">
                {industryData[activeTab].approach}
              </p>

              <div className="space-y-4">
                {industryData[activeTab].keyBenefits.map((benefit, i) => (
                  <div key={i} className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-3">
                      <div className="w-6 h-6 rounded-full bg-cyan-800 flex items-center justify-center text-cyan-400">
                        ✓
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-cyan-300">{benefit.title}</h4>
                      <p className="text-gray-400 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Industry Asset Image instead of Case Study */}
            <div className={`relative transition-all duration-1000 delay-300 flex justify-center ${solutionsInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="bg-gray-950 rounded-xl shadow-lg overflow-hidden border border-gray-800 flex items-center justify-center w-full min-h-[320px]">
                {/* Use next/image in real app */}
                <img
                  src={industryAssets[activeTab]}
                  alt={`${industryData[activeTab].title} asset`}
                  className="w-full h-full object-cover"
                  style={{ minHeight: 320, maxHeight: 400, objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 via-cyan-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Industry?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Leverage our 50 years of Google-level expertise for your specific industry challenges.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-cyan-400 text-gray-900 font-bold rounded-lg hover:bg-cyan-300 transition-all">
              Schedule Consultation
            </button>
            <button className="px-8 py-4 border-2 border-cyan-400 text-cyan-200 font-bold rounded-lg hover:bg-cyan-400 hover:text-gray-950 transition-all">
              View All Case Studies
            </button>
          </div>
        </div>
      </section>
     <DevelopementPathway />
      {/* Global styles */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}