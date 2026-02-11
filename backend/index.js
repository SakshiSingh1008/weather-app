const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = 5000;
const API_KEY = process.env.WEATHER_API_KEY;

if (!API_KEY) {
  console.error("Please set WEATHER_API_KEY in your .env");
  process.exit(1);
}

// Root
app.get("/", (req, res) => {
  res.json({ message: "Weather API is running" });
});

// Current weather
app.get("/api/weather", async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: "City required" });

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const { data } = await axios.get(url);

    res.json({
      location: { city: data.name, country: data.sys.country },
      current: {
        tempC: data.main.temp,
        feelsLikeC: data.main.feels_like,
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        windKph: data.wind.speed,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    res.status(404).json({ error: "City not found" });
  }
});

// Hourly forecast - next 5 hours
app.get("/api/forecast/hourly", async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: "City required" });

  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    const { data } = await axios.get(url);

    const forecast = data.list.slice(0, 5).map((item) => ({
      time: item.dt_txt,
      tempC: item.main.temp,
      condition: item.weather[0].main,
    }));

    res.json({ forecast });
  } catch (err) {
    res.status(404).json({ error: "Forecast not found" });
  }
});

// Daily forecast - next 5 days
app.get("/api/forecast/daily", async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: "City required" });

  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    const { data } = await axios.get(url);

    // group by date
    const dailyMap = {};
    data.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!dailyMap[date]) dailyMap[date] = item;
    });

    const forecast = Object.keys(dailyMap)
      .slice(0, 5)
      .map((date) => ({
        date,
        tempC: dailyMap[date].main.temp,
        condition: dailyMap[date].weather[0].main,
      }));

    res.json({ forecast });
  } catch (err) {
    res.status(404).json({ error: "Daily forecast not found" });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
