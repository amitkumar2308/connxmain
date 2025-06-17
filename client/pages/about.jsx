import Image from 'next/image';
import connexFounderImage from "../public/connxfounder.png";

const About = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center pt-20 sm:pt-0">
      {/* Image section with background color */}
      <div className="w-full sm:w-1/3 flex justify-center mb-6 sm:mb-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
        <Image
          src={connexFounderImage}
          alt="Connx Founder"
          width={2900}
          height={2900}
          className="object-contain sm:object-cover sm:w-full sm:h-auto"
        />
      </div>
      {/* Text section */}
      <div className="w-full sm:w-1/2 px-8 py-6">
        <h1 className="text-3xl font-semibold mb-4">Our Vision</h1>
        <hr className="mb-4" />
        <p className="text-justify">
          ConnX.in is a revolutionary video-based freelance platform built with a mission to <strong>give every new freelancer a fair chance</strong>. At ConnX, we believe that talent shouldn't be buried under a lack of 5-star reviews or limited visibility.
          <br /><br />
          Unlike traditional freelance platforms that prioritize profiles with high ratings and long histories, ConnX opens the door for fresh talent to <strong>showcase their skills through video-based pitches</strong>, real-time work previews, and interactive project demos. This allows clients to connect with freelancers <strong>based on potential and real skill</strong>, not just numbers.
          <br /><br />
          We aim to level the playing field — making freelancing more human, transparent, and opportunity-driven. ConnX is more than just a marketplace; it’s a <strong>community that champions newcomers</strong>, fosters collaboration, and drives innovation through trust and transparency.
        </p>
      </div>
    </div>
  );
};

export default About;
