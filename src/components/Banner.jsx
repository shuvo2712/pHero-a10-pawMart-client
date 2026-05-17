import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const bannerSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=1200",
    tagline: "Find Your Furry Friend Today!",
    sub: "Thousands of pets waiting to be adopted near you.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=1200",
    tagline: "Adopt, Don’t Shop — Give a Pet a Home.",
    sub: "Give a rescued pet a forever home and a second chance.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&q=80&w=1200",
    tagline: "Because Every Pet Deserves Love and Care.",
    sub: "Browse supplies, food, and accessories for your beloved companion.",
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[450px] md:h-[550px] overflow-hidden">
      {bannerSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
        >
          <img src={slide.image} alt={slide.tagline} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-6">
            <h1 className="text-3xl md:text-6xl font-black mb-4 drop-shadow-lg">
              {slide.tagline}
            </h1>
            <p className="text-lg md:text-2xl mb-8 text-white/80 max-w-xl">{slide.sub}</p>
            <Link to="/pets-and-supplies" className="btn btn-primary btn-lg text-white rounded-full px-10 shadow-xl">
              Explore Now <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      ))}

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white scale-125" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
