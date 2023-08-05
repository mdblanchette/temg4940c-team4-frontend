import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { Layout as DashboardLayout } from "../layout/Layout";
import WorldMap from "../components/MainPage/WorldMap";
import WorldCredit from "../components/MainPage/WorldCredit";
import MacroeconomicIndicators from "../components/MainPage/MacroeconomicIndicators";
import BondInfoColumn from "../components/BondScreener/BondInfoColumn";

const Page = () => {
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
            <BondInfoColumn />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
