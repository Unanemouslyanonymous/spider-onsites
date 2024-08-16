"use client";
import React, { useEffect } from "react";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";

interface ThemeState {
  theme: string;
}

const initialState: ThemeState = {
  theme: typeof window !== "undefined" ? localStorage.getItem("theme") || "light" : "light",
};


const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.theme);
        document.documentElement.classList.remove(state.theme === "light" ? "dark" : "light");
        document.documentElement.classList.add(state.theme);
      }
    },
    setTheme(state, action) {
      state.theme = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.theme);
        document.documentElement.classList.remove(state.theme === "light" ? "dark" : "light");
        document.documentElement.classList.add(state.theme);
      }
    },
  },
});

const { toggleTheme, setTheme } = themeSlice.actions;


const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
  },
});


const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme.theme);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      dispatch(setTheme(storedTheme));
    }
  }, [dispatch]);

  return { theme, toggleTheme: handleToggleTheme };
};


const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export { ThemeProvider, useTheme };
