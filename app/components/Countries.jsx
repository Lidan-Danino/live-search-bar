import React from "react";

export default function Countries({ countries }) {
  return (
    <>
      <ul className="grid grid-cols-4 mx-auto max-w-[1260px] gap-10">
        {countries.map((country) => (
          <li key={country.id} className="flex flex-col">
            <h3 className="text-2xl font-bold">
              {country.name.common} {country.flag}
            </h3>
            <p>
              Languages:{" "}
              {country.languages
                ? Object.values(country.languages).join(", ")
                : "N/A"}
            </p>
            <p>
              Currencies:{" "}
              {country.currencies
                ? Object.values(country.currencies)
                    .map((currency) => `${currency.name} (${currency.symbol})`)
                    .join(", ")
                : "N/A"}
            </p>
            <p>Population: {country.population}</p>
            <p>Capital city: {country.capital}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
