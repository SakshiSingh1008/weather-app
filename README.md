# Weather App 🌤️

A simple **Weather App** built with **React (frontend)** and **Node.js/Express (backend)**.  
Check **current weather**, **hourly forecast (next 5 hours)**, and **daily forecast (next 5 days)** for any city or your **current location**. Weather conditions are displayed with **emojis** for a clean, user-friendly interface.

---

## Features

- Search weather by city  
- Use **current location**  
- Hourly forecast (next 5 hours)  
- Daily forecast (next 5 days)  
- Weather emojis for easy understanding  
- Last updated timestamp  

---

## Setup Instructions (All in One)

From the **root folder** of the project:

1. Install backend and frontend dependencies:  
```bash
cd backend
npm install
cd ../frontend
npm install
Create a .env file inside backend and add your OpenWeatherMap API key:

WEATHER_API_KEY=your_openweathermap_api_key


Get your API key here: OpenWeatherMap

Start both servers:

Option 1: Start backend first, then frontend

cd backend && npm start   # backend runs at http://localhost:5000
cd ../frontend && npm start  # frontend runs at http://localhost:3000


Option 2: Run concurrently (optional)

npm install -g concurrently
concurrently "cd backend && npm start" "cd frontend && npm start"

APIs / Providers Used

OpenWeatherMap API – for weather data

OpenStreetMap Nominatim API – for reverse geocoding

Assumptions / Limitations

Supports only cities recognized by OpenWeatherMap

Reverse geocoding works only if location access is allowed

Hourly forecast: next 5 hours

Daily forecast: next 5 days

Free-tier API limits apply
