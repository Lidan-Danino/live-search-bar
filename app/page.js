// 'use client' indicates the usage of the API route on the client side
"use client";

// Importing necessary dependencies from React
import { useState, useEffect } from "react";
import Countries from "./components/Countries";
import LiveSearch from "./components/LiveSearch";

// The main component for the Home page
export default function Home() {
  const [countries, setCountries] = useState([]);
  const [sortBy, setSortBy] = useState("name"); // Default sorting criterion
  const [sortDirection, setSortDirection] = useState("asc"); // Default sorting direction

  // Fetch countries data from the API on component mount
  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch("/api/countries");
        const countries = await response.json();
        setCountries(countries);
      } catch (error) {
        console.error("Error fetching countries:", error.message);
      }
    };
    getCountries();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Function to handle changes in sorting criteria
  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(newSortBy);
      setSortDirection("asc");
    }
  };

  // Function to update the list of countries based on search results
  const getSearchResults = (results) => {
    setCountries(results);
  };

  // Rendering the components and UI for the Home page
  return (
    <div>
      <h1 className="font-bold text-center text-6xl mt-14">
        Countries Live Search
      </h1>

      <LiveSearch
        getSearchResults={getSearchResults}
        handleSortChange={handleSortChange}
      />

      <Countries
        countries={countries}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />
    </div>
  );
}
