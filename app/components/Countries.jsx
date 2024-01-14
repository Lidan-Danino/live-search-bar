// components/Countries.js

import React from "react";

export default function Countries({ countries, sortBy, sortDirection }) {
  const sortCountries = (a, b) => {
    const aValue = sortBy === "name" ? a.name.common : a.population;
    const bValue = sortBy === "name" ? b.name.common : b.population;

    if (typeof aValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
  };

  const sortedCountries = countries.sort(sortCountries);

  return (
    <>
      <ul className="grid grid-cols-4 mx-auto max-w-[1260px] gap-10">
        {sortedCountries.map((country) => (
          <li key={country.name.common} className="flex flex-col">
            <h3 className="text-2xl font-bold">
              {country.name.common} {country.flag}
            </h3>
            <p>
              Languages:{" "}
              {country.languages ? Object.values(country.languages).join(", ") : "N/A"}
            </p>
            <p>
              Currencies:{" "}
              {country.currencies
                ? Object.values(country.currencies)
                    .map(
                      (currency) => `${currency.name} (${currency.symbol})`
                    )
                    .join(", ")
                : "N/A"}
            </p>
            <p>Population: {country.population}</p>
            <p>Capital city: {country.capital}</p>
            <p>Time zone: {country.timezones}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
