import React, { useState, useEffect } from "react";
import axios from "axios";
import { WeatherData } from "../data/Weather";
import "./Weather.css"; // Import the CSS file

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // .env から取得
const CITY_ID = "1848354"; // 神奈川県（横浜）の都市ID

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bgGradient, setBgGradient] = useState<string>("linear-gradient(180deg, #D3D3D3 0%, #A9A9A9 50%, #FFF 100%)");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?id=${CITY_ID}&appid=${API_KEY}&units=metric`
        );
        setWeather(response.data);
      } catch (err) {
        setError("天気情報を取得できませんでした。");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  useEffect(() => {
    if (weather) {
      setBgGradient(getBackgroundGradient(weather.weather[0].main));
    }
  }, [weather]);

  const getBackgroundGradient = (weatherType: string): string => {
    switch (weatherType) {
      case "Clear":
        return "linear-gradient(180deg, #CFEBF7 0%, #A0D8EF 31.67%, #FFF 100%)";
      case "Clouds":
        return "linear-gradient(180deg, #CED1D3 25.67%, #FFF 100%)";
      case "Rain":
        return "background: linear-gradient(180deg, #CED1D3 17.4%, #0F5779 72.4%)";
      case "Snow":
        return "linear-gradient(180deg, #E0F7FA 0%, #B3E5FC 50%, #FFF 100%)";
      case "Thunderstorm":
        return "linear-gradient(180deg, #483D8B 0%, #8A2BE2 50%, #FFF 100%)";
      case "Drizzle":
        return "linear-gradient(180deg, #87CEFA 0%, #ADD8E6 50%, #FFF 100%)";
      default:
        return "linear-gradient(180deg, #D3D3D3 0%, #A9A9A9 50%, #FFF 100%)";
    }
  };

  const translateWeatherDescription = (description: string): string => {
    switch (description) {
      case "clear sky":
        return "快晴";
      case "few clouds":
        return "少し曇り";
      case "scattered clouds":
        return "散在する雲";
      case "broken clouds":
        return "曇りがち";
      case "shower rain":
        return "にわか雨";
      case "rain":
        return "雨";
      case "thunderstorm":
        return "雷雨";
      case "snow":
        return "雪";
      case "mist":
        return "霧";
      default:
        return description;
    }
  };

  if (loading) return <p>天気情報を取得中...</p>;
  if (error) return <p>{error}</p>;

  return (
      <div
          className="weather-container"
          style={{ backgroundImage: bgGradient }}
      >
        <p className="weather-info">天気: {translateWeatherDescription(weather?.weather[0].description || "")}</p>
        <p className="weather-info">気温: {weather?.main.temp}°C</p>
      </div>
  );
};

export default Weather;
