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
      width: [4, 4],
    },
    plotOptions: {
      bar: {
        columnWidth: "20%",
      },
    },
    xaxis: {
      categories: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
    },
    yaxis: [
      {
        logBase: 10,
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
        },
        title: {
          text: "",
          style: {
            color: "#FF1654",
          },
        },
      },
      {
        logBase: 10,
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
        },
        title: {
          text: "",
          style: {
            color: "#247BA0",
          },
        },
      },
    ],
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        show: false,
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
      height={200}
      width={"100%"}
    />
  );
}
