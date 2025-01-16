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
      <title>Connx - Build a Community of Thinkers and Dreamers</title>
        <meta name="description" content="Connx helps thinkers and dreamers unleash their ideas and collaborate in a vibrant community. Join Connx today!"/>
        <meta name="description" content="Join our community to unleash your thoughts and ideas with people ready to listen, engage, and collaborate." />
        <meta name="keywords" content="community, thinkers, dreamers, collaborate, connect" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Build a Community of Thinkers and Dreamers" />
        <meta property="og:description" content="Unleash your thoughts and ideas with a community ready to listen, engage, and collaborate." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://connx.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Build a Community of Thinkers and Dreamers" />
        <meta name="twitter:description" content="Unleash your thoughts and ideas with a community ready to listen, engage, and collaborate." />
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
            Let's build a community
            <br />
            of thinkers and dreamers
          </h1>
          <h6 className="text-center font-mono p-4 sm:p-8 text-base sm:text-xl animate-fadeIn">
            Unleash your thoughts and ideas with a community ready to listen, engage, and collaborate
          </h6>
          <div className="flex justify-center">
            <button
              onClick={handleRegisterNavigation}
              className="font-inter font-semibold text-white text-center bg-black p-3 w-64 sm:w-80 text-lg sm:text-2xl rounded-full hover:scale-105"
            >
              Let's Connect
            </button>
          </div>
          <h6 className="text-center mt-8 text-sm sm:text-base">Made By Amit Kumar</h6>
        </div>
      </div>
    </>
  );
};

export default Index;
