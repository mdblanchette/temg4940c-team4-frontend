import { Box, Container, Grid } from "@mui/material";
import { Layout as DashboardLayout } from "../layout/Layout";
import Map from "../components/MainPage/Map";
import WorldCredit from "../components/MainPage/WorldCredit";
import MacroeconomicIndicators from "../components/MainPage/MacroeconomicIndicators";
import BondInfoColumn from "../components/BondScreener/BondInfoColumn";
import { useState } from "react";
import BondInfoTable from "../components/BondScreener/BondInfoTable";

const Page = () => {
  const [selectedCountry, setSelectedCountry] = useState("Global");
  var country = "Global";
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Map
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <WorldCredit selectedCountry={selectedCountry} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <MacroeconomicIndicators />
          </Grid>
          <Grid item xs={12} sm={4}>
            <WorldCredit selectedCountry={selectedCountry} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <BondInfoTable />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
