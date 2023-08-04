import { ThemeProvider } from "@emotion/react";
import createTheme from "./theme";
import Sidebar from "./components/Sidebar";

export default function App() {
  const theme = createTheme();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Sidebar />
      </ThemeProvider>
    </div>
  );
}
