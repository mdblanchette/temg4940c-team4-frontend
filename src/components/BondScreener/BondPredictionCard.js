import {
  Typography,
  Box,
  Stack,
  TextField,
  CardContent,
  Card,
  CardHeader,
  MenuItem,
  Grid,
} from "@mui/material";

import { useState } from "react";

export default function BondPredictionCard() {
  const time_period = [
    "Today",
    "This Week",
    "This Month",
    "This Year",
    "2 Years",
    "5 Years",
    "10 Years",
  ];

  const [predictedRating, setPredictedRating] = useState(20.1);
  const [predictedSpreadChange, setPredictedSpreadChange] = useState(-520);
  const [confidenceLevel, setConfidenceLevel] = useState(79.3);
  const [predictedCorrelation, setPredictedCorrelation] = useState(15.7);

  return (
    <Card sx={{ bgcolor: "#F1F8FF" }}>
      <CardHeader
        action={
          <TextField
            select
            defaultValue={"Today"}
            size="small"
            variant="standard"
          >
            {time_period.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        }
        title="Bond Prediction"
      />

      <CardContent>
        <Stack spacing={4}>
          <Grid container>
            <Grid item xs={4}>
              <Stack spacing={1}>
                <Typography>Credit Rating Migration</Typography>
                <Typography
                  variant="h5"
                  sx={{ color: predictedRating > 0 ? "#0EA371" : "#DC4A41" }}
                >
                  {predictedRating > 0 ? "+" : ""}
                  {predictedRating}
                  {"%"}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack spacing={1}>
                <Typography>Spread Change</Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: predictedSpreadChange > 0 ? "#0EA371" : "#DC4A41",
                  }}
                >
                  {predictedSpreadChange > 0 ? "+" : ""}
                  {predictedSpreadChange}
                  {" bp"}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack spacing={1}>
                <Typography>Confidence Level</Typography>
                <Typography variant="h5">
                  {confidenceLevel > 0 ? "+" : ""}
                  {confidenceLevel}
                  {"%"}
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <Typography>
            {" "}
            Average credit rating and price correlation:{" "}
            <Typography component="span" fontWeight="bold">
              {predictedCorrelation}%
            </Typography>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
