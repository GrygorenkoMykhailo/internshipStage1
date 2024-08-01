"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { WeatherContextType } from '@/types';

export const WeatherContext = React.createContext<WeatherContextType | null>(null);

const WeatherProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [weather, setWeather] = useState<WeatherContextType | null>(null);

    useEffect(() => {
        (async () => {
          const response = await axios.get('/api/weather/getWeather')
          const data = response.data as WeatherContextType;
          setWeather(data);
        })()
      }, []);

    return <WeatherContext.Provider value={weather}>{children}</WeatherContext.Provider>
}

export default WeatherProvider;