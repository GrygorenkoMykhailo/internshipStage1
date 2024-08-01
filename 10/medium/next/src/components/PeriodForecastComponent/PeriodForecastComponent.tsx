import { PeriodWeatherForecast } from '@/types';

type PeriodForecastComponentProps = {
  period: PeriodWeatherForecast;
};

export const PeriodForecastComponent: React.FC<PeriodForecastComponentProps> = ({ period }) => {
  return (
    <div className="mb-4 p-4 border rounded shadow">
      <h3 className="text-lg font-medium mb-1">{period.timePeriod}</h3>
      <p>Temperature: {period.temperature}°C</p>
      <p>Feels Like: {period.feelsLike}°C</p>
      <p>Pressure: {period.pressure} hPa</p>
      <p>Humidity: {period.humidity}%</p>
      <p>Wind Speed: {period.windSpeed} km/h</p>
      <p>Precipitation Probability: {period.precipitationProbability}%</p>
    </div>
  );
};