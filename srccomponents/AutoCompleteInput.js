import { useEffect, useState } from "react";
import axios from "axios";

export default function AutocompleteInput({ value, onChange, placeholder }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = async (e) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    if (inputValue.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const apiKey = process.env.NEXT_PUBLIC_FLIGHT_API_KEY;
      const res = await axios.get("https://api.tequila.kiwi.com/locations/query", {
        headers: { apikey: apiKey },
        params: {
          term: inputValue,
          locale: "en-US",
          location_types: "airport",
          limit: 5,
        },
      });
      setSuggestions(res.data.locations);
      setShowDropdown(true);
    } catch (error) {
      console.error("Autocomplete error:", error);
    }
  };

  const handleSelect = (item) => {
    onChange(item.code);
    setSuggestions([]);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        className="border p-2 w-full rounded"
      />
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded w-full mt-1 shadow max-h-48 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              className="p-2 hover:bg-green-100 cursor-pointer"
            >
              {item.city.name}, {item.name} ({item.code})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
