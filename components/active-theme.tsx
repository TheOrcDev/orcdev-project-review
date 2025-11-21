"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { Theme } from "@/lib/themes";

const COOKIE_NAME = "active_theme";
const DEFAULT_THEME = Theme.Default;

function getThemeCookie(): Theme | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const trimmed = cookie.trim();
      if (!trimmed) continue;

      const equalIndex = trimmed.indexOf("=");
      if (equalIndex === -1) continue;

      const name = trimmed.slice(0, equalIndex).trim();
      const value = trimmed.slice(equalIndex + 1).trim();

      // Validate that the value is a valid Theme
      if (
        name === COOKIE_NAME &&
        value &&
        Object.values(Theme).includes(value as Theme)
      ) {
        return value as Theme;
      }
    }
  } catch (error) {
    console.error("Error reading theme cookie:", error);
  }
  return null;
}

function setThemeCookie(theme: Theme) {
  if (typeof window === "undefined") {
    return;
  }

  // biome-ignore lint/suspicious/noAssignInExpressions: Setting cookie requires direct assignment
  document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=31536000; SameSite=Lax; ${
    window.location.protocol === "https:" ? "Secure;" : ""
  }`;
}

type ThemeContextType = {
  activeTheme: Theme;
  setActiveTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ActiveThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme?: Theme;
}) {
  const [activeTheme, setActiveTheme] = useState<Theme>(() => {
    // First priority: initialTheme prop (from server-side cookie reading)
    if (initialTheme) {
      return initialTheme;
    }

    // Second priority: read from cookie on client-side initialization
    if (typeof window !== "undefined") {
      const cookieTheme = getThemeCookie();
      if (cookieTheme) {
        return cookieTheme;
      }
    }

    // Fallback to default
    return DEFAULT_THEME;
  });

  const isInitialMount = useRef(true);
  const hasInitialized = useRef(false);

  // On initial mount, sync with cookie - cookie takes priority
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const cookieTheme = getThemeCookie();

    if (cookieTheme) {
      // Cookie exists - use it (even if it differs from initial state)
      if (cookieTheme !== activeTheme) {
        setActiveTheme(cookieTheme);
      }
    } else {
      // No cookie exists - save current theme to cookie
      setThemeCookie(activeTheme);
    }

    isInitialMount.current = false;
  }, []); // Only run on mount

  // Save cookie and apply theme whenever activeTheme changes
  useEffect(() => {
    const targets = [document.body, document.documentElement];

    // Only save cookie after initial mount (to avoid overwriting on first render)
    if (!isInitialMount.current) {
      setThemeCookie(activeTheme);
    }

    // Apply theme classes
    for (const el of targets) {
      const themeClasses = Array.from(el.classList).filter((className) =>
        className.startsWith("theme-")
      );
      for (const className of themeClasses) {
        el.classList.remove(className);
      }
      el.classList.add(`theme-${activeTheme}`);
    }
  }, [activeTheme]);

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeConfig() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useThemeConfig must be used within an ActiveThemeProvider"
    );
  }
  return context;
}
