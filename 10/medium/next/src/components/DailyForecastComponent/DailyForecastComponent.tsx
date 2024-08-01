import { DailyWeatherForecast, PeriodWeatherForecast } from '@/types';
import { PeriodForecastComponent } from '../PeriodForecastComponent';

type DailyForecastComponentProps = {
  dailyForecast: DailyWeatherForecast;
};

export const DailyForecastComponent: React.FC<DailyForecastComponentProps> = ({ dailyForecast }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-2">Weather for {dailyForecast.date}</h2>
      {dailyForecast.periods.map((period, index) => (
        <PeriodForecastComponent key={index} period={period} />
      ))}
    </div>
  );
};