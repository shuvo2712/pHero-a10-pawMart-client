import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaEnvelope, FaCalendarAlt, FaChevronLeft, FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import useDocumentTitle from "../hooks/useDocumentTitle";

const ListingDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  useDocumentTitle(listing?.name);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/listings/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setListing(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching listing:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-error">Listing Not Found</h2>
        <Link to="/pets-and-supplies" className="btn btn-primary mt-6">
          Back to All Listings
        </Link>
      </div>
    );
  }

  const isPet = listing.price === 0;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto mt-6 mb-20">
      {/* Back Button */}
      <Link to="/pets-and-supplies" className="btn btn-ghost btn-sm mb-6 flex items-center gap-2 w-fit">
        <FaChevronLeft /> Back to Listings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-base-100 rounded-3xl overflow-hidden border border-base-200 p-4 md:p-8 shadow-sm">
        {/* Left */}
        <div className="w-full">
          <img
            src={listing.image}
            alt={listing.name}
            className="w-full h-[350px] md:h-[500px] object-cover rounded-2xl"
          />
        </div>

        {/* Right */}
        <div className="flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="badge badge-secondary badge-outline font-semibold mb-2">{listing.category}</span>
              <h1 className="text-3xl md:text-5xl font-bold text-base-content">{listing.name}</h1>
            </div>
            <p className="text-2xl md:text-3xl font-black text-primary">
              {isPet ? <span className="text-success">Free</span> : `$${listing.price}`}
            </p>
          </div>

          <div className="space-y-4 my-6 py-6 border-y border-base-200">
            <div className="flex items-center gap-3 text-base-content/70">
              <FaMapMarkerAlt className="text-secondary" />
              <span className="font-medium">{listing.location}</span>
            </div>
            <div className="flex items-center gap-3 text-base-content/70">
              <FaCalendarAlt className="text-secondary" />
              <span>Posted on: {listing.date}</span>
            </div>
            <div className="flex items-center gap-3 text-base-content/70">
              <FaEnvelope className="text-secondary" />
              <span className="break-all">{listing.email}</span>
            </div>
          </div>

          <div className="mb-8 flex-grow">
            <h3 className="text-lg font-bold mb-3 uppercase tracking-wider text-base-content/50">Description</h3>
            <p className="text-base-content/80 text-lg leading-relaxed">
              {listing.description}
            </p>
          </div>

          <button 
            className={`btn btn-lg w-full ${isPet ? 'btn-success' : 'btn-primary'} text-white rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all`}
            onClick={() => setShowModal(true)}
          >
            <FaShoppingCart /> {isPet ? "Adopt Now" : "Order Now"}
          </button>
        </div>
      </div>

      {/* Order Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box rounded-3xl max-w-2xl w-full">
            {!orderDone ? (
              <>
                <h3 className="font-bold text-2xl mb-1">{isPet ? "Adoption Request" : "Place Order"}</h3>
                <p className="text-base-content/50 text-sm mb-6">Fill in your details to confirm.</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target;
                    const newOrder = {
                      listingName: listing.name,
                      listingId: listing._id,
                      category: listing.category,
                      price: listing.price,
                      buyerEmail: user?.email || "",
                      buyerName: user?.displayName || "",
                      quantity: isPet ? 1 : Number(form.quantity.value),
                      address: form.address.value,
                      date: form.date.value,
                      phone: form.phone.value,
                      notes: form.notes.value,
                      orderedAt: new Date().toISOString().split("T")[0],
                    };

                    fetch(`${import.meta.env.VITE_API_URL}/orders`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(newOrder),
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        if (data.insertedId) {
                          setOrderDone(true);
                          toast.success("Order placed successfully!");
                        } else {
                          toast.error("Failed to place order.");
                        }
                      })
                      .catch((err) => {
                        console.error("Error placing order:", err);
                        toast.error("An error occurred. Please try again.");
                      });
                  }}
                  className="space-y-3"
                >
                  {/* Auto-fill readonly fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="form-control">
                      <label className="label"><span className="label-text font-semibold">Buyer Name</span></label>
                      <input type="text" value={user?.displayName || ""} readOnly className="input input-bordered rounded-xl bg-base-200 cursor-not-allowed" />
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-semibold">Email</span></label>
                      <input type="email" value={user?.email || ""} readOnly className="input input-bordered rounded-xl bg-base-200 cursor-not-allowed" />
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-semibold">Listing ID</span></label>
                      <input type="text" value={listing._id} readOnly className="input input-bordered rounded-xl bg-base-200 cursor-not-allowed" />
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-semibold">Listing Name</span></label>
                      <input type="text" value={listing.name} readOnly className="input input-bordered rounded-xl bg-base-200 cursor-not-allowed" />
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-semibold">Quantity</span></label>
                      {isPet ? (
                        <input type="number" name="quantity" value={1} readOnly className="input input-bordered rounded-xl bg-base-200 cursor-not-allowed" />
                      ) : (
                        <input name="quantity" type="number" min="1" defaultValue="1" className="input input-bordered rounded-xl" />
                      )}
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-semibold">Price</span></label>
                      <input type="text" value={listing.price === 0 ? "Free" : `$${listing.price}`} readOnly className="input input-bordered rounded-xl bg-base-200 cursor-not-allowed" />
                    </div>
                  </div>

                  {/* Editable fields */}
                  <div className="space-y-4 pt-2">
                    <div className="form-control">
                      <label className="block text-sm font-semibold mb-2">Delivery Address</label>
                      <input name="address" type="text" placeholder="Delivery Address" className="input input-bordered rounded-xl w-full" />
                    </div>
                    <div className="form-control">
                      <label className="block text-sm font-semibold mb-2">Pick Up / Date</label>
                      <input name="date" type="date" className="input input-bordered rounded-xl w-full" />
                    </div>
                    <div className="form-control">
                      <label className="block text-sm font-semibold mb-2">Phone Number</label>
                      <input name="phone" type="text" placeholder="Phone Number" className="input input-bordered rounded-xl w-full" />
                    </div>
                    <div className="form-control">
                      <label className="block text-sm font-semibold mb-2">Additional Notes</label>
                      <textarea name="notes" rows="2" placeholder="Any special requests or notes..." className="textarea textarea-bordered rounded-xl resize-none w-full"></textarea>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline flex-1 rounded-xl">Cancel</button>
                    <button type="submit" className={`btn flex-1 rounded-xl text-white ${isPet ? 'btn-success' : 'btn-primary'}`}>
                      <FaShoppingCart /> Confirm
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
                <h3 className="font-bold text-2xl mb-2">Done!</h3>
                <p className="text-base-content/60 mb-6">Your {isPet ? "adoption request" : "order"} for <span className="font-bold text-base-content">{listing.name}</span> has been placed.</p>
                <div className="flex gap-3 justify-center">
                  <button onClick={() => { setShowModal(false); setOrderDone(false); }} className="btn btn-outline rounded-xl">Close</button>
                  <button onClick={() => navigate("/my-orders")} className="btn btn-primary text-white rounded-xl">View My Orders</button>
                </div>
              </div>
            )}
          </div>
          <div className="modal-backdrop" onClick={() => { setShowModal(false); setOrderDone(false); }}></div>
        </div>
      )}
    </div>
  );
};

export default ListingDetails;
