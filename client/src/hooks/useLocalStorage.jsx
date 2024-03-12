import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    // Retrieve item from localStorage by key
    try {
      const item = window.localStorage.getItem(key);
      // Parse stored json or return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If parsing fails, return initialValue
      console.warn(`Error retrieving item from localStorage: ${key}`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState internal setter
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(newValue);
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      // Print error if storage fails
      console.warn(`Error saving to localStorage: ${key}`, error);
    }
  };
  useEffect(()=>{
    console.log('this component was called',storedValue)
  })

  useEffect(() => {
    // This runs whenever storedValue changes
    // Setting up a "cleanup" function to prevent memory leaks
    const handleStorageChange = () => {
      const newStorageValue = window.localStorage.getItem(key);
      if (newStorageValue) setStoredValue(JSON.parse(newStorageValue));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
};

export default useLocalStorage;
