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
      <div className="relative bg-white flex lg:mt-16  overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Section */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <p className="text-gray-600 text-sm sm:text-base mb-4 font-semibold">
              Connecting Opportunities, Inspiring Growth
            </p>
            <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-6">
              Revolutionize the Way You Network
              <br /> and Collaborate!
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mb-8">
              At Connx, we bring together people, ideas, and possibilities.
              Whether you’re an innovator, a leader, or just starting out, Connx
              empowers you to achieve your goals through meaningful connections.
            </p>
            <button
              onClick={handleRegisterNavigation}
              className="bg-black text-white px-6 py-3 rounded-full text-lg sm:text-xl font-semibold hover:scale-105 transform transition"
            >
              Join Connx
            </button>
          </div>

          {/* Image Section */}
          <div className="flex justify-center items-center order-1 lg:order-2  lg:mb-0">
            <img
              src="/Blogging-bro.png"
              alt="Hero Illustration"
              className="w-full max-w-sm sm:max-w-md lg:max-w-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
