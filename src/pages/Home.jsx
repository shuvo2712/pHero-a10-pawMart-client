import { useState, useEffect } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { Tooltip } from "react-tooltip";

// Import modular home sub-sections
import Banner from "../components/Banner";
import CategorySection from "../components/CategorySection";
import RecentListings from "../components/RecentListings";
import WhyAdopt from "../components/WhyAdopt";
import PetHeroes from "../components/PetHeroes";

const Home = () => {
  useDocumentTitle("Home");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/listings/latest`)
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading listings:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      {/* 1. Banner slider section */}
      <Banner />

      {/* 2. Category browsing grid */}
      <CategorySection />

      {/* 3. Recent listings display */}
      <RecentListings listings={listings} />

      {/* 4. Why Adopt awareness cards */}
      <WhyAdopt />

      {/* 5. Meet our Adopter heroes profiles */}
      <PetHeroes />

      {/* Global Tooltip anchor for listings */}
      <Tooltip id="free-badge-tip" place="top" />
    </div>
  );
};

export default Home;
