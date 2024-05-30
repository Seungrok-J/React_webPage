import React, { createContext, useContext, useState, useEffect } from 'react';

// 컨텍스트 생성
const DarkModeContext = createContext();

// 프로바이더 컴포넌트
export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// 컨텍스트를 사용하는 훅
export const useDarkMode = () => useContext(DarkModeContext);
