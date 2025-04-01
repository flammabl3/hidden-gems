import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthError, Session, User } from '@supabase/supabase-js';
import * as Location from 'expo-location';

type LocationReponse = {
    location: Location.LocationObject | undefined,
    error: string | undefined
};


type LocationContextType = {
    location: Location.LocationObject | undefined,
    error: string | undefined
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<Location.LocationObject | undefined>();
  const [error, setError] = useState<string | undefined>();

  const getLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(location);
    } catch (err : any) {
      setError(`Failed to get location: ${err.message}`);
    }
  }

  useEffect(() => {
    const initialize = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      getLocation();
    };

    initialize();
  }, []);

  return (
    <LocationContext.Provider value={{location: location, error: error}}>
      {children}
    </LocationContext.Provider>
  )
  
};

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
    if (!context) {
      throw new Error('useLocation must be used within a LocationProvider');
    }
  
    return context;
};
