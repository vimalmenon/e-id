import { AppContextWrapper } from "../components";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";

import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {},
});
import createCache from "@emotion/cache";

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
const createEmotionCache = () => {
  return createCache({ key: "css", prepend: true });
};

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContextWrapper>
          <Component {...pageProps} />
        </AppContextWrapper>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
