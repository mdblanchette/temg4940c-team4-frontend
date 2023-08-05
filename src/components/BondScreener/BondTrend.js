import { Typography, Box, Stack, Autocomplete, TextField } from "@mui/material";

import { useState } from "react";
import { LineChart } from "@mui/x-charts";

export default function BondTrendCard() {
  const [chosenTimeRatingSpread, setChosenTimeRatingSpread] = useState("Today");
  const [inputTimeRatingSpread, setInputTimeRatingSpread] = useState("");
  const [chosenTimeRatingPrice, setChosenTimeRatingPrice] = useState("Today");
  const [inputTimeRatingPrice, setInputTimeRatingPrice] = useState("");
  const [averageRating, setAverageRating] = useState("BBB");
  const [averageSpread, setAverageSpread] = useState(7.6);
  const [averagePrice, setAveragePrice] = useState(79.3);

  // dummy list of values
  const bondCreditRating = [
    "AAA",
    "AA+",
    "AAA",
    "AAA",
    "AA+",
    "AA+",
    "AA",
    "AA+",
    "AA+",
    "AAA",
    "AAA",
    "AAA",
  ];
  const creditSpread = [
    0.5, 0.9, 0.6, 0.6, 0.8, 0.8, 1.1, 0.8, 0.8, 0.5, 0.5, 0.5,
  ];
  const bondPrice = [
    101.5, 100.25, 101.48, 101.48, 99.5, 99.5, 97.75, 98.25, 98.25, 100.0,
    100.0, 100.0,
  ];

  function GraphSection({ title, summaryValue, dataValue }) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Stack spacing={1}>
          <LineChart
            xAxis={[
              {
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
              },
            ]}
            series={[
              {
                data: dataValue,
              },
            ]}
            width={800}
            height={400}
          />
          <Typography textAlign="center">
            {title}
            {" of "}
            <Typography component="span" fontWeight="bold">
              {summaryValue}
            </Typography>
          </Typography>
        </Stack>
      </Box>
    );
  }

  function TimeSetting({
    timeValue,
    functionHandleValue,
    timeInput,
    functionHandleInput,
  }) {
    const optionTime = [
      "Today",
      "Last 7 days",
      "Last 1 month",
      "Last 6 months",
      "Last 1 year",
      "Last 3 years",
    ];

    return (
      <Autocomplete
        id="time-option"
        size="small"
        value={timeValue}
        onChange={(event, newTime) => {
          functionHandleValue(newTime);
        }}
        inputValue={timeInput}
        onInputChange={(event, newInputTime) => {
          functionHandleInput(newInputTime);
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
    );
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h6"> Bond Trend </Typography>

      {/* <Stack spacing={1}>
            <Typography variant="body2">
              Average Credit Rating History
            </Typography>
            <GraphSection
              title="Average rating"
              summaryValue={averageRating}
              dataValue={bondCreditRating}
            />
          </Stack> */}

      <Stack spacing={1}>
        <Stack direction="row" spacing="auto" sx={{ alignItems: "center" }}>
          <Typography variant="body1">Average Credit Spread History</Typography>
          <TimeSetting
            timeValue={chosenTimeRatingSpread}
            functionHandleValue={(newValue) =>
              setChosenTimeRatingSpread(newValue)
            }
            timeInput={inputTimeRatingSpread}
            functionHandleInput={(newInput) =>
              setInputTimeRatingSpread(newInput)
            }
          />
        </Stack>
        <GraphSection
          title="Average spread"
          summaryValue={averageSpread}
          dataValue={creditSpread}
        />
      </Stack>

      <Stack spacing={1}>
        <Stack direction="row" spacing="auto" sx={{ alignItems: "center" }}>
          <Typography variant="body1">Average Price History</Typography>
          <TimeSetting
            timeValue={chosenTimeRatingPrice}
            functionHandleValue={(newValue) =>
              setChosenTimeRatingPrice(newValue)
            }
            timeInput={inputTimeRatingPrice}
            functionHandleInput={(newInput) =>
              setInputTimeRatingPrice(newInput)
            }
          />
        </Stack>
        <GraphSection
          title="Average price"
          summaryValue={averagePrice}
          dataValue={bondPrice}
        />
      </Stack>
    </Stack>
  );
}
