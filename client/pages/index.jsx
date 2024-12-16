import React from 'react';
import { useRouter } from 'next/router'; // Import useRouter for navigation

const Index = () => {
  const router = useRouter(); // Initialize the router

  const handleRegisterNavigation = () => {
    router.push('/register'); // Navigate to the register page
  };

  return (
    <div className="relative">
      {/* Ellipse Images */}
      <img
        className="absolute top-0 left-0 w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mt-16 sm:mt-32 ml-16 sm:ml-32 object-cover z-0 animate-bounce"
        src="/Ellipse.png"
        alt="Ellipse"
      />
      <img
        className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mt-40 sm:mt-72 mr-16 sm:mr-36 object-cover z-0 animate-bounce"
        src="/Ellipse.png"
        alt="Ellipse"
      />

      {/* Content Section */}
      <div className="relative z-10 px-4 sm:px-8">
        {/* Main Heading */}
        <h1 className="font-inter font-extrabold text-4xl sm:text-6xl lg:text-8xl text-center pt-20 sm:pt-36">
          Let's build a community 
          <br />of thinkers and dreamers
        </h1>

        {/* Subheading */}
        <h6 className="text-center font-mono p-4 sm:p-8 text-base sm:text-xl animate-fadeIn">
          Unleash your thoughts and ideas with a community ready to listen, engage, and collaborate
        </h6>

        {/* Button */}
        <div className="flex justify-center">
          <button
            onClick={handleRegisterNavigation} // Add click handler
            className="font-inter font-semibold text-white text-center bg-black p-3 w-64 sm:w-80 text-lg sm:text-2xl rounded-full hover:scale-105"
          >
            Let's Connect
          </button>
        </div>

        {/* Footer */}
        <h6 className="text-center mt-8 text-sm sm:text-base">Made By Amit Kumar</h6>
      </div>
    </div>
  );
};

export default Index;
