import axios from "axios";

const apiKey = "4f112ad8f388d7d13afdcbf2472fed94";

const search = async (longitude, latitude) => 
  axios.get(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${apiKey}`
  );

export default { search };
