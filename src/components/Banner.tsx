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
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="font-koh lg:w-full bg-gray-100 py-4 lg:py-10 px-2 sm:px-6 lg:px-8">
      <div className="relative w-[98%] mx-auto bg-white rounded-2xl overflow-hidden shadow-lg flex items-center h-[240px] sm:h-[540px]">

        {/* Thumbnails for lg*/}
        <div className={`hidden lg:flex relative flex-[0.5] h-full ${isSlidingOut ? "animate-slide-out-to-top" : "animate-slide-in-from-bottom"}`} >
          <div className="absolute top-52 left-12 w-44 h-56 bg-white rounded-xl border-2 border-pink-80 transform -rotate-[13deg] shadow-lg overflow-hidden ">
            <img
              src={slides[currentSlide].thumb1}
              alt={`Thumbnail 1 slide ${currentSlide + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute top-28 left-48 w-[135px] h-[158px] bg-white rounded-xl border-2 border-pink-80 transform rotate-[13deg] shadow-lg overflow-hidden">
            <img
              src={slides[currentSlide].thumb2}
              alt={`Thumbnail 2 slide ${currentSlide + 1}`}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </div>
        </div>

        {/* Thumbnails for sm*/}
        <div className={`flex lg:hidden relative flex-[0.5] h-full ${isSlidingOut ? "animate-slide-out-to-top" : "animate-slide-in-from-bottom"}`} >
          <div className="absolute top-28 left-2 w-[60px] h-[85px] bg-white rounded-[5px] border-[1px] border-pink-80 transform -rotate-[13deg] shadow-lg overflow-hidden ">
            <img
              src={slides[currentSlide].thumb1}
              alt={`Thumbnail 1 slide ${currentSlide + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute top-36 left-16 w-[50px] h-[70px] bg-white rounded-[5px] border-[1px] border-pink-80 transform rotate-[13deg] shadow-lg overflow-hidden">
            <img
              src={slides[currentSlide].thumb2}
              alt={`Thumbnail 2 slide ${currentSlide + 1}`}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </div>
        </div>

        {/* (empty flex placeholder to maintain layout) */}
        <div className="flex-[1] h-full flex flex-col justify-center items-center text-center px-6 lg:px-0"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 lg:px-0 z-10">
          <p className="text-[8px] lg:text-sm text-gray-500 lg:mt-20 mt-16 lg:mb-2">Only on LIPAAJI</p>
          <h2 className={`max-w-[80%] lg:max-w-[55%] leading-[28px] sm:leading-[50px] lg:leading-[63px] sm:text-2xl lg:text-5xl font-bold text-[#002f9d] mb-6 ${isTextFading ? "fade-out" : "fade-in"}`}>
            {slides[currentSlide].heading}
          </h2>

          <a
            href={slides[currentSlide].link}
            className={`inline-block text-[9px] lg:text-lg text-gray-500 font-medium mt-0 lg:mt-6 mb-8 lg:mb-32 px-[7px] py-[5px] lg:px-5 lg:py-2 
              border border-white/20 rounded-full 
              bg-white/10 backdrop-blur-md 
              hover:bg-white/20 
              transition-all duration-300 ease-in-out 
              shadow-md hover:shadow-lg transform hover:scale-101 ${isTextFading ? "" : "fade-in"}`}
          >
            Check Collection →
          </a>

          {/* Dots for slide navigation */}
          <div className="flex space-x-3">
            {slides.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-1.5 h-1.5 sm:mb:0 lg:w-3 lg:h-3 rounded-full cursor-pointer transition-all duration-300 
                ${idx === currentSlide ? "bg-[#002f9d] dot-animate" : "bg-gray-300"}`}
              ></span>
            ))}
          </div>

        </div>
        <div className="flex-[3] lg:flex-[2] h-full clip-right-curve bg-[#e2e3df]">
          <img
            src={slides[currentSlide].heroImage}
            alt={`Hero model slide ${currentSlide + 1}`}
            className={`w-full h-full object-cover object-[top_right] clip-right-curve ${isTextFading ? "fade-out" : "fade-in"}`}
            loading="eager"
          />
        </div>
      </div>
    </section >
  );
};

export default Banner;
