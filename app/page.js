'use client'

import { useState, useEffect } from "react";
import Countries from "./components/Countries";
import LiveSearch from "./components/LiveSearch";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [sortBy, setSortBy] = useState("name"); // Default sorting criterion
  const [sortDirection, setSortDirection] = useState("asc"); // Default sorting direction

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
  }, []);

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(newSortBy);
      setSortDirection("asc");
    }
  };

  const getSearchResults = (results) => {
    setCountries(results);
  };

  return (
    <div>
      <h1 className="font-bold text-6xl mt-14">Countries Information</h1>
      <LiveSearch getSearchResults={getSearchResults} handleSortChange={handleSortChange} />
      <Countries countries={countries} sortBy={sortBy} sortDirection={sortDirection} />
    </div>
  );
}