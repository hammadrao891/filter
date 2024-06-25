


import { useState, useEffect } from 'react';

function useCustomHook(initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const newValue = value +1 ;
    setValue(newValue);
  }, []);

  return [value, setValue];
}

export default useCustomHook;