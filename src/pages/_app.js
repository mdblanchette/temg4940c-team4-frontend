import { ThemeProvider } from "@emotion/react";
import createTheme from "../theme";

export default function App({ Component, pageProps }) {
  const theme = createTheme();
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </div>
  );
}
