"use client";

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { WeatherContext } from '@/context/WeatherContext';
import { DailyForecastComponent } from '@/components';
import { WeatherContextType } from '@/types';
import '../../../app/globals.css';

interface ForecastPageProps{
  params: {
    date: string
  }
}

const ForecastPage = ({ params: { date } }: ForecastPageProps) => {
  const router = useRouter();
  const context = useContext(WeatherContext) as WeatherContextType;

  if (!context) return <div>Loading...</div>;

  const dailyForecast = context.dailyForecasts.find(forecast => forecast.date === date);

  if (!dailyForecast) return <div>No forecast found for the selected date.</div>;

  return (
    <div>
      <DailyForecastComponent dailyForecast={dailyForecast} />
    </div>
  );
};

export default ForecastPage;