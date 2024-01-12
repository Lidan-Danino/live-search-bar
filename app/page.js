"use client";

import { useState, useEffect } from "react";
import Countries from "../components/Countries";

export default function Home() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountries = async (state) => {
      const response = await "/api/countries";
      const countries = await response.json();
      setCountries(countries);
    };
  }, []);

  return (
    <div>
      <h1 className="font-bold text-6xl mt-14">Countries Information</h1>
      <Countries countries={countries} />
    </div>
  );
}
