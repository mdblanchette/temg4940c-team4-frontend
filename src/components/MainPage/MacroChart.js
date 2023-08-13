import { Chart } from "../MainPage/chart";

export default function MacroChart({
  selectedCountry,
  indicatorA,
  indicatorB,
  indicatorA_Data,
  indicatorB_Data,
  timeframe,
  getMacroData,
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
    colors: ["#FF1654", "#247BA0"],
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
