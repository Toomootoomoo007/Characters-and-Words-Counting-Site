"use client";

import React, { useEffect, useState } from "react";

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const userTheme = localStorage.getItem("theme");
    const osPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (userTheme === "dark" || (!userTheme && osPrefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? "ライトモードへ" : "ダークモードへ"}
    </button>
  );
};

export default DarkMode;
