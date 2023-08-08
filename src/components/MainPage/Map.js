import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
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
  function handleZoomIn() {
    if (position.zoom >= 4) setPosition((pos) => ({ ...pos, zoom: 4 }));
    else setPosition((pos) => ({ ...pos, zoom: pos.zoom + 1 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) setPosition((pos) => ({ ...pos, zoom: 1 }));
    else setPosition((pos) => ({ ...pos, zoom: pos.zoom - 1 }));
  }

  function handleReset() {
    setPosition({ center: [0, 20], zoom: 1 });
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
            sx={{ width: "40%", padding: "0 10px" }}
          >
            <OutlinedInput
              defaultValue=""
              placeholder="Search country"
              size="small"
              startAdornment={
                <InputAdornment position="start">
                  <SvgIcon color="action" fontSize="small">
                    <MagnifyingGlassIcon />
                  </SvgIcon>
                </InputAdornment>
              }
              sx={{
                maxWidth: 300,
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "white",
                },
                "&:focus": {
                  backgroundColor: "white",
                },
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
            <IconButton>
              <AddCircleIcon
                fontSize="medium"
                sx={{ color: "#6466f1" }}
                onClick={handleZoomIn}
              />
            </IconButton>
            <IconButton>
              <RemoveCircleIcon
                fontSize="medium"
                sx={{ color: "#6466f1" }}
                onClick={handleZoomOut}
              />
            </IconButton>
            <Button variant="contained" size="small" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
