// src/components/Banner.tsx
import React, { useState, useEffect } from "react";

const Banner = () => {
  // Slide data: replace the image URLs with your actual paths
  const slides = [
    {
      heading: "The LIPAAJI Coco Beach 2025 Collection",
      heroImage: "/assets/banner/hero1 (1).jpg",
      thumb1: "/assets/banner/hero1 (2).jpg",
      thumb2: "/assets/banner/hero1 (3).jpg",
      link: "/collections/coco-beach",
    },
    {
      heading: "The LIPAAJI Summer Shoreline Collection",
      heroImage: "/assets/banner/hero2 (3).jpg",
      thumb1: "/assets/banner/hero2 (1).jpg",
      thumb2: "/assets/banner/hero2 (2).jpg",
      link: "/collections/summer-shoreline",
    },
    {
      heading: "The LIPAAJI Sunset Tropics Collection",
      heroImage: "/assets/banner/hero3 (2).jpg",
      thumb1: "/assets/banner/hero3 (1).jpg",
      thumb2: "/assets/banner/hero3 (3).jpg",
      link: "/collections/sunset-tropics",
    },
  ];


  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const [isTextFading, setIsTextFading] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIsSlidingOut(true);
      setIsTextFading(true); // start fade-out
      setTimeout(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
        setIsSlidingOut(false);
        setIsTextFading(false); // fade-in new one
      }, 900);
    }, 9000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="w-full bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div
        key={currentSlide}
        className="relative w-[96%] mx-auto bg-white rounded-2xl overflow-hidden shadow-lg flex items-center h-[500px] ">
        <div
          key={currentSlide}
          className={`hidden lg:flex relative flex-[0.5] h-full ${isSlidingOut ? "animate-slide-out-to-top" : "animate-slide-in-from-bottom"
            }`}
        >
          <div className="absolute top-48 left-16 w-38 h-52 bg-white rounded-xl border-2 border-pink-200 transform -rotate-[13deg] shadow-lg overflow-hidden ">
            <img
              src={slides[currentSlide].thumb1}
              alt={`Thumbnail 1 slide ${currentSlide + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-28 left-44 w-[125px] h-[148px] bg-white rounded-xl border-2 border-pink-200 transform rotate-[13deg] shadow-lg overflow-hidden">
            <img
              src={slides[currentSlide].thumb2}
              alt={`Thumbnail 2 slide ${currentSlide + 1}`}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* (empty flex placeholder to maintain layout) */}
        <div className="flex-[1] h-full flex flex-col justify-center items-center text-center px-6 lg:px-0"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 lg:px-0 z-10">
          <p className="text-sm text-gray-500 mt-20 mb-2">Available on LIPAAJI</p>

          <h2
            className={`max-w-[55%] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002f9d] leading-tight mb-6 ${isTextFading ? "fade-out" : "fade-in"
              }`}
          >
            {slides[currentSlide].heading}
          </h2>


          <a
            href={slides[currentSlide].link}
            className={`text-gray-500 font-semibold mt-6 mb-32 hover:text-[#002f9d] transition-all duration-300 ease-in-out transform hover:scale-.05 ${isTextFading ? "" : "fade-in"}`}
          >
            Check Collection →
          </a>




          <div className="flex space-x-3">
            {slides.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 
                ${idx === currentSlide ? "bg-[#002f9d] dot-animate" : "bg-gray-300"}`}
              ></span>
            ))}
          </div>

        </div>

        <div className="flex-[2] h-full">
          <img
            src={slides[currentSlide].heroImage}
            alt={`Hero model slide ${currentSlide + 1}`}
            className={`w-full h-full object-cover object-top clip-right-curve ${isTextFading ? "fade-out" : "fade-in"}`}
          />
        </div>

      </div>
    </section >
  );
};

export default Banner;
