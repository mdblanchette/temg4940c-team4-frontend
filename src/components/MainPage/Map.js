import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { useEffect, useState } from "react";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const mapWidth = 800;
const mapHeight = 400;

export default function Map({
  oecdCountries,
  setSelectedCountry,
  setSelectedCountryCode,
  setSelectedCountryFlag,
}) {
  const [position, setPosition] = useState({ center: [0, 20], zoom: 1 });
  const [inputValue, setInputValue] = useState("");
  const [countryCreditMigration, setCountryCreditMigration] = useState([
    { code: "AUS", predictedMigration: 0 },
    { code: "AUT", predictedMigration: 0 },
    { code: "BEL", predictedMigration: 0 },
    { code: "CAN", predictedMigration: 0 },
    { code: "CRI", predictedMigration: 0 },
    { code: "CHL", predictedMigration: 0 },
    { code: "CZE", predictedMigration: 0 },
    { code: "DNK", predictedMigration: 0 },
    { code: "EST", predictedMigration: 0 },
    { code: "FIN", predictedMigration: 0 },
    { code: "FRA", predictedMigration: 0 },
    { code: "DEU", predictedMigration: 0 },
    { code: "GRC", predictedMigration: 0 },
    { code: "HUN", predictedMigration: 0 },
    { code: "ISL", predictedMigration: 0 },
    { code: "IRL", predictedMigration: 0 },
    { code: "ISR", predictedMigration: 0 },
    { code: "ITA", predictedMigration: 0 },
    { code: "JPN", predictedMigration: 0 },
    { code: "KOR", predictedMigration: 0 },
    { code: "LVA", predictedMigration: 0 },
    { code: "LTU", predictedMigration: 0 },
    { code: "LUX", predictedMigration: 0 },
    { code: "MEX", predictedMigration: 0 },
    { code: "NLD", predictedMigration: 0 },
    { code: "NZL", predictedMigration: 0 },
    { code: "NOR", predictedMigration: 0 },
    { code: "POL", predictedMigration: 0 },
    { code: "PRT", predictedMigration: 0 },
    { code: "SVK", predictedMigration: 0 },
    { code: "SVN", predictedMigration: 0 },
    { code: "ESP", predictedMigration: 0 },
    { code: "SWE", predictedMigration: 0 },
    { code: "CHE", predictedMigration: 0 },
    { code: "TUR", predictedMigration: 0 },
    { code: "GBR", predictedMigration: 0 },
    { code: "USA", predictedMigration: 0 },
  ]);

  function handleZoomIn() {
    if (position.zoom >= 4) setPosition((pos) => ({ ...pos, zoom: 4 }));
    else setPosition((pos) => ({ ...pos, zoom: pos.zoom + 1 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) setPosition((pos) => ({ ...pos, zoom: 1 }));
    else setPosition((pos) => ({ ...pos, zoom: pos.zoom - 1 }));
  }

  function resetZoom() {
    setPosition((pos) => ({ ...pos, zoom: 1 }));
  }

  function isOECD(countryName) {
    return oecdCountries.some((c) => c.name === countryName);
  }

  function renderCountry(countryName) {
    // If country is an OECD country, setSelectedCountry to country name
    if (isOECD(countryName)) {
      const oecdCountry = oecdCountries.find((c) => c.name === countryName);
      setSelectedCountryCode(oecdCountry.code);
      setSelectedCountry(oecdCountry.name);
      setSelectedCountryFlag(oecdCountry.flag);
      setInputValue(oecdCountry.flag + " " + countryName);
      const countryDetails = {
        code: oecdCountry.code,
        name: oecdCountry.name,
        flag: oecdCountry.flag,
        inputValue: oecdCountry.flag + " " + countryName,
      };
      localStorage.setItem("selectedCountry", JSON.stringify(countryDetails));
    } else if (countryName === "Global") {
      setSelectedCountry("Global");
      setSelectedCountryCode("Global");
      setSelectedCountryFlag("");
      setInputValue("");

      localStorage.removeItem("selectedCountry");
    }
  }

  async function getPredictionData(countryCode) {
    const fetch_link =
      "http://35.220.165.226/api/prediction/creditMigration2024/country/" +
      countryCode;
    const res = await fetch(fetch_link);
    const parsed_res = await res.json();
    return parsed_res;
  }

  function colorCodeCountry(country) {
    // Convert the country name to its corresponding country code
    const countryDetails = oecdCountries.find((c) => c.name === country);
    const countryCode = countryDetails.code;

    const predictionData = countryCreditMigration.find(
      (c) => c.code === countryCode
    );
    let migration = predictionData.predictedMigration;
    if (migration === "N/A") return "#D6D6DA";
    migration = parseFloat(migration);
    if (migration >= 2) return "#009444";
    else if (migration >= 1) return "#8dc740";
    else if (migration >= 0) return "#ffde18";
    else if (migration >= -1) return "#f46522";
    else return "#ed1c25";
  }

  const updateCountryCreditMigration = async () => {
    const countryCreditMigrationCopy = [...countryCreditMigration];
    for (let i = 0; i < countryCreditMigrationCopy.length; i++) {
      const country = countryCreditMigrationCopy[i];
      const predictionData = await getPredictionData(country.code);
      let migration = predictionData["Yearly Average Credit Migration"];
      if (migration === "N/A") migration = "N/A";
      else migration = parseFloat(migration);
      countryCreditMigrationCopy[i].predictedMigration = migration;
    }
    setCountryCreditMigration(countryCreditMigrationCopy);
  };

  useEffect(() => {
    // Retrieve the stored country details from localStorage
    const storedCountry = localStorage.getItem("selectedCountry");
    if (storedCountry) {
      const countryDetails = JSON.parse(storedCountry);
      setSelectedCountryCode(countryDetails.code);
      setSelectedCountry(countryDetails.name);
      setSelectedCountryFlag(countryDetails.flag);
      setInputValue(countryDetails.inputValue);
    }

    updateCountryCreditMigration();
  }, [setSelectedCountryCode, setSelectedCountry, setSelectedCountryFlag]);

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box position="relative">
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={0}
          >
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 100 }}
              height={mapHeight}
              width={mapWidth}
            >
              <ZoomableGroup
                zoom={position.zoom}
                minZoom={1}
                maxZoom={4}
                center={position.center}
                translateExtent={[
                  [0, -60],
                  [mapWidth, mapHeight],
                ]}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        stroke="#000000"
                        style={{
                          default: {
                            fill: isOECD(geo.properties.name)
                              ? colorCodeCountry(geo.properties.name)
                              : "#D6D6DA",
                          },
                          hover: {
                            fill: isOECD(geo.properties.name)
                              ? "#5999ff"
                              : "#D6D6DA",
                          },
                        }}
                        onClick={() => renderCountry(geo.properties.name)}
                      />
                    ))
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          </Box>
          <Box
            position="absolute"
            top={0}
            left={0}
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            sx={{ padding: "0 10px" }}
          >
            <Autocomplete
              options={oecdCountries}
              getOptionLabel={(option) => option.name}
              autoHighlight
              onChange={(e, option) => {
                if (option) renderCountry(option.name);
              }}
              onInputChange={(e, newInputValue) => {
                // Update the input value as the user types
                setInputValue(newInputValue);
              }}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ fontSize: 14, "& > span": { mr: 1 } }}
                  {...props}
                >
                  <span>{option.flag}</span>
                  {option.name} ({option.code})
                </Box>
              )}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    defaultValue=""
                    variant="filled"
                    label="Search country"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                      value: inputValue,
                    }}
                    sx={{
                      width: 200,
                      backgroundColor: "#ffffff",
                    }}
                  />
                );
              }}
            />
          </Box>
          <Box
            position="absolute"
            top={0}
            right={0}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ width: "40%", padding: "0 10px" }}
          >
            <IconButton onClick={handleZoomIn}>
              <AddCircleIcon fontSize="medium" sx={{ color: "#6466f1" }} />
            </IconButton>
            <IconButton onClick={handleZoomOut}>
              <RemoveCircleIcon fontSize="medium" sx={{ color: "#6466f1" }} />
            </IconButton>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                renderCountry("Global");
                resetZoom();
              }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
