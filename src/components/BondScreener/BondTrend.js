import {
  Typography,
  Box,
  Stack,
  Autocomplete,
  TextField,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
} from "@mui/material";
import { Chart } from "../MainPage/chart";
import { alpha, useTheme } from "@mui/material/styles";

import { useState } from "react";
// import { LineChart } from "@mui/x-charts";

function useChartOptions(unit) {
  const theme = useTheme();

  return {
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value} ${unit}`,
        offsetX: -10,
      },
    },
    //   labels: {
    //     formatter: function (val) {
    //       return (val / 1000000).toFixed(0);
    //     },
    //   },
    //   title: {
    //     text: 'Value'
    //   },
    // },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  };
}

export default function BondTrendCard() {
  //const chartOptions = useChartOptions();

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
    {
      name: "Credit Spread",
      data: [0.5, 0.9, 0.6, 0.6, 0.8, 0.8, 1.1, 0.8, 0.8, 0.5, 0.5, 0.5],
    },
  ];

  const bondPrice = [
    {
      name: "Bond Price",
      data: [
        101.5, 100.25, 101.48, 101.48, 99.5, 99.5, 97.75, 98.25, 98.25, 100.0,
        100.0, 100.0,
      ],
    },
  ];

  const time_period = [
    "Today",
    "This Week",
    "This Month",
    "This Year",
    "2 Years",
    "5 Years",
    "10 Years",
  ];

  return (
    <Card>
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
        title="Bond Trend"
      />

      <CardContent>
        <Stack spacing={4}>
          <Stack spacing={1}>
            <Typography>Average Credit Spread History</Typography>

            <Chart
              height={350}
              series={creditSpread}
              options={useChartOptions("%")}
              type="area"
              width="100%"
            />
          </Stack>

          <Stack spacing={1}>
            <Typography>Average Price History</Typography>

            <Chart
              height={350}
              series={bondPrice}
              options={useChartOptions("bp")}
              //options={useChartOptions("Price", bondPrice)}
              type="area"
              width="100%"
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
