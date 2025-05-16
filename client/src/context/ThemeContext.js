"use client"

import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export const useThemeContext = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false)

  // Check for saved theme preference or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")

    if (savedTheme === "dark") {
      setDarkMode(true)
    } else if (savedTheme === "light") {
      setDarkMode(false)
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setDarkMode(prefersDark)
    }
  }, [])

  // Update body class and localStorage when theme changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode")
      localStorage.setItem("theme", "dark")
    } else {
      document.body.classList.remove("dark-mode")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  // Toggle theme
  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return <ThemeContext.Provider value={{ darkMode, toggleTheme }}>{children}</ThemeContext.Provider>
}
