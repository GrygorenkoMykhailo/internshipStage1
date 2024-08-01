"use client";

import React, { useContext, useEffect, useState } from 'react';
import { WeatherContext } from '@/context/WeatherContext';
import { DailyForecastComponent } from '@/components';
import './globals.css';
import { WeatherContextType } from '@/types';

export default function Home() {
  const context = useContext(WeatherContext) as WeatherContextType;
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    if (context && context.dailyForecasts.length > 0) {
      setSelectedDate(context.dailyForecasts[0].date);
    }
  }, [context]);
  if (!context) return <div>Loading...</div>;

  const { dailyForecasts } = context;

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 p-4">
        {dailyForecasts.map((dailyForecast, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white py-2 px-4 rounded shadow"
            onClick={() => handleDateClick(dailyForecast.date)}
          >
            {dailyForecast.date}
          </button>
        ))}
      </div>
      {selectedDate && (
        <DailyForecastComponent
          dailyForecast={
            dailyForecasts.find((dailyForecast) => dailyForecast.date === selectedDate)!
          }
        />
      )}
    </>
  );
}
