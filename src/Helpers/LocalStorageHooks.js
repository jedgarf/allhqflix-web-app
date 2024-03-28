import { useState, useEffect } from 'react';

/**
 * Custom React hook for synchronizing a state with localStorage. It updates the value whenever
 * the specified localStorage key is updated from anywhere.
 *
 * @param key - The localStorage key to store and watch the value.
 * @param initialValue - Initial value to use if the key doesn't exist in localStorage.
 * @returns A tuple with the current value and a setter function to update it.
 */
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue instanceof Function ? initialValue() : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}": `, error);
      return initialValue instanceof Function ? initialValue() : initialValue;
    }
  });

  // Function to update localStorage and the state
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}": `, error);
    }
  };

  // Polling for changes in localStorage
  useEffect(() => {
    const intervalId = setInterval(() => {
      try {
        const item = window.localStorage.getItem(key);
        const currentValue = item ? JSON.parse(item) : initialValue;
        if (currentValue !== storedValue) {
          setStoredValue(currentValue);
        }
      } catch (error) {
        console.error(`Error polling localStorage key "${key}": `, error);
      }
    }, 1000); // Polling interval set to 1000 ms (1 second)

    return () => clearInterval(intervalId);
  }, [key, storedValue, initialValue]);

  return [storedValue, setValue];
}

export default useLocalStorage;