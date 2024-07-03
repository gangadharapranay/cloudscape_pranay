import React from 'react';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <a href="#" className="theme-toggle" onClick={toggleTheme}>
      <i className={`fa-regular ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}`}></i>
    </a>
  );
};

export default ThemeToggle;
