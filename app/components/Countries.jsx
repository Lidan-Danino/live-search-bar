import React from "react";

// Functional component for displaying a list of countries
export default function Countries({ countries, sortBy, sortDirection }) {
  // Function to determine sorting order based on the selected sorting criterion and direction
  const sortCountries = (a, b) => {
    // Extract values based on the sorting criterion (name or population)
    const aValue = sortBy === "name" ? a.name.common : a.population;
    const bValue = sortBy === "name" ? b.name.common : b.population;

    if (typeof aValue === "string") {
      // If values are strings, use localeCompare for string comparison
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      // If values are numbers, use arithmetic comparison
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
  };

  // Sort the countries based on the specified sorting function
  const sortedCountries = countries.sort(sortCountries);

  // Render the UI for displaying sorted countries in a grid layout
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-auto max-w-[1260px]">
      {sortedCountries.map((country) => (
        <div
          key={country.name.common}
          className="p-4 border border-gray-300 rounded max-h-96 overflow-y-auto"
        >
          <h3 className="text-2xl font-bold mb-2">
            {country.name.common} {country.flag}
          </h3>
          <p className="mb-2">
            <strong>Languages:</strong>{" "}
            {country.languages
              ? Object.values(country.languages).join(", ")
              : "N/A"}
          </p>
          <p className="mb-2">
            <strong>Currencies:</strong>{" "}
            {country.currencies
              ? Object.values(country.currencies)
                  .map((currency) => `${currency.name} (${currency.symbol})`)
                  .join(", ")
              : "N/A"}
          </p>
          <p className="mb-2">
            <strong>Population:</strong> {country.population}
          </p>
          <p className="mb-2">
            <strong>Capital city:</strong> {country.capital}
          </p>
          <div>
            <strong>Time zones:</strong>
            <ul className="list-disc pl-6">
              {country.timezones.map((timezone, index) => (
                <li key={index}>{timezone}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
