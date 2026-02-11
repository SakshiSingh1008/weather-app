import { useState } from "react";
import "./index.css";

// Helper: get emoji for weather
const getWeatherEmoji = (condition) => {
  switch (condition.toLowerCase()) {
    case "clear": return "☀️";
    case "clouds": return "☁️";
    case "rain": return "🌧️";
    case "snow": return "❄️";
    case "thunderstorm": return "⛈️";
    case "mist":
    case "fog": return "🌫️";
    default: return "🌤️";
  }
};

// Helper: convert date to weekday
const getWeekday = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);
    setForecast([]);
    setDailyForecast([]);
    setLastUpdated(new Date());
    try {
      const weatherRes = await fetch(
        `http://localhost:5000/api/weather?city=${city}`
      );
      const hourlyRes = await fetch(
        `http://localhost:5000/api/forecast/hourly?city=${city}`
      );
      const dailyRes = await fetch(
        `http://localhost:5000/api/forecast/daily?city=${city}`
      );

      if (!weatherRes.ok) throw new Error("City not found");

      const weatherData = await weatherRes.json();
      const hourlyData = await hourlyRes.json();
      const dailyData = await dailyRes.json();

      setWeather(weatherData);
      setForecast(hourlyData.forecast);
      setDailyForecast(dailyData.forecast);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h2 className="title">🌤 Weather App</h2>

        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input"
        />

        <button onClick={fetchWeather} className="button">
          Search
        </button>

        {loading && <p className="info">Loading...</p>}
        {error && <p className="error">{error}</p>}

     {weather && (
  <div className="card">
    <p className="city">
      {weather.location.city}, {weather.location.country}
    </p>
    <div className="temp">
      {weather.current.tempC}°C {getWeatherEmoji(weather.current.condition)}
    </div>
    <p className="condition">{weather.current.condition}</p>
    {lastUpdated && (
      <p className="info">
        ⏱ Last Updated: {lastUpdated.toLocaleString("en-US", {
          hour: "numeric",
         
          hour12: true,
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    )}
    <div className="details">
      <div className="row">
        <span>🤒 Feels Like</span>
        <span>{weather.current.feelsLikeC}°C</span>
      </div>
      <div className="row">
        <span>💧 Humidity</span>
        <span>{weather.current.humidity}%</span>
      </div>
      <div className="row">
        <span>💨 Wind</span>
        <span>{weather.current.windKph} km/h</span>
      </div>
    </div>

    
  </div>
)}

        

        {/* Hourly Forecast */}
        {forecast.length > 0 && (
          <div className="forecastSection">
            <h4>Next 5 Hours ⏱️</h4>
            <div className="rowCards">
              {forecast.map((item, i) => (
                <div key={i} className="forecastCard">
                  <p className="emoji">{getWeatherEmoji(item.condition)}</p>
                  <p className="time">
                    {new Date(item.time).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </p>
                  <p className="tempSmall">{item.tempC}°C</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Daily Forecast */}
        {dailyForecast.length > 0 && (
          <div className="forecastSection">
            <h4>Next 5 Days 📅</h4>
            <div className="rowCards">
              {dailyForecast.map((day, i) => (
                <div key={i} className="forecastCard">
                  <p className="emoji">{getWeatherEmoji(day.condition)}</p>
                  <p className="time">{getWeekday(day.date).slice(0, 3)}</p>
                  <p className="tempSmall">{day.tempC}°C</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
