import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("myOrders") || "[]");
    const mine = all.filter((o) => o.buyerEmail === (user?.email || ""));
    setOrders(mine);
  }, [user]);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto mt-6 mb-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-2">My Orders</h2>
      <p className="text-base-content/50 mb-8">All your adoption requests and product orders.</p>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-base-content/40">
          <p className="text-2xl font-bold">You have no orders yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-base-200 shadow-sm">
          <table className="table w-full">
            <thead className="bg-base-200 text-base-content">
              <tr>
                <th>#</th>
                <th>Listing Name</th>
                <th>Category</th>
                <th>Buyer Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id} className="hover">
                  <td>{index + 1}</td>
                  <td className="font-semibold">{order.listingName}</td>
                  <td><span className="badge badge-outline badge-secondary">{order.category}</span></td>
                  <td>{order.buyerName}</td>
                  <td>{order.phone}</td>
                  <td>{order.address}</td>
                  <td>{order.quantity}</td>
                  <td className="font-bold text-primary">
                    {order.price === 0 ? <span className="text-success">Free</span> : `$${order.price}`}
                  </td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
