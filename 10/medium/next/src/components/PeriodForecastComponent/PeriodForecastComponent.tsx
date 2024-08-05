import { PeriodWeatherForecast } from '@/types';
import Image from 'next/image';

type PeriodForecastComponentProps = {
  period: PeriodWeatherForecast;
};

const getWeatherImage = (period: PeriodWeatherForecast) => {
  if (period.precipitationProbability >= 20) {
    return '/rainy.png';
  } else if (period.windSpeed > 12) {
    return '/thunder.png';
  } else if (period.temperature > 25 || period.feelsLike > 25) {
    return '/sunny.png';
  } else if (period.humidity > 70 || (period.temperature <= 30 && period.feelsLike <= 30)) {
    return '/cloudy.png';
  } else {
    return '/sunny.png'; 
  }
};

export const PeriodForecastComponent: React.FC<PeriodForecastComponentProps> = ({ period }) => {
  const weatherImage = getWeatherImage(period);

  return (
    <div className="mb-4 p-4 border rounded shadow">
      <h3 className="text-lg font-medium mb-1">{period.timePeriod}</h3>
      <Image src={weatherImage} alt="Weather condition" className="w-16 h-16 mb-2" width={40} height={40}/>
      <p>Temperature: {period.temperature}°C</p>
      <p>Feels Like: {period.feelsLike}°C</p>
      <p>Pressure: {period.pressure} hPa</p>
      <p>Humidity: {period.humidity}%</p>
      <p>Wind Speed: {period.windSpeed} km/h</p>
      <p>Precipitation Probability: {period.precipitationProbability}%</p>
    </div>
  );
};