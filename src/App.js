import { ThemeProvider } from "@emotion/react";
import CardTemplate from "./components/CardTemplate";
import createTheme from "./theme";

export default function App() {
  const theme = createTheme();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CardTemplate />
      </ThemeProvider>
    </div>
  );
}
