import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  TextField,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { useState } from "react";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const mapWidth = 800;
const mapHeight = 400;

export default function Map() {
  const [position, setPosition] = useState({ center: [0, 20], zoom: 1 });
  const oecdCountries = [
    { name: "🇦🇺 Australia", code: "AUS" },
    { name: "🇦🇹 Austria", code: "AUT" },
    { name: "🇧🇪 Belgium", code: "BEL" },
    { name: "🇨🇦 Canada", code: "CAN" },
    { name: "🇨🇱 Chile", code: "CHL" },
    { name: "🇨🇿 Czech Republic", code: "CZE" },
    { name: "🇩🇰 Denmark", code: "DNK" },
    { name: "🇪🇪 Estonia", code: "EST" },
    { name: "🇫🇮 Finland", code: "FIN" },
    { name: "🇫🇷 France", code: "FRA" },
    { name: "🇩🇪 Germany", code: "DEU" },
    { name: "🇬🇷 Greece", code: "GRC" },
    { name: "🇭🇺 Hungary", code: "HUN" },
    { name: "🇮🇸 Iceland", code: "ISL" },
    { name: "🇮🇪 Ireland", code: "IRL" },
    { name: "🇮🇱 Israel", code: "ISR" },
    { name: "🇮🇹 Italy", code: "ITA" },
    { name: "🇯🇵 Japan", code: "JPN" },
    { name: "🇰🇷 Korea", code: "KOR" },
    { name: "🇱🇻 Latvia", code: "LVA" },
    { name: "🇱🇹 Lithuania", code: "LTU" },
    { name: "🇱🇺 Luxembourg", code: "LUX" },
    { name: "🇲🇽 Mexico", code: "MEX" },
    { name: "🇳🇱 Netherlands", code: "NLD" },
    { name: "🇳🇿 New Zealand", code: "NZL" },
    { name: "🇳🇴 Norway", code: "NOR" },
    { name: "🇵🇱 Poland", code: "POL" },
    { name: "🇵🇹 Portugal", code: "PRT" },
    { name: "🇸🇰 Slovak Republic", code: "SVK" },
    { name: "🇸🇮 Slovenia", code: "SVN" },
    { name: "🇪🇸 Spain", code: "ESP" },
    { name: "🇸🇪 Sweden", code: "SWE" },
    { name: "🇨🇭 Switzerland", code: "CHE" },
    { name: "🇹🇷 Turkey", code: "TUR" },
    { name: "🇬🇧 United Kingdom", code: "GBR" },
    { name: "🇺🇸 United States", code: "USA" },
  ];

  function handleZoomIn() {
    if (position.zoom >= 4) setPosition((pos) => ({ ...pos, zoom: 4 }));
    else setPosition((pos) => ({ ...pos, zoom: pos.zoom + 1 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) setPosition((pos) => ({ ...pos, zoom: 1 }));
    else setPosition((pos) => ({ ...pos, zoom: pos.zoom - 1 }));
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
                          default: { fill: "#6466f1" },
                          hover: { fill: "#04D" },
                          pressed: { fill: "#none" },
                          outline: "none",
                        }}
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
                      startAdornment: (
                        <InputAdornment position="start">
                          <MagnifyingGlassIcon />
                        </InputAdornment>
                      ),
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
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
