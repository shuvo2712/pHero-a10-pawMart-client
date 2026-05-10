import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("myOrders") || "[]");
    const mine = all.filter((o) => o.buyerEmail === (user?.email || ""));
    setOrders(mine);
  }, [user]);

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("My Orders Report", 14, 16);
    autoTable(doc, {
      startY: 22,
      head: [["#", "Listing Name", "Buyer Name", "Price", "Qty", "Address", "Date", "Phone"]],
      body: orders.map((order, index) => [
        index + 1,
        order.listingName,
        order.buyerName,
        order.price === 0 ? "Free" : `$${order.price}`,
        order.quantity,
        order.address,
        order.date,
        order.phone,
      ]),
    });
    doc.save("my-orders.pdf");
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto mt-6 mb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-1">My Orders</h2>
          <p className="text-base-content/50">All your adoption requests and product orders.</p>
        </div>
        {orders.length > 0 && (
          <button onClick={handleDownload} className="btn btn-primary rounded-xl flex items-center gap-2">
            <FaDownload /> Download Report
          </button>
        )}
      </div>

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
                <th>Buyer Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Address</th>
                <th>Date</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id} className="hover">
                  <td>{index + 1}</td>
                  <td className="font-semibold">{order.listingName}</td>
                  <td>{order.buyerName}</td>
                  <td className="font-bold text-primary">
                    {order.price === 0 ? <span className="text-success">Free</span> : `$${order.price}`}
                  </td>
                  <td>{order.quantity}</td>
                  <td>{order.address}</td>
                  <td>{order.date}</td>
                  <td>{order.phone}</td>
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
