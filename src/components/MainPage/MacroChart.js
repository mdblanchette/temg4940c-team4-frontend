import React, { Component } from "react";
import { ThemeProvider, createTheme, alpha } from "@mui/material/styles";
import Chart from "react-apexcharts";

const theme = createTheme();

class MacroChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
      chart: {
        background: "transparent",
        stacked: false,
        toolbar: {
          show: false,
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
          columnWidth: "12px",
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
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="app">
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={this.state.options}
                series={this.state.series}
                type={this.props.type}
                width="100%"
              />
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default MacroChart;
