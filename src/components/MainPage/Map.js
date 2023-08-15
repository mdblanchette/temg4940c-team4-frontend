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
import { useState } from "react";
import { sl } from "date-fns/locale";
import { set } from "date-fns";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const mapWidth = 800;
const mapHeight = 400;

export default function Map({
  oecdCountries,
  selectedCountry,
  selectedCountryCode,
  setSelectedCountry,
  setSelectedCountryCode,
  setSelectedCountryFlag,
}) {
  const [position, setPosition] = useState({ center: [0, 20], zoom: 1 });
  const [inputValue, setInputValue] = useState("");

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
    } else if (countryName === "Global") {
      setSelectedCountry("Global");
      setSelectedCountryCode("Global");
      setSelectedCountryFlag("");
      setInputValue("");
    }
  }

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
                            fill:
                              selectedCountry === geo.properties.name
                                ? "#04D"
                                : "#D6D6DA",
                          },
                          hover: {
                            fill: isOECD(geo.properties.name)
                              ? "#04D"
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
