import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaMapMarkerAlt, FaChevronLeft } from "react-icons/fa";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/listings.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((item) => item.category === categoryName);
        setListings(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading listings:", err);
        setLoading(false);
      });
  }, [categoryName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto mt-6 mb-20">
      <Link to="/" className="btn btn-ghost btn-sm mb-6 flex items-center gap-2 w-fit">
        <FaChevronLeft /> Back to Home
      </Link>

      <h2 className="text-3xl md:text-4xl font-bold mb-2">{categoryName}</h2>
      <p className="text-base-content/50 mb-10">{listings.length} listing(s) found</p>

      {listings.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl font-bold text-base-content/40">No listings found for this category.</p>
          <Link to="/" className="btn btn-primary mt-6">Go Back Home</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((item) => (
            <div key={item.id} className="card bg-base-100 shadow-lg border border-base-200 hover:shadow-xl transition-shadow duration-300">
              <figure>
                <img src={item.image} alt={item.name} className="w-full h-52 object-cover" />
              </figure>
              <div className="card-body p-5">
                <div className="flex justify-between items-start">
                  <span className="badge badge-secondary badge-outline text-xs">{item.category}</span>
                  <span className="font-bold text-primary text-lg">
                    {item.Price === 0 ? <span className="text-success">Free</span> : `$${item.Price}`}
                  </span>
                </div>
                <h3 className="card-title text-lg mt-2">{item.name}</h3>
                <div className="flex items-center gap-2 text-sm text-base-content/60">
                  <FaMapMarkerAlt className="text-secondary" />
                  <span>{item.location}</span>
                </div>
                <div className="card-actions mt-4">
                  <Link to={`/listing-details/${item.id}`} className="btn btn-primary btn-sm w-full rounded-xl">
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
