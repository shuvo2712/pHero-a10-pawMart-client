import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FaTag, FaList, FaDollarSign, FaMapMarkerAlt, FaAlignLeft, FaImage, FaCalendarAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import useDocumentTitle from "../hooks/useDocumentTitle";

const AddListing = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useDocumentTitle("Add Listing");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newListing = {
      name: form.name.value,
      category: form.category.value,
      price: Number(form.price.value),
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
      date: form.date.value,
      email: user?.email || "",
    };

    fetch(`${import.meta.env.VITE_API_URL}/listings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newListing),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Listing added successfully!");
          form.reset();
          navigate("/my-listings");
        } else {
          toast.error("Failed to add listing.");
        }
      })
      .catch((err) => {
        console.error("Error adding listing:", err);
        toast.error("An error occurred. Please try again.");
      });
  };

  return (
    <div className="min-h-[80vh] p-6 md:p-10 max-w-3xl mx-auto mt-6 mb-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-2">Add New Listing</h2>
      <p className="text-base-content/50 mb-8">Fill in the details below to post a pet or product listing.</p>

      <form onSubmit={handleSubmit} className="space-y-5 bg-base-100 border border-base-200 rounded-3xl p-8 shadow-sm">

        {/* Pet/Product Name */}
        <div className="form-control">
          <label className="label"><span className="label-text font-semibold">Pet / Product Name</span></label>
          <div className="relative">
            <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
            <input name="name" type="text" placeholder="Pet / Product Name" className="input input-bordered w-full pl-12 rounded-xl" />
          </div>
        </div>

        {/* Category */}
        <div className="form-control">
          <label className="label"><span className="label-text font-semibold">Category</span></label>
          <div className="relative">
            <FaList className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 z-10" />
            <select name="category" className="select select-bordered w-full pl-12 rounded-xl">
              <option value="Pets">Pets (Adoption)</option>
              <option value="Pet Food">Pet Food</option>
              <option value="Accessories">Accessories</option>
              <option value="Pet Care Products">Pet Care Products</option>
            </select>
          </div>
        </div>

        {/* Price */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Price</span>
            <span className="label-text-alt text-base-content/40">Set 0 for free adoption</span>
          </label>
          <div className="relative">
            <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
            <input name="price" type="number" min="0" placeholder="0" className="input input-bordered w-full pl-12 rounded-xl" />
          </div>
        </div>

        {/* Location */}
        <div className="form-control">
          <label className="label"><span className="label-text font-semibold">Location</span></label>
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
            <input name="location" type="text" placeholder="Location" className="input input-bordered w-full pl-12 rounded-xl" />
          </div>
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label"><span className="label-text font-semibold">Description</span></label>
          <div className="relative">
            <FaAlignLeft className="absolute left-4 top-4 text-base-content/30" />
            <textarea name="description" rows="3" placeholder="Write a short description..." className="textarea textarea-bordered w-full pl-12 rounded-xl resize-none"></textarea>
          </div>
        </div>

        {/* Image URL */}
        <div className="form-control">
          <label className="label"><span className="label-text font-semibold">Image URL</span></label>
          <div className="relative">
            <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
            <input name="image" type="url" placeholder="Image URL" className="input input-bordered w-full pl-12 rounded-xl" />
          </div>
        </div>

        {/* Date */}
        <div className="form-control">
          <label className="label"><span className="label-text font-semibold">Pick Up / Date</span></label>
          <div className="relative">
            <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
            <input name="date" type="date" className="input input-bordered w-full pl-12 rounded-xl" />
          </div>
        </div>

        {/* Email (read-only) */}
        <div className="form-control">
          <label className="label"><span className="label-text font-semibold">Your Email</span></label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full rounded-xl bg-base-200 cursor-not-allowed text-base-content/50"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full rounded-xl text-white font-bold uppercase mt-4">
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default AddListing;
