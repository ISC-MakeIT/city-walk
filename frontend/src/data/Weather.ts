export interface WeatherData {
    weather: { main: string; description: string }[];
    main: { temp: number; humidity: number };
    wind: { speed: number };
    name: string;
}
