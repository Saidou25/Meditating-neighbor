import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;


const search = async (longitude, latitude) => 
  axios.get(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${apiKey}`
  );

export default { search };