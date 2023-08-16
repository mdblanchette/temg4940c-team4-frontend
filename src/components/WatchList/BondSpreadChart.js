import { Chart } from "../MainPage/chart";

export default function MacroChart({}) {
  const chartOptions = {
    title: {
      text: "Credit Spread History",
      align: "center",
    },
    chart: {
      height: 300,
      type: "line",
      stacked: false,
    },
    colors: ["#008ffb"],
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        name: "Spread",
        data: [1, 2, 5, 5, 3, 3, 4, 5, 6, 2], // SPREAD DATA GOES HERE
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
        title: {
          text: "Basis Points",
        },
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
        },
        labels: {
          style: {},
          formatter: function (val) {
            if (val) return val.toFixed(0) + " bps";
          },
        },
      },
    ],

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
