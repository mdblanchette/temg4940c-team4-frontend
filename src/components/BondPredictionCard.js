import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  TextField,
  Autocomplete,
} from "@mui/material";

import { useState } from "react";

export default function BondPredictionCard() {
  const optionTime = [
    "Today",
    "Last 7 days",
    "Last 1 month",
    "Last 6 months",
    "Last 1 year",
    "Last 3 years",
  ];

  const [chosenTime, setChosenTime] = useState("Today");
  const [inputTime, setInputTime] = useState("");
  const [predictedRating, setPredictedRating] = useState(20.1);
  const [predictedSpreadChange, setPredictedSpreadChange] = useState(-520);
  const [confidenceLevel, setConfidenceLevel] = useState(79.3);
  const [predictedCorrelation, setPredictedCorrelation] = useState(15.7);

  return (
    <Box sx={{ bgcolor: "#F1F8FF", padding: 2, borderRadius: 1 }}>
      <Stack spacing={2}>
        {/* title of table */}
        <Stack direction="row">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bond Prediction
          </Typography>

          <Autocomplete
            id="time-option"
            size="small"
            value={chosenTime}
            onChange={(event, newTime) => {
              setChosenTime(newTime);
            }}
            inputValue={inputTime}
            onInputChange={(event, newInputTime) => {
              setInputTime(newInputTime);
            }}
            options={optionTime}
            sx={{
              width: 180,
            }}
            renderInput={(params) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <TextField size="small" variant="outlined" {...params} />
              </Box>
            )}
          />
        </Stack>

        <Stack direction="row" spacing="auto">
          <Box width="33%">
            <Stack spacing={1}>
              <Typography variant="body2">Credit Rating Migration</Typography>
              <Typography
                sx={{ color: predictedRating > 0 ? "#0EA371" : "#DC4A41" }}
              >
                {predictedRating > 0 ? "+" : ""}
                {predictedRating}
                {"%"}
              </Typography>
            </Stack>
          </Box>

          <Box width="33%">
            <Stack spacing={1}>
              <Typography variant="body2">Spread Change</Typography>
              <Typography
                sx={{
                  color: predictedSpreadChange > 0 ? "#0EA371" : "#DC4A41",
                }}
              >
                {predictedSpreadChange > 0 ? "+" : ""}
                {predictedSpreadChange}
                {" bp"}
              </Typography>
            </Stack>
          </Box>

          <Box width="33%">
            <Stack spacing={1}>
              <Typography variant="body2">Confidence Level</Typography>
              <Typography>
                {confidenceLevel > 0 ? "+" : ""}
                {confidenceLevel}
                {"%"}
              </Typography>
            </Stack>
          </Box>
        </Stack>

        <Typography>
          {" "}
          Average credit rating and price correlation:{" "}
          <Typography component="span" fontWeight="bold">
            {predictedCorrelation}%
          </Typography>
        </Typography>
      </Stack>
    </Box>
  );
}
