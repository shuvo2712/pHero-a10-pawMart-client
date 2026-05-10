import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";

const PetsAndSupplies = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    fetch("/listings.json")
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setFilteredListings(data);
      })
      .catch((err) => console.error("Error loading listings:", err));
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
          <div key={item.id} className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300">
            <figure className="px-6 pt-6">
              <img
                src={item.image}
                alt={item.name}
                className="rounded-xl h-56 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <div className="flex justify-between items-start">
                <h2 className="card-title text-primary font-bold">{item.name}</h2>
                <span className="badge badge-outline text-xs font-medium">{item.category}</span>
              </div>
              <p className="text-base-content/70 flex items-center gap-1 text-sm">
                <FaMapMarkerAlt className="text-secondary" /> {item.location}
              </p>
              <div className="card-actions justify-between items-center mt-6">
                <span className="text-xl font-extrabold text-secondary">
                  {item.Price === 0 ? (
                    <span className="text-success">Free for Adoption</span>
                  ) : (
                    `$${item.Price}`
                  )}
                </span>
                <Link to={`/listing-details/${item.id}`} className="btn btn-primary btn-sm rounded-lg px-6">
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
    </div>
  );
};

export default PetsAndSupplies;
