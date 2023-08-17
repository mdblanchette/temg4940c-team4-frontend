import { Chart } from "../MainPage/chart";

export default function MacroChart({
  selectedCountry,
  indicatorA,
  indicatorB,
  indicatorA_Data,
  indicatorB_Data,
}) {
  const chartOptions = {
    chart: {
      height: 300,
      type: "line",
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#008ffb", "#00e396"],
    series: [
      {
        name: "A: " + indicatorA,
        data: selectedCountry === "Global" ? [] : indicatorA_Data,
      },
      {
        name: "B: " + indicatorB,
        data: selectedCountry === "Global" ? [] : indicatorB_Data,
      },
    ],
    stroke: {
      width: [3, 3],
    },
    xaxis: {
      categories: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
    },
    yaxis: [
      {
        seriesName: indicatorA,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#008ffb",
        },
        labels: {
          style: {
            colors: "#008ffb",
          },
          formatter: function (val) {
            if (val) {
              if (
                indicatorA.includes("Rate") ||
                indicatorA === "Consumer Price Index" ||
                indicatorA === "Government Debt to GDP"
              )
                return val.toFixed(2) + "%";
              else return val.toFixed(0);
            } else return;
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
            colors: "#00e396",
          },
          formatter: function (val) {
            if (val) {
              if (
                indicatorB.includes("Rate") ||
                indicatorB === "Consumer Price Index" ||
                indicatorB === "Government Debt to GDP"
              )
                return val.toFixed(2) + "%";
              else return val.toFixed(0);
            } else return;
          },
        },
      },
    ],
    tooltip: {
      fixed: {
        enabled: true,
        position: "topCenter",
        offsetX: 0,
        offsetY: -80,
      },
    },
    legend: {
      horizontalAlign: "left",
      offsetX: 40,
    },
  };

  return (
    <Chart
      options={chartOptions}
      series={chartOptions.series}
      type="line"
      height={250}
      width={"100%"}
    />
  );
}
