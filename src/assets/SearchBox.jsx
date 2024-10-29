import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';


export default function SearchBox() {
    let [city, setCity] = useState("");
    let [weatherData, setWeatherData] = useState(null);
    let [searchedCity, setSearchedCity] = useState(""); // New state to store the city name after submission
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "9f9531df935f89874147daa11d7b909b";

    let getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();

            if (jsonResponse.main) {
                let result = {
                    temp: jsonResponse.main.temp,
                    tempMin: jsonResponse.main.temp_min,
                    tempMax: jsonResponse.main.temp_max,
                    humidity: jsonResponse.main.humidity,
                    feelsLike: jsonResponse.main.feels_like,
                };
                setWeatherData(result);
                setSearchedCity(city); // Set the searched city name here
            } else {
                console.error("Error: Could not retrieve weather data. Response:", jsonResponse);
                setWeatherData(null);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setWeatherData(null);
        }
    };

    let handleChange = (evt) => {
        setCity(evt.target.value);
    }

    let handleSubmit = (evt) => {
        evt.preventDefault();
        if (city.trim() !== "") {
            getWeatherInfo();
            setCity("");  // Clear the input field after submission
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
            <div className="weather-app-container max-w-lg w-full text-center">
                <h3 className="text-3xl font-semibold mb-6 text-white">Search for Weather</h3>
                <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
                    <TextField
                        id="city"
                        label="City Name"
                        variant="outlined"
                        required
                        value={city}
                        onChange={handleChange}
                        className="w-full mb-4 bg-white rounded-lg"
                    />
                    <br />
                    <br />
                    <Button variant="contained" type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md">
                        Search
                    </Button>
                </form>

                {weatherData && (
                    <div className="weather-card mt-10 p-6" style={{borderRadius: "20px solid black" }}>
                        <h4 className="text-2xl font-bold mb-4">Weather in {searchedCity}</h4>
                        <p className="text-lg mb-2">Temperature: {weatherData.temp}°C</p>
                        <p className="text-lg mb-2">Min Temperature: {weatherData.tempMin}°C</p>
                        <p className="text-lg mb-2">Max Temperature: {weatherData.tempMax}°C</p>
                        <p className="text-lg mb-2">Humidity: {weatherData.humidity}%</p>
                        <p className="text-lg">Feels Like: {weatherData.feelsLike}°C</p>
                    </div>
                )}
            </div>
        </div>
    );
}
