"use client";

import { useState, useEffect } from "react";
import Countries from "./components/Countries";
import SearchCountries from "./components/SearchCountries";

export default function Home() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch("/api/countries");
      const countries = await response.json();
      setCountries(countries);
    };
    getCountries();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-6xl mt-14">Countries Information</h1>
      <SearchCountries getSearchResults={(results)=> setCountries(results)}/>
      <Countries countries={countries} />
    </div>
  );
}
