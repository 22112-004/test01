import React from 'react';

interface ThemeSelectorProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ theme, setTheme }) => {
  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="bg-white text-indigo-600 font-bold py-2 px-4 rounded-full shadow-lg hover:bg-indigo-100 transition duration-300"
    >
      <option value="fruits">Fruits</option>
      <option value="animals">Animals</option>
      <option value="landmarks">Landmarks</option>
    </select>
  );
};

export default ThemeSelector;