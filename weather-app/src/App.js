// import { Search } from "lucide-react";
// import { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";

// const date = new Date();
// date.setDate(date.getDate());
// const toastNotif = () => toast.error("Please enter a valid city!");

// export default function App() {
//   const [newCity, setNewCity] = useState("");
//   const [city, setCity] = useState("");
//   const [country, setCountry] = useState("");
//   const [temp, setTemp] = useState();
//   const [cloudDesc, setCloudDesc] = useState("");
//   const [humidity, setHumidity] = useState("");
//   const [wind, setWind] = useState("");
//   const [pressure, setPressure] = useState("");

//   const APIkey = "7b4ad1d64ca2181ff5c357c92d2c320f";

//   const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

//   const getWeather = async (city) => {
//     try {
//       const response = await fetch(
//         `${BASE_URL}?q=${city}&appid=${APIkey}&units=metric`,
//       );

//       if (newCity === "") toastNotif();

//       if (!response.ok) throw new Error("City not found");

//       const data = await response.json();

//       weatherData(data);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   function weatherData(data) {
//     const {
//       name: cityName,
//       main: { humidity, pressure, temp: temperature },
//       sys: { country: weatherCountry },
//       weather: [{ description: cloud }],
//       wind: { speed: wind },
//     } = data;

//     setCity(cityName);
//     setCountry(weatherCountry);
//     setTemp(temperature);
//     setCloudDesc(cloud);
//     setHumidity(humidity);
//     setWind(wind);
//     setPressure(pressure);
//   }

//   return (
//     <div className="app-container">
//       <Toaster
//         position="top-center"
//         reverseOrder={false}
//         toastOptions={{
//           className: "",
//           style: {
//             border: "2px solid #d32000",
//           },
//         }}
//       />
//       <div className="weather-card">
//         <div className="flex-wrap">
//           <input
//             type="text"
//             className="search-input"
//             placeholder="Search city..."
//             value={newCity}
//             onChange={(e) => setNewCity(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 getWeather(newCity);
//                 setNewCity("");
//               }
//             }}
//           />

//           <Search />
//         </div>

//         <div className="info">
//           <h3>{city === "" ? "" : `${city}, ${country}`}</h3>
//           <p>{date.toDateString()}</p>
//           <div className="temp-main">
//             {temp === undefined ? "" : `${temp.toFixed(0)}°C`}
//           </div>
//           <p>{cloudDesc}</p>
//         </div>

//         <div className="details-grid">
//           <div>
//             <small>Humidity</small>
//             <p>{humidity === "" ? "" : `${humidity}%`}</p>
//           </div>
//           <div>
//             <small>Wind</small>
//             <p>{wind === "" ? "" : `${wind} km/h`}</p>
//           </div>
//           <div>
//             <small>Pressure</small>
//             <p>{pressure}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { Search } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const API_KEY = "7b4ad1d64ca2181ff5c357c92d2c320f";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export default function App() {
  const [query, setQuery] = useState("");
  // Grouping related data into one object
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) {
      toast.error("Please enter a city name!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`,
      );

      if (!response.ok) throw new Error("City not found");

      const data = await response.json();

      // Map API data to our clean state object
      setWeather({
        city: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        pressure: data.main.pressure,
      });

      setQuery(""); // Clear input on success
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Toaster position="top-center" />

      <div className="weather-card">
        <div className="flex-wrap">
          <input
            type="text"
            className="search-input"
            placeholder="Search city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchWeather(query)}
          />
          <Search
            onClick={() => fetchWeather(query)}
            className="cursor-pointer"
          />
        </div>

        {weather ? (
          <>
            <div className="info">
              <h3>
                {weather.city}, {weather.country}
              </h3>
              <p>{new Date().toDateString()}</p>
              <div className="temp-main">{weather.temp.toFixed(0)}°C</div>
              <p className="capitalize">{weather.description}</p>
            </div>

            <div className="details-grid">
              <WeatherDetail label="Humidity" value={`${weather.humidity}%`} />
              <WeatherDetail label="Wind" value={`${weather.wind} km/h`} />
              <WeatherDetail label="Pressure" value={weather.pressure} />
            </div>
          </>
        ) : (
          <p className="placeholder-text">
            Search for a city to see the weather!
          </p>
        )}
      </div>
    </div>
  );
}

// Small reusable component to keep the main JSX clean
function WeatherDetail({ label, value }) {
  return (
    <div>
      <small>{label}</small>
      <p>{value}</p>
    </div>
  );
}
