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

export default function WorldMap() {
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
              <IconButton>
                <AddCircleIcon fontSize="medium" />
              </IconButton>
              <IconButton>
                <RemoveCircleIcon fontSize="medium" />
              </IconButton>
            </Box>
          </Stack>
          <Stack spacing={1} direction="row">
            <Box
              component="img"
              height={250}
              width="100%"
              src="https://img.freepik.com/premium-vector/world-map-silhouette-digital-simple-grey-map-flat-style-vector-realistic-illustration-earth-isolated-white-background_176516-1332.jpg?w=2000"
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
