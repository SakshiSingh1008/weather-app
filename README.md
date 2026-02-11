# Weather App 

A simple **Weather App** built with **React (frontend)** and **Node.js/Express (backend)**.  
It allows users to check the **current weather**, **hourly forecast**, and **daily forecast** for any city or their **current location**. Weather conditions are displayed with **emojis** for a clean, user-friendly interface.

---

## Features

- Search weather by city
- Use **current location** for weather
- Hourly forecast (next 5 hours)
- Daily forecast (next 5 days)
- Weather emojis for easy understanding
- Last updated timestamp

---

## Setup Instructions

### Backend

1. Go to the backend folder:

```bash
cd backend
Install dependencies:
npm install

Create a .env file and add your OpenWeatherMap API key:

WEATHER_API_KEY=your_openweathermap_api_key


Get your API key here: OpenWeatherMap

Start the backend server:

npm start


Runs on http://localhost:5000.

Frontend

Go to the frontend folder:

cd frontend


Install dependencies:

npm install


Start the frontend:

npm start


Runs on http://localhost:3000.

APIs / Providers Used

OpenWeatherMap API – for weather data

Assumptions / Limitations

Supports only cities recognized by OpenWeatherMap

Reverse geocoding works only if location access is allowed

Hourly forecast: next 5 hours

Daily forecast: next 5 days

Free-tier API limits apply
