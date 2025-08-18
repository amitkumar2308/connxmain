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
      <div className="relative bg-gradient-to-b from-black via-gray-900 to-black text-white flex lg:mt-16 overflow-hidden font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-8 py-28">
          {/* Text Section */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <p className="uppercase tracking-[0.25em] text-gray-400 text-sm sm:text-base mb-6 font-semibold">
              Connecting Opportunities, Inspiring Growth
            </p>
            <h1 className="font-extrabold text-6xl sm:text-7xl lg:text-8xl leading-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 drop-shadow-lg">
              Revolutionize Networking & Collaboration
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              At Connx, we bring together people, ideas, and possibilities. Whether you’re an innovator, a leader, or just starting out — Connx empowers you to achieve your goals through meaningful connections.
            </p>
            <button
              onClick={handleRegisterNavigation}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-14 py-5 rounded-full text-xl font-semibold shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-110 transform transition duration-300"
            >
              🚀 Join Connx Today
            </button>
          </div>

          {/* Video Section with Creative Background */}
          <div className="flex justify-center items-center order-1 lg:order-2 relative">
            {/* Neon / Creative Background */}
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-[360px] h-[360px] border-4 border-dashed border-gray-600 rounded-xl rotate-6 opacity-40"></div>
              <div className="absolute w-[420px] h-[420px] border border-purple-500 rounded-2xl -rotate-3 blur-md opacity-60 animate-pulse"></div>
              <div className="absolute w-[460px] h-[460px] border border-pink-500 rounded-full rotate-12 blur-lg opacity-50 animate-spin-slow"></div>
              <div className="absolute w-[500px] h-[500px] border border-cyan-400 rounded-3xl -rotate-6 blur-md opacity-40 animate-pulse"></div>
            </div>

            {/* Video Frame */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 group backdrop-blur-sm">
              <video
                src="/talentshowcase.mp4"
                controls
                autoPlay
                loop
                muted
                className="w-full max-w-sm sm:max-w-md lg:max-w-xl rounded-3xl group-hover:opacity-90 transition"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white/20 backdrop-blur-md p-8 rounded-full border border-white/40 shadow-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-14 text-white"
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
