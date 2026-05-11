import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { Tooltip } from "react-tooltip";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  useDocumentTitle("My Listings");
  const [listings, setListings] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [editListing, setEditListing] = useState(null);

  // Load listings
  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("myListings") || "[]");
    const mine = all.filter((item) => item.email === (user?.email || ""));
    setListings(mine);
  }, [user]);

  // Delete handler
  const handleDelete = () => {
    const all = JSON.parse(localStorage.getItem("myListings") || "[]");
    const updated = all.filter((item) => item.id !== deleteId);
    localStorage.setItem("myListings", JSON.stringify(updated));
    setListings(updated.filter((item) => item.email === (user?.email || "")));
    setDeleteId(null);
    toast.success("Listing deleted.");
  };

  // Update handler
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const all = JSON.parse(localStorage.getItem("myListings") || "[]");
    const updated = all.map((item) => {
      if (item.id === editListing.id) {
        return {
          ...item,
          name: form.name.value,
          category: form.category.value,
          Price: Number(form.price.value),
          location: form.location.value,
          description: form.description.value,
          image: form.image.value,
          date: form.date.value,
        };
      }
      return item;
    });

    localStorage.setItem("myListings", JSON.stringify(updated));
    setListings(updated.filter((item) => item.email === (user?.email || "")));
    setEditListing(null);
    toast.success("Listing updated!");
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto mt-6 mb-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-2">My Listings</h2>
      <p className="text-base-content/50 mb-8">All listings you have posted.</p>

      {listings.length === 0 ? (
        <div className="text-center py-20 text-base-content/40">
          <p className="text-2xl font-bold">You have no listings yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-base-200 shadow-sm">
          <table className="table w-full">
            <thead className="bg-base-200 text-base-content">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Location</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((item, index) => (
                <tr key={item.id} className="hover">
                  <td>{index + 1}</td>
                  <td>
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl" />
                  </td>
                  <td className="font-semibold">{item.name}</td>
                  <td><span className="badge badge-outline badge-secondary whitespace-nowrap">{item.category}</span></td>
                  <td className="font-bold text-primary">{item.Price === 0 ? <span className="text-success">Free</span> : `$${item.Price}`}</td>
                  <td>{item.location}</td>
                  <td>{item.date}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        data-tooltip-id="edit-tip"
                        data-tooltip-content="Edit Listing"
                        onClick={() => setEditListing(item)}
                        className="btn btn-sm btn-outline btn-primary rounded-lg"
                      >
                        <FaEdit />
                      </button>
                      <button
                        data-tooltip-id="delete-tip"
                        data-tooltip-content="Delete Listing"
                        onClick={() => setDeleteId(item.id)}
                        className="btn btn-sm btn-outline btn-error rounded-lg"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tooltips */}
      <Tooltip id="edit-tip" place="top" />
      <Tooltip id="delete-tip" place="top" />

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="modal modal-open">
          <div className="modal-box rounded-2xl text-center">
            <h3 className="font-bold text-xl mb-2">Are you sure?</h3>
            <p className="text-base-content/60 mb-6">This action cannot be undone. The listing will be permanently deleted.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteId(null)} className="btn btn-outline rounded-xl">Cancel</button>
              <button onClick={handleDelete} className="btn btn-error text-white rounded-xl">Yes, Delete</button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setDeleteId(null)}></div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editListing && (
        <div className="modal modal-open">
          <div className="modal-box w-full max-w-2xl rounded-2xl">
            <h3 className="font-bold text-xl mb-6">Update Listing</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Name</span></label>
                  <input name="name" type="text" defaultValue={editListing.name} className="input input-bordered rounded-xl" />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Category</span></label>
                  <select name="category" defaultValue={editListing.category} className="select select-bordered rounded-xl">
                    <option value="Pets">Pets (Adoption)</option>
                    <option value="Pet Food">Pet Food</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Pet Care Products">Pet Care Products</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Price</span></label>
                  <input name="price" type="number" min="0" defaultValue={editListing.Price} className="input input-bordered rounded-xl" />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Location</span></label>
                  <input name="location" type="text" defaultValue={editListing.location} className="input input-bordered rounded-xl" />
                </div>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Image URL</span></label>
                <input name="image" type="url" defaultValue={editListing.image} className="input input-bordered rounded-xl" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Date</span></label>
                <input name="date" type="date" defaultValue={editListing.date} className="input input-bordered rounded-xl" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Description</span></label>
                <textarea name="description" rows="2" defaultValue={editListing.description} className="textarea textarea-bordered rounded-xl resize-none"></textarea>
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setEditListing(null)} className="btn btn-outline rounded-xl">Cancel</button>
                <button type="submit" className="btn btn-primary text-white rounded-xl">Save Changes</button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setEditListing(null)}></div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
