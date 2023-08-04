import { Box, Container, Grid } from "@mui/material";
import React from "react";
import WorldMap from "./MainPage/WorldMap";
import WorldCredit from "./MainPage/WorldCredit";
import MacroeconomicIndicators from "./MainPage/MacroeconomicIndicators";
import BondTable from "./MainPage/BondTable";

export default function MainPage() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <WorldMap />
          </Grid>
          <Grid item xs={12} sm={6}>
            <WorldCredit />
          </Grid>
          <Grid item xs={12} sm={12}>
            <MacroeconomicIndicators />
          </Grid>
          <Grid item xs={12} sm={12}>
            <BondTable />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
