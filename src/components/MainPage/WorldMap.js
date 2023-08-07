import {
  Box,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
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

export default function WorldMap() {
  const geoUrl =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  }
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack
          alignItems="center"
          direction="column"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack
            spacing={1}
            direction="row"
            justifyContent="space-between"
            sx={{ width: "100%", padding: "0 10px" }}
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
              sx={{ maxWidth: 500 }}
            />
            <Box>
              <IconButton onClick={handleZoomIn}>
                <AddCircleIcon fontSize="medium" />
              </IconButton>
              <IconButton onClick={handleZoomOut}>
                <RemoveCircleIcon fontSize="medium" />
              </IconButton>
            </Box>
          </Stack>
          <Stack spacing={1} direction="row">
            <Box>
              <ComposableMap projection="geoMercator">
                <ZoomableGroup
                  zoom={position.zoom}
                  center={position.coordinates}
                >
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="red"
                        />
                      ))
                    }
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
