
import { useEffect, useState } from "react";

export function useDelay() {
  const [state, setState] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setState(false), 100);
    return () => clearTimeout(timeout);
  }, []);

  return state;
}

import { useMantineColorScheme } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";

export function useSafeColorScheme(): "light" | "dark" {
  const { colorScheme } = useMantineColorScheme();
  const systemColorScheme = useColorScheme(undefined, {
    getInitialValueInEffect: false,
  });

  if (colorScheme === "auto") return systemColorScheme;
  return colorScheme;
}

import { useNavigate } from "react-router-dom";

export function useSafeGoBack() {
  const navigate = useNavigate();

  return () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };
}


export function useThemed(options: { light: any; dark: any }) {
  const colorScheme = useSafeColorScheme();
  return options[colorScheme];
}

