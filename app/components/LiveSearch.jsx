"use client";

// components/LiveSearch.js

// components/LiveSearch.js

import { useState, useEffect } from "react";

export default function LiveSearch({ getSearchResults, handleSortChange }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/countries/search?query=${query}`);
      const country = await response.json();

      if (country.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
        getSearchResults(country);
      }
    } catch (error) {
      console.error("Error fetching search results:", error.message);
      setError("Failed to fetch search results");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timeoutId;

    // Debounce function to delay API requests
    const debouncedFetch = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(fetchData, 300); // Adjust the delay as needed
    };

    // Trigger API request when the user stops typing
    debouncedFetch();

    // Cleanup function to clear the timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="text-center my-20">
      <form onSubmit={handleSearch}>
        <input
          className="text-black border-2 border-black rounded-full px-3 py-2"
          type="text"
          placeholder="Search country..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex items-center justify-center space-x-4 mt-4">
          <p>Sort by:</p>
          <button onClick={() => handleSortChange("name")}>Name</button>
          <button onClick={() => handleSortChange("population")}>
            Population
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {noResults && <p>No country found.</p>}
      </form>
    </div>
  );
}
