import { Box, Container, Grid } from "@mui/material";
import { Layout as DashboardLayout } from "../layout/Layout";
import Map from "../components/MainPage/Map";
import WorldCredit from "../components/MainPage/WorldCredit";
import MacroeconomicIndicators from "../components/MainPage/MacroeconomicIndicators";
import { useState } from "react";
import TopBottomBonds from "../components/MainPage/TopBottomBonds";

const Page = () => {
  const [selectedCountry, setSelectedCountry] = useState("Global");
  const [selectedCountryCode, setSelectedCountryCode] = useState("Global");
  const [selectedCountryFlag, setSelectedCountryFlag] = useState("");

  const oecdCountries = [
    { flag: "🇦🇺", name: "Australia", code: "AUS" },
    { flag: "🇦🇹", name: "Austria", code: "AUT" },
    { flag: "🇧🇪", name: "Belgium", code: "BEL" },
    { flag: "🇨🇦", name: "Canada", code: "CAN" },
    { flag: "🇨🇷", name: "Costa Rica", code: "CRI" },
    { flag: "🇨🇱", name: "Chile", code: "CHL" },
    { flag: "🇨🇿", name: "Czechia", code: "CZE" },
    { flag: "🇩🇰", name: "Denmark", code: "DNK" },
    { flag: "🇪🇪", name: "Estonia", code: "EST" },
    { flag: "🇫🇮", name: "Finland", code: "FIN" },
    { flag: "🇫🇷", name: "France", code: "FRA" },
    { flag: "🇩🇪", name: "Germany", code: "DEU" },
    { flag: "🇬🇷", name: "Greece", code: "GRC" },
    { flag: "🇭🇺", name: "Hungary", code: "HUN" },
    { flag: "🇮🇸", name: "Iceland", code: "ISL" },
    { flag: "🇮🇪", name: "Ireland", code: "IRL" },
    { flag: "🇮🇱", name: "Israel", code: "ISR" },
    { flag: "🇮🇹", name: "Italy", code: "ITA" },
    { flag: "🇯🇵", name: "Japan", code: "JPN" },
    { flag: "🇰🇷", name: "Korea", code: "KOR" },
    { flag: "🇱🇻", name: "Latvia", code: "LVA" },
    { flag: "🇱🇹", name: "Lithuania", code: "LTU" },
    { flag: "🇱🇺", name: "Luxembourg", code: "LUX" },
    { flag: "🇲🇽", name: "Mexico", code: "MEX" },
    { flag: "🇳🇱", name: "Netherlands", code: "NLD" },
    { flag: "🇳🇿", name: "New Zealand", code: "NZL" },
    { flag: "🇳🇴", name: "Norway", code: "NOR" },
    { flag: "🇵🇱", name: "Poland", code: "POL" },
    { flag: "🇵🇹", name: "Portugal", code: "PRT" },
    { flag: "🇸🇰", name: "Slovakia", code: "SVK" },
    { flag: "🇸🇮", name: "Slovenia", code: "SVN" },
    { flag: "🇪🇸", name: "Spain", code: "ESP" },
    { flag: "🇸🇪", name: "Sweden", code: "SWE" },
    { flag: "🇨🇭", name: "Switzerland", code: "CHE" },
    { flag: "🇹🇷", name: "Turkey", code: "TUR" },
    { flag: "🇬🇧", name: "United Kingdom", code: "GBR" },
    { flag: "🇺🇸", name: "United States of America", code: "USA" },
  ];

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container
        maxWidth="xxl"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "80vh", // Set the container height to fill the screen
        }}
      >
        <Grid container spacing={1} sx={{ flexGrow: 1 }}>
          <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
            <Map
              oecdCountries={oecdCountries}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              setSelectedCountryCode={setSelectedCountryCode}
              setSelectedCountryFlag={setSelectedCountryFlag}
              sx={{ height: "100%" }} // Set the height of the Map component to fill the card
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
            <TopBottomBonds sx={{ height: "100%" }} />
          </Grid>
          <Grid item xs={12} sm={3} sx={{ flexGrow: 1 }}>
            <WorldCredit
              oecdCountries={oecdCountries}
              selectedCountry={selectedCountry}
              selectedCountryCode={selectedCountryCode}
              selectedCountryFlag={selectedCountryFlag}
              sx={{ height: "100%" }} // Set the height of the WorldCredit component to fill the card
            />
          </Grid>
          <Grid item xs={12} sm={9} sx={{ flexGrow: 1 }}>
            <MacroeconomicIndicators
              selectedCountry={selectedCountry}
              selectedCountryCode={selectedCountryCode}
              selectedCountryFlag={selectedCountryFlag}
              sx={{ height: "100%" }} // Set the height of the MacroeconomicIndicators component to fill the card
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
