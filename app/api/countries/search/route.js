import { NextResponse } from "next/server";

async function fetchCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all", {
      method: "GET",
    });

    // Check if the response status is not OK
    if (!response.ok) {
      throw new Error(`Failed to fetch countries. Status: ${response.status}`);
    }

    // Parse the JSON response and return the countries data
    const countries = await response.json();
    return countries;
  } catch (error) {
    //handle error
    console.error("Error fetching countries:", error.message);
    throw new Error("Failed to fetch countries");
  }
}

// Next.js API route handling the GET request
export async function GET(request) {
  try {
    const countries = await fetchCountries();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    // Use filter to find countries with names containing the query (case-insensitive)
    const filteredCountries = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(query.toLowerCase());
    });

    // Return a JSON response with the fetched countries data
    return NextResponse.json(filteredCountries);
  } catch (error) {
    // Handle error
    console.error("Error in GET request:", error.message);

    return NextResponse.error({
      status: 500,
      body: "Internal Server Error",
    });
  }
}
