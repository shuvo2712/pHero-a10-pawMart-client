import { motion } from "framer-motion";
import { FaHeart, FaShieldAlt, FaStar } from "react-icons/fa";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const WhyAdopt = () => {
  const [whyText] = useTypewriter({
    words: ["Why Adopt from PawMart?"],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 30,
    delaySpeed: 1000,
  });

  return (
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
  );
};

export default WhyAdopt;
