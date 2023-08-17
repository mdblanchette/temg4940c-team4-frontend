import { Chart } from "../MainPage/chart";

const moodyRatings = [
  { rating: "Baa3", code: 1 },
  { rating: "Baa2", code: 2 },
  { rating: "Baa1", code: 3 },
  { rating: "A3", code: 4 },
  { rating: "A2", code: 5 },
  { rating: "A1", code: 6 },
  { rating: "Aa3", code: 7 },
  { rating: "Aa2", code: 8 },
  { rating: "Aa1", code: 9 },
  { rating: "Aaa", code: 10 },
];

const dummyCreditRatingData = [9, 2, 7, 5, null, 3, 8, 1, 6, 10];
// const dummyCreditRatingData = [
//   "Aa1",
//   "Baa2",
//   "Aa3",
//   "A2",
//   NULL,
//   "Baa1",
//   "Aa2",
//   "Baa3",
//   "A1",
//   "Aaa",
// ];

export default function MacroChart({}) {
  const chartOptions = {
    title: {
      text: "Credit Rating History",
      align: "center",
    },
    chart: {
      height: 300,
      type: "line",
      stacked: false,
    },
    colors: ["#00e396"],
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        name: "Rating (Moody's)",
        data: dummyCreditRatingData, // RATING DATA GOES HERE
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
        min: 1,
        max: 10,
        tickAmount: 9,
        title: {
          text: "Rating (Moody's)",
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
            if (val) return moodyRatings.find((x) => x.code === val).rating;
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
