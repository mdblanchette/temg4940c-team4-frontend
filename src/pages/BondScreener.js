import { ThemeProvider } from "@emotion/react";
import createTheme from "../theme";
import { Skeleton, Stack } from "@mui/material";

import MultiResultCard from "../components/MultiResultCard";

export default function BondScreenerPage() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2}>
        {/* topbar */}
        <Skeleton variant="rectangular" height={40} width="100vw" />

        <Stack spacing={2} direction="row">
          {/* sidebar */}
          <Skeleton variant="rectangular" height="100vw" width="20%" />
          <MultiResultCard />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
