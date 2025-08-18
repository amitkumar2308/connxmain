import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const Index = () => {
  const router = useRouter();

  const handleRegisterNavigation = () => {
    router.push("/contribution");
  };

  return (
    <>
      <Head>
        <title>Connx - Showcase Your Talent, Connect with Clients</title>
        <meta
          name="description"
          content="Connx is the ultimate platform for talented individuals to showcase their skills, share videos, and sell their services to clients. Join Connx today and turn your talent into opportunity!"
        />
        <meta
          name="keywords"
          content="talent platform, showcase skills, sell services, video portfolio, connect with clients"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* Hero Section */}
      <div className="relative bg-black text-white flex lg:mt-16 overflow-hidden font-sans min-h-screen" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-8 py-28">
          {/* Text Section */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <p className="uppercase tracking-[0.25em] text-gray-400 text-sm sm:text-base mb-6 font-semibold animate-fadeIn">
              Connecting Opportunities, Inspiring Growth
            </p>
            <h1 className="font-extrabold text-6xl sm:text-7xl lg:text-8xl leading-tight mb-8 text-white drop-shadow-xl animate-slideUp">
              Revolutionize <br /> Networking & Collaboration
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fadeIn delay-200">
              At Connx, we bring together people, ideas, and possibilities. Whether you’re an innovator, a leader, or just starting out — Connx empowers you to achieve your goals through meaningful connections.
            </p>
            <button
              onClick={handleRegisterNavigation}
              className="bg-white text-black px-16 py-5 rounded-full text-xl font-semibold border border-white hover:bg-black hover:text-white hover:border-white transition duration-300"
            >
              🚀 Join Connx Today
            </button>
          </div>

          {/* Video Section with Creative Background */}
          <div className="flex justify-center items-center order-1 lg:order-2 relative animate-zoomIn">
            {/* Black/White Creative Background */}
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-[380px] h-[380px] border-4 border-dashed border-gray-600 rounded-xl rotate-6 opacity-20"></div>
              <div className="absolute w-[440px] h-[440px] border border-gray-500 rounded-2xl -rotate-3 blur-xl opacity-30 animate-pulse"></div>
              <div className="absolute w-[500px] h-[500px] border border-white rounded-full rotate-12 blur-lg opacity-10 animate-spin-slow"></div>
              <div className="absolute w-[560px] h-[560px] border border-gray-400 rounded-3xl -rotate-6 blur-md opacity-20 animate-pulse"></div>
            </div>

            {/* Video Frame */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.2)] border-4 border-white/10 group backdrop-blur-lg">
              <video
                src="/talentshowcase.mp4"
                controls
                autoPlay
                loop
                muted
                className="w-full max-w-sm sm:max-w-md lg:max-w-xl rounded-3xl group-hover:opacity-95 transition duration-500"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-full border border-white/30 shadow-2xl animate-pulse">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
