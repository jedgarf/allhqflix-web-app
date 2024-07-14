import React, { Fragment, useEffect } from 'react';
import axios from 'axios';

// config
import { allowed_countries } from '../Config/settings.config';

const CountryFilter = ({ children }) => {
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get('http://ip-api.com/json');
        const { country } = response.data;
        // Philippines
        if (!allowed_countries.includes(country)) {
          // Redirect the user to a different page or show an error message
          window.location.href = '/not-available';
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };
    if (allowed_countries.length > 0) fetchLocation();
  }, []);

  return <Fragment>{children}</Fragment>;
};

export default CountryFilter;
