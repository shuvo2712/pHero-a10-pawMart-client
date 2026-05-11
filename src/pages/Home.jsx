import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { FaMapMarkerAlt, FaArrowRight, FaHeart, FaShieldAlt, FaStar } from "react-icons/fa";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Tooltip } from "react-tooltip";
import { motion } from "framer-motion";

// Banner slides
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

// Categories
const categories = [
  { name: "Pets", icon: "🐶", desc: "Adopt a loving companion", color: "bg-orange-100 dark:bg-orange-900/20" },
  { name: "Pet Food", icon: "🍖", desc: "Nutritious meals for all pets", color: "bg-green-100 dark:bg-green-900/20" },
  { name: "Accessories", icon: "🧸", desc: "Toys, beds, collars & more", color: "bg-blue-100 dark:bg-blue-900/20" },
  { name: "Pet Care Products", icon: "💊", desc: "Health & grooming essentials", color: "bg-purple-100 dark:bg-purple-900/20" },
];

// Adopter profiles
const petHeroes = [
  {
    id: 1,
    name: "Rahul Ahmed",
    pet: "Max the Golden Retriever",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    quote: "Adopting Max was the best decision of my life. He brings joy every single day!",
  },
  {
    id: 2,
    name: "Priya Sharma",
    pet: "Luna the Persian Cat",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300",
    quote: "Luna was rescued and now she's my whole world. Adoption changed both our lives.",
  },
  {
    id: 3,
    name: "Kamal Hossain",
    pet: "Bruno the German Shepherd",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    quote: "Bruno needed a home. Now I can't imagine home without him.",
  },
];

const Home = () => {
  useDocumentTitle("Home");
  const [listings, setListings] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  const [whyText] = useTypewriter({
    words: ["Why Adopt from PawMart?"],
    loop: true,
    delaySpeed: 1000,
  });

  const [categoryText] = useTypewriter({
    words: ["Browse by Category"],
    loop: true,
    delaySpeed: 1000,
  });

  const [recentText] = useTypewriter({
    words: ["Recent Listings"],
    loop: true,
    delaySpeed: 1000,
  });

  const [heroesText] = useTypewriter({
    words: ["Meet Our Pet Heroes"],
    loop: true,
    delaySpeed: 1000,
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/listings/latest`)
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading listings:", err);
        setLoading(false);
      });
  }, []);

  // Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Recent listings
  const recentListings = listings;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      {/* Banner section */}
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

      {/* CATEGORY SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 min-h-[1.2em]">
          {categoryText}<Cursor cursorColor="hsl(var(--p))" />
        </h2>
        <p className="text-center text-base-content/50 mb-10">Find exactly what your pet needs</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/category-filtered-product/${cat.name}`}
                className={`${cat.color} rounded-3xl p-6 text-center hover:scale-105 transition-transform duration-200 border border-base-200 shadow-sm group block h-full`}
              >
                <div className="text-5xl mb-3">{cat.icon}</div>
                <h3 className="font-bold text-lg mb-1">{cat.name}</h3>
                <p className="text-sm text-base-content/60">{cat.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* RECENT LISTINGS */}
      <section className="bg-base-200/50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 min-h-[1.2em]">
              {recentText}<Cursor cursorColor="hsl(var(--p))" />
            </h2>
            <p className="text-center text-base-content/50 mb-10">Freshly posted pets & supplies</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentListings.map((item, index) => (
              <motion.div 
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card bg-base-100 shadow-lg border border-base-200 hover:shadow-xl transition-shadow duration-300"
              >
                <figure>
                  <img src={item.image} alt={item.name} className="w-full h-52 object-cover" />
                </figure>
                <div className="card-body p-5">
                  <div className="flex justify-between items-start">
                    <span className="badge badge-secondary badge-outline text-xs">{item.category}</span>
                    <span className="font-bold text-primary text-lg">
                      {item.Price === 0 ? (
                        <span 
                          className="text-success" 
                          data-tooltip-id="free-badge-tip"
                          data-tooltip-content="This pet is available for free adoption"
                        >
                          Free
                        </span>
                      ) : `$${item.Price}`}
                    </span>
                  </div>
                  <h3 className="card-title text-lg mt-2">{item.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-base-content/60">
                    <FaMapMarkerAlt className="text-secondary" />
                    <span>{item.location}</span>
                  </div>
                  <div className="card-actions mt-4">
                    <Link to={`/listing-details/${item._id}`} className="btn btn-primary btn-sm w-full rounded-xl">
                      See Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/pets-and-supplies" className="btn btn-outline btn-primary rounded-full px-10">
              View All Listings <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY ADOPT FROM PAWMART */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 min-h-[1.2em]">
          {whyText}<Cursor cursorColor="hsl(var(--p))" />
        </h2>
        <p className="text-center text-base-content/50 mb-12 max-w-xl mx-auto">
          Every pet on PawMart is waiting for a second chance. By adopting, you are not just saving one life — you are making room for another rescue.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-3xl bg-base-200/60 border border-base-200">
            <FaHeart className="text-5xl text-error mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Save a Life</h3>
            <p className="text-base-content/60">Every adopted pet was once homeless. Your decision gives them a safe, loving environment to thrive in.</p>
          </div>
          <div className="text-center p-8 rounded-3xl bg-base-200/60 border border-base-200">
            <FaShieldAlt className="text-5xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Verified Listings</h3>
            <p className="text-base-content/60">All pet listings on PawMart are verified by our team to ensure they come from responsible owners and shelters.</p>
          </div>
          <div className="text-center p-8 rounded-3xl bg-base-200/60 border border-base-200">
            <FaStar className="text-5xl text-warning mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Community Driven</h3>
            <p className="text-base-content/60">Join a community of thousands of pet lovers who believe in rescuing and rehoming animals with love and care.</p>
          </div>
        </div>
      </motion.section>

      {/* MEET OUR PET HEROES */}
      <section className="bg-base-200/50 py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 min-h-[1.2em]">
              {heroesText}<Cursor cursorColor="hsl(var(--p))" />
            </h2>
            <p className="text-center text-base-content/50 mb-10">Real people, real stories, real love</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {petHeroes.map((hero, index) => (
              <motion.div 
                key={hero.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card bg-base-100 border border-base-200 shadow-md p-6 text-center"
              >
                <img
                  src={hero.image}
                  alt={hero.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-primary"
                />
                <h3 className="font-bold text-lg">{hero.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">{hero.pet}</p>
                <p className="text-base-content/60 text-sm italic">"{hero.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Tooltip id="free-badge-tip" place="top" />
    </div>
  );
};

export default Home;
