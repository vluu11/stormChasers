import dotenv from 'dotenv';

dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  temp: number;
  windSpeed: number;
  humidity: number;

  constructor(temp:number, windSpeed:number, humidity:number){
    this.temp = temp;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;
  private apiKey?: string;

  constructor(){
    this.baseURL = process.env.API_BASE_URL || 'https://api.openweathermap.org';
    this.apiKey = process.env.API_KEY || '';
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const url = `${this.baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }

    return response.json();
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const{lat, lon} = locationData;

    return {lat, lon};
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(query:string): string {
    return `${this.baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const{lat, lon} = coordinates;
    return `${this.baseURL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(query: string): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(query);
    return this.destructureLocationData(locationData);

  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    
  }
}

export default new WeatherService();
