// src/components/Banner.tsx
import React from "react";

const Banner = () => {
  return (
    <section className="w-full bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-[96%] mx-auto bg-white rounded-2xl overflow-hidden shadow-lg flex items-center h-[500px]">
        {/* LEFT COLUMN: Overlapping Thumbnails (only on lg+) */}
        <div className="flex relative flex-[0.5] h-full">
          {/* First Thumbnail */}
          <div className="absolute top-64 left-8 w-36 h-44 bg-white rounded-xl border-2 border-pink-200 transform -rotate-[13deg] shadow-lg overflow-hidden">
            <img
              src="/assets/hero.jpg"
              alt="Thumbnail 1"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Second Thumbnail */}
          <div className="absolute top-44 left-36 w-[105px] h-[128px] bg-white rounded-xl border-2 border-pink-200 transform rotate-[13deg] shadow-lg overflow-hidden">
            <img
              src="/assets/hero.jpg"
              alt="Thumbnail 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-[1] h-full flex flex-col justify-center items-center text-center px-6 lg:px-0"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 lg:px-0 z-10 pointer-events-none">
          {/* Note: pointer-events-none ensures clicks “pass through” the overlay if needed.
              Remove it if you want the button to be clickable. */}

          {/* Small label above heading */}
          <p className="mt-20 right[-6] text-sm text-gray-500 mb-2">Available on LIPAAJI</p>

          {/* Main heading */}
          <h2 className=" max-w-[55%] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002f9d] leading-tight mb-6">
            The LIPAAJI Coco Beach 2025
            Collection
          </h2>

          {/* “View All” button */}
          <button className="mt-5 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-7 rounded-lg shadow-md transition mb-8 pointer-events-auto">
            View All
          </button>

          {/* Dots indicator */}
          <div className="mt-20 flex space-x-3">
            <span className="w-3 h-3 bg-[#002f9d] rounded-full"></span>
            <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
          </div>
        </div>

        {/* RIGHT COLUMN: Large Hero Image */}
        <div className="flex-[1] h-full ">
          <img
            src="/assets/hero.jpg"
            alt="Hero model"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
