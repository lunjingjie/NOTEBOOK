import React, { useEffect, useState } from 'react';

export const Permission = React.createContext([]);

export default function Index() {
  const [rootPermission, setRootPermission] = useState([]);
  useEffect(() => {
    setRootPermission(['tag', 'article']);
  }, []);
  return <Permission.Provider value={rootPermission}>
    
  </Permission.Provider>
}
