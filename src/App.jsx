import { useState } from "react";
import "./index.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "d56746ccfced75f6f163051a52ffe2ef";

  function weatherApp() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("City Not Found!");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setError("");
        setCity("");
        // console.log(data);
      })
      .catch((err) => {
        setError(err.message);
        setWeatherData(null);
      });
  }

  const handleSearch = () => {
    if (!city) {
      setError("Please enter a city name");
      setWeatherData(null); 
      return;
    }
    weatherApp();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="mb-5 text-center font-medium">
          <h1 className="text-lg text-gray-900">Weather App</h1>
          <p className="text-sm text-gray-500">
            Search for the current weather conditions in your city
          </p>
        </div>
        <div className="flex items-center mb-6">
          <input
            type="text"
            className="flex h-9 w-full border border-gray-400 bg-gray-100 px-3 py-1 text-sm shadow-sm flex-1 mr-2 rounded-xl outline-none focus:border-gray-900"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="inline-flex items-center justify-center rounded-xl text-sm font-medium border shadow-sm h-9 px-4 py-2 bg-gray-900 text-white"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {weatherData && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">
              {weatherData.name},{weatherData.sys.country}
            </h2>
            <p className="text-sm">Temp: {weatherData.main.temp} °C</p>
            <p className="text-sm">Weather: {weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
