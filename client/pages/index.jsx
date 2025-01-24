import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'; // Import the Head component

const Index = () => {
  const router = useRouter();

  const handleRegisterNavigation = () => {
    router.push('/contribution');
  };

  return (
    <>
      <Head>
        <title>Connx - Showcase Your Talent, Connect with Clients</title>
        <meta name="description" content="Connx is the ultimate platform for talented individuals to showcase their skills, share videos, and sell their services to clients. Join Connx today and turn your talent into opportunity!" />
        <meta name="keywords" content="talent platform, showcase skills, sell services, video portfolio, connect with clients" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Showcase Your Talent, Connect with Clients" />
        <meta property="og:description" content="Connx is the ultimate platform for talented individuals to showcase their skills, share videos, and sell their services to clients." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://connx.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Showcase Your Talent, Connect with Clients" />
        <meta name="twitter:description" content="Connx is the ultimate platform for talented individuals to showcase their skills, share videos, and sell their services to clients." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://connx.in" />
      </Head>
      <div className="relative">
        {/* Page content */}
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
        <div className="relative z-10 px-4 sm:px-8">
          <h1 className="font-inter font-extrabold text-4xl sm:text-6xl lg:text-8xl text-center pt-20 sm:pt-36">
            Showcase Your Talent,
            <br />
            Connect with Clients
          </h1>
          <h6 className="text-center font-mono p-4 sm:p-8 text-base sm:text-xl animate-fadeIn">
            Share your skills, build your brand, and sell your services to clients worldwide.
          </h6>
          <div className="flex justify-center">
            <button
              onClick={handleRegisterNavigation}
              className="font-inter font-semibold text-white text-center bg-black p-3 w-64 sm:w-80 text-lg sm:text-2xl rounded-full hover:scale-105"
            >
              Join Connx
            </button>
          </div>
          <h6 className="text-center mt-8 text-sm sm:text-base">Made By Amit Kumar</h6>
        </div>
      </div>
    </>
  );
};

export default Index;
