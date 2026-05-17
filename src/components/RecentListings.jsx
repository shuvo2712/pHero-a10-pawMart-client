import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const RecentListings = ({ listings }) => {
  const [recentText] = useTypewriter({
    words: ["Recent Listings"],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 30,
    delaySpeed: 1000,
  });

  return (
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
          {listings.map((item, index) => (
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
                    {item.price === 0 ? (
                      <span 
                        className="text-success" 
                        data-tooltip-id="free-badge-tip"
                        data-tooltip-content="This pet is available for free adoption"
                      >
                        Free
                      </span>
                    ) : `$${item.price}`}
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
  );
};

export default RecentListings;
