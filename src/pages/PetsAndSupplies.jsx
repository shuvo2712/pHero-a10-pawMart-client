import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { Tooltip } from "react-tooltip";

const PetsAndSupplies = () => {
  useDocumentTitle("Pets & Supplies");
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/listings`)
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setFilteredListings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading listings:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = listings;

    if (categoryFilter !== "All") {
      filtered = filtered.filter((item) => item.category === categoryFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredListings(filtered);
  }, [searchQuery, categoryFilter, listings]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto mt-10">
      <h2 className="text-4xl font-bold mb-8 text-center">Pets & Supplies</h2>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center items-center">
        <div className="form-control w-full max-w-xs relative">
          <input
            type="text"
            placeholder="Search by name..."
            className="input input-bordered w-full pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
        </div>
        <div className="form-control w-full max-w-xs">
          <select
            className="select select-bordered w-full"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Pets">Pets</option>
            <option value="Pet Food">Pet Food</option>
            <option value="Accessories">Accessories</option>
            <option value="Pet Care Products">Pet Care Products</option>
          </select>
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredListings.map((item) => (
          <div key={item._id} className="card bg-base-100 shadow-lg border border-base-200 hover:shadow-xl transition-shadow duration-300">
            <figure>
              <img src={item.image} alt={item.name} className="w-full h-52 object-cover" />
            </figure>
            <div className="card-body p-5">
              <div className="flex justify-between items-start">
                <span className="badge badge-secondary badge-outline text-xs whitespace-nowrap">{item.category}</span>
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
          </div>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-20 bg-base-200/50 rounded-3xl mt-10">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-xl font-semibold text-base-content/60">No listings found matching your search.</p>
          <button 
            className="btn btn-ghost btn-sm mt-4 text-primary"
            onClick={() => {setSearchQuery(""); setCategoryFilter("All");}}
          >
            Clear all filters
          </button>
        </div>
      )}

      <Tooltip id="free-badge-tip" place="top" />
    </div>
  );
};

export default PetsAndSupplies;
