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

import { useState, useEffect } from "react";
// import { LineChart } from "@mui/x-charts";

export default function BondTrendCard({
  indicatorA,
  indicatorB,
  dataA,
  dataB,
}) {
  //const chartOptions = useChartOptions();
  const chartOptions = {
    //const theme = useTheme();
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
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
    colors: ["#FF1654", "#247BA0"],
    // yaxis: {
    //   labels: {
    //     formatter: (value) => `${value} ${unit}`,
    //     offsetX: -10,
    //   },
    // },
    //   labels: {
    //     formatter: function (val) {
    //       return (val / 1000000).toFixed(0);
    //     },
    //   },
    //   title: {
    //     text: 'Value'
    //   },
    // },
    // xaxis: {
    //   categories: [
    //     "Jan",
    //     "Feb",
    //     "Mar",
    //     "Apr",
    //     "May",
    //     "Jun",
    //     "Jul",
    //     "Aug",
    //     "Sep",
    //     "Oct",
    //     "Nov",
    //     "Dec",
    //   ],
    //   labels: {
    //     offsetY: 5,
    //     style: {
    //       colors: theme.palette.text.secondary,
    //     },
    //   },
    // },
    series: indicatorB
      ? [
          {
            name: "A: " + indicatorA,
            data: dataA,
          },
          {
            name: "B: " + indicatorB,
            data: dataB,
          },
        ]
      : [
          {
            name: indicatorA,
            data: dataA,
          },
        ],
    stroke: {
      width: [3, 3],
    },
    xaxis: {
      categories: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
    },
    yaxis: indicatorB
      ? [
          {
            seriesName: indicatorA,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: "#FF1654",
            },
            labels: {
              style: {
                colors: "#FF1654",
              },
              formatter: function (val) {
                if (val) return val.toFixed(0);
                else return;
              },
            },
          },
          {
            seriesName: indicatorB,
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: "#247BA0",
            },
            labels: {
              style: {
                colors: "#247BA0",
              },
              formatter: function (val) {
                if (val) return val.toFixed(0);
                else return;
              },
            },
          },
        ]
      : [
          {
            seriesName: indicatorA,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: "#FF1654",
            },
            labels: {
              style: {
                colors: "#FF1654",
              },
              formatter: function (val) {
                if (val) return val.toFixed(0);
                else return;
              },
            },
          },
        ],
    tooltip: {
      enabled: true,
      followCursor: true,
      // fixed: {
      //   enabled: true,
      //   position: "topCenter",
      //   offsetX: 0,
      //   offsetY: -80,
      // },
    },
    legend: {
      horizontalAlign: "left",
      offsetX: 40,
    },
  };

  const time_period = [
    "Last 1 year",
    "Last 2 years",
    "Last 5 years",
    "Last 10 years",
  ];

  return (
    <Card>
      <CardHeader
        action={
          <TextField
            select
            defaultValue={"Last 10 years"}
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
          {/* <Stack spacing={1}>
            <Typography>Average Credit Spread History</Typography>

            <Chart
              height={350}
              series={creditSpread}
              options={useChartOptions("%")}
              type="area"
              width="100%"
            />
          </Stack> */}

          <Stack spacing={1}>
            {indicatorB ? (
              <Typography>
                {indicatorA}
                {" vs "}
                {indicatorB}
              </Typography>
            ) : (
              <Typography>{indicatorA}</Typography>
            )}
            <Chart
              height={350}
              //options={useChartOptions("bp")}
              //options={useChartOptions("Price", bondPrice)}
              //options={ indicatorB ? <useChartOptions indicatorA={indicatorA} indicatorB={indicatorB} dataA={dataA} dataB={dataB}/> : <useChartOptions indicatorA={indicatorA} dataA={dataA}/>}
              options={chartOptions}
              series={chartOptions.series}
              type="area"
              width="100%"
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
