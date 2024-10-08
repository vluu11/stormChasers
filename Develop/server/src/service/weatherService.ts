import dotenv from 'dotenv';

dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: string;
  windSpeed: string;
  humidity: string;

  constructor(city: string, date: string, icon: string, iconDescription: string, tempF: string, windSpeed: string, humidity: string){
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;

  constructor(){
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const url = this.buildGeocodeQuery(query);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }

    const data = await response.json();

    return {lat: data.city.coord.lat, lon: data.city.coord.lon};
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const{lat, lon} = locationData;

    return {lat, lon};
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(query:string): string {
    return `${this.baseURL}/data/2.5/forecast?q=${query}&appid=${this.apiKey}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const{lat, lon} = coordinates;
    return `${this.baseURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&unit=imperial`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(query: string): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(query);
    return this.destructureLocationData(locationData);

  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const url = this.buildWeatherQuery(coordinates);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    
    return data;

  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {

    const weatherData = response.list[0];

    const weatherInfo = weatherData.weather[0];

    return new Weather(
      response.city.name,
      weatherData.dt_txt,
      weatherInfo.icon,
      weatherInfo.iconDescription,
      weatherData.main.temp,
      weatherData.wind.speed,
      weatherData.main.humidity
    )

  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray: Weather[] = [];
    const fiveDayForcast = weatherData.slice(0,6);
    // Iterate through the weather data array
    for (const data of fiveDayForcast) {
        const city = currentWeather.city; // Extract temperature
        const date = data.dt_txt; // Extract wind speed
        const iconDescription = data.weather[0].description; // Extract humidity
        const icon = data.weather[0].icon;
        const tempF = data.main.temp;
        const windSpeed = data.wind.speed;
        const humidity = data.main.humidity;

        // Create a new Weather object for the current data point
        const forecastWeather = new Weather(city, date, icon, iconDescription, tempF, windSpeed, humidity);
        // Add the Weather object to the forecast array
        forecastArray.push(forecastWeather);
    }

    return forecastArray; // Return the array of weather objects

  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    const coordinates = await this.fetchAndDestructureLocationData(city);
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);

    const forecastArray = this.buildForecastArray(currentWeather, weatherData.list);

    return forecastArray;
  }
}

export default new WeatherService();
