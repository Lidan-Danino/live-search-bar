import { useState, useEffect } from "react";

// Functional component for live search functionality
export default function LiveSearch({ getSearchResults, handleSortChange }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const [sortOption, setSortOption] = useState("name"); // Added sortOption state

  // Function to fetch data from the API based on the search query
  const fetchData = async () => {
    try {
      // Set loading to true to indicate the start of the API request
      setLoading(true);
      // Fetch data from the API using the search query
      const response = await fetch(`/api/countries/search?query=${query}`);
      // Parse the response into JSON format
      const country = await response.json();

      // Check if there are no search results
      if (country.length === 0) {
        setNoResults(true);
      } else {
        // If there are search results, update the state and pass them to the parent component
        setNoResults(false);
        getSearchResults(country);
      }
    } catch (error) {
      // Log and handle errors that occur during the API request
      console.error("Error fetching search results:", error.message);
      setError("Failed to fetch search results");
    } finally {
      // Set loading to false to indicate the end of the API request, regardless of success or failure
      setLoading(false);
    }
  };

  // Use effect for debouncing the API requests based on search input changes
  useEffect(() => {
    let timeoutId;

    // Debounce function to delay API requests
    const debouncedFetch = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(fetchData, 300);
    };

    // Trigger API request when the user stops typing
    debouncedFetch();

    // Cleanup function to clear the timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, [query, sortOption]); // Include sortOption in the dependency array

  // Function to handle the search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  // Function to handle the click on sort buttons
  const handleSortClick = (sortType) => {
    // Update the sorting option and inform the parent component
    setSortOption(sortType);
    handleSortChange(sortType);
  };

  // Render the UI for the LiveSearch component
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
          <button
            onClick={() => handleSortClick("name")}
            style={{ fontWeight: sortOption === "name" ? "bold" : "normal" }}
          >
            Name
          </button>
          <button
            onClick={() => handleSortClick("population")}
            style={{
              fontWeight: sortOption === "population" ? "bold" : "normal",
            }}
          >
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
