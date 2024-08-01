import { PeriodWeatherForecast } from "./PeriodWeatherForecast";

export type DailyWeatherForecast = {
    date: string;
    periods: PeriodWeatherForecast[];
};