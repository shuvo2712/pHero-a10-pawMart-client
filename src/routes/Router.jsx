import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PetsAndSupplies from "../pages/PetsAndSupplies";
import AddListing from "../pages/AddListing";
import MyListings from "../pages/MyListings";
import MyOrders from "../pages/MyOrders";
import CategoryProducts from "../pages/CategoryProducts";
import ListingDetails from "../pages/ListingDetails";
import PrivateRoute from "../routes/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pets-and-supplies",
        element: <PetsAndSupplies />,
      },
      {
        path: "/category-filtered-product/:categoryName",
        element: <CategoryProducts />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/listing-details/:id",
        element: (
          <PrivateRoute>
            <ListingDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-listing",
        element: (
          <PrivateRoute>
            <AddListing />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-listings",
        element: (
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
