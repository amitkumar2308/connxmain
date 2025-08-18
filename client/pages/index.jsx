import React from "react";

const Index = () => {
  const handleRegisterNavigation = () => {
    alert("Navigate to contribution page");
  };

  return (
    <div className="font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Hero Section */}
      <div className="relative bg-black text-white flex lg:mt-16 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 py-24">
          {/* Text Section */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <p className="uppercase tracking-[0.2em] text-gray-400 text-sm sm:text-base mb-6 font-semibold">
              Connecting Opportunities, Inspiring Growth
            </p>
            <h1 className="font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Revolutionize Networking & Collaboration
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              At Connx, we bring together people, ideas, and possibilities. Whether you’re an innovator, a leader, or just starting out — Connx empowers you to achieve your goals through meaningful connections.
            </p>
            <button
              onClick={handleRegisterNavigation}
              className="bg-gradient-to-r from-white to-gray-200 text-black px-12 py-5 rounded-full text-xl font-semibold shadow-2xl hover:shadow-3xl hover:scale-110 transform transition"
            >
              🚀 Join Connx Today
            </button>
          </div>

          {/* Video Section with Creative Background */}
          <div className="flex justify-center items-center order-1 lg:order-2 relative">
            {/* Neon / Creative Lines Background */}
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-[350px] h-[350px] border-4 border-dashed border-gray-600 rounded-xl rotate-6 opacity-40"></div>
              <div className="absolute w-[400px] h-[400px] border border-indigo-500 rounded-2xl -rotate-3 blur-sm opacity-70 animate-pulse"></div>
              <div className="absolute w-[420px] h-[420px] border border-pink-500 rounded-full rotate-12 blur opacity-50 animate-spin-slow"></div>
            </div>
            {/* Video Frame */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 group">
              <video
                src="/talentshowcase.mp4"
                controls
                autoPlay
                loop
                muted
                className="w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-2xl group-hover:opacity-90 transition"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white/20 backdrop-blur-md p-6 rounded-full border border-white/40 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white"
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

      {/* Features Section */}
      <section className="bg-gradient-to-b from-white to-gray-100 py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.05),transparent)]"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-black mb-10">
            Why <span className="underline decoration-gray-400">Connx?</span>
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-16 text-lg">
            Connx is designed to help you shine, connect, and grow. Whether you’re an artist, entrepreneur, or professional — we make it easy to showcase your talent and find opportunities.
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Showcase Your Talent",
                desc: "Build a stunning portfolio and stand out from the crowd.",
                icon: "🎥",
              },
              {
                title: "Sell Your Services",
                desc: "Turn your passion into profit by reaching the right clients.",
                icon: "💼",
              },
              {
                title: "Connect Globally",
                desc: "Network with innovators, leaders, and creators worldwide.",
                icon: "🌍",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-10 bg-white rounded-3xl shadow-xl border border-gray-200 hover:shadow-2xl transition transform hover:-translate-y-2 hover:bg-gradient-to-br hover:from-gray-50 hover:to-white"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-black">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-24 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="relative z-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
            Ready to Showcase Your Talent?
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-300">
            Join Connx today and start connecting with opportunities that matter.
          </p>
          <button
            onClick={handleRegisterNavigation}
            className="bg-gradient-to-r from-white to-gray-200 text-black font-bold px-12 py-5 rounded-full text-xl hover:scale-110 transform transition shadow-2xl hover:shadow-3xl"
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Index;
