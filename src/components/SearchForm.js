import { useState } from "react";
import axios from "axios";

export default function SearchForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!from || !to || !date) return;

    const apiKey = process.env.NEXT_PUBLIC_FLIGHT_API_KEY;

    try {
      const response = await axios.get("https://api.tequila.kiwi.com/v2/search", {
        headers: { apikey: apiKey },
        params: {
          fly_from: from,
          fly_to: to,
          date_from: date,
          date_to: date,
          curr: "USD",
          sort: "price",
          limit: 10
        },
      });
      setResults(response.data.data);
    } catch (err) {
      console.error("API error:", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="From (e.g. JNB)"
            value={from}
            onChange={(e) => setFrom(e.target.value.toUpperCase())}
            className="border p-2 flex-1 rounded"
          />
          <input
            type="text"
            placeholder="To (e.g. CPT)"
            value={to}
            onChange={(e) => setTo(e.target.value.toUpperCase())}
            className="border p-2 flex-1 rounded"
          />
        </div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-vacayGreen text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Search Flights
        </button>
      </form>

      <div className="mt-8">
        {results.length > 0 && (
          <ul className="space-y-4">
            {results.map((flight) => (
              <li key={flight.id} className="border p-4 rounded shadow-sm">
                <div className="font-bold">{flight.cityFrom} → {flight.cityTo}</div>
                <div>{new Date(flight.dTime * 1000).toLocaleString()} – {new Date(flight.aTime * 1000).toLocaleString()}</div>
                <div className="text-green-700 font-semibold">${flight.price}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
