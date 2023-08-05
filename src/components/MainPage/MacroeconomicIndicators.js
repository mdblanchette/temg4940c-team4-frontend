import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { Chart } from "./chart";

const chartSeries = [
  {
    name: "This year",
    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
  },
  {
    name: "Last year",
    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
  },
];

const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
          customIcons: [],
        },
      },
    },
    colors: [
      theme.palette.primary.main,
      alpha(theme.palette.primary.main, 0.25),
    ],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: "solid",
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "10px",
      },
    },
    stroke: {
      colors: ["transparent"],
      show: true,
      width: 2,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
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
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}K` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  };
};

const time_period = [
  "Today",
  "This Week",
  "This Month",
  "This Year",
  "2 Years",
  "5 Years",
  "10 Years",
];

const indicators = [
  "GDP Growth Rate",
  "Interest Rate",
  "Inflation Rate",
  "Unemployment Rate",
  "Government Debt to GDP",
  "Government Spending",
  "Balance of Trade",
  "Current Account to GDP",
  "Credit Rating",
  "Corporate Tax Rate",
];

export default function MacroeconomicIndicators() {
  const chartOptions = useChartOptions();
  return (
    <Card sx={{ height: "100%" }}>
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
        title="Macroeconomic Indicators"
      />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Indicator"
              select
              defaultValue={"GDP Growth Rate"}
            >
              {indicators.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <Chart
              height={350}
              options={chartOptions}
              series={chartSeries}
              type="bar"
              width="100%"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Indicator"
              select
              defaultValue={"GDP Growth Rate"}
            >
              {indicators.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <Chart
              height={350}
              options={chartOptions}
              series={chartSeries}
              type="bar"
              width="100%"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Indicator"
              select
              defaultValue={"GDP Growth Rate"}
            >
              {indicators.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <Chart
              height={350}
              options={chartOptions}
              series={chartSeries}
              type="bar"
              width="100%"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Indicator"
              select
              defaultValue={"GDP Growth Rate"}
            >
              {indicators.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <Chart
              height={350}
              options={chartOptions}
              series={chartSeries}
              type="bar"
              width="100%"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Indicator"
              select
              defaultValue={"GDP Growth Rate"}
            >
              {indicators.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <Chart
              height={350}
              options={chartOptions}
              series={chartSeries}
              type="bar"
              width="100%"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Indicator"
              select
              defaultValue={"GDP Growth Rate"}
            >
              {indicators.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <Chart
              height={350}
              options={chartOptions}
              series={chartSeries}
              type="bar"
              width="100%"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
