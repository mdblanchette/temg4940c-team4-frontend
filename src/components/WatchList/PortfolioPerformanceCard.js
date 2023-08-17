import React from "react";
import { Card, CardHeader, CardContent, Typography, Grid } from "@mui/material";
import dynamic from "next/dynamic";

const DynamicChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function PortfolioPerformanceCard({
  ratingAllocationData,
  ratingAllocationLabels,
  maturityAllocationData,
  maturityAllocationLabels,
}) {
  // Replace this dummy data with actual API data later
  const portfolioData = [
    { label: "Total Value (USD)", value: "1,000,000" },
    { label: "Average Credit Rating", value: "AA" },
    { label: "Average Maturity (Years)", value: 7.5 },
    { label: "Overall Return", value: "12.5%" },
    { label: "Yield to Maturity", value: "6.8%" },
    { label: "Total Duration (Years)", value: 5.2 },
  ];

  const ratingChart = {
    series: ratingAllocationData,
    options: {
      chart: {
        type: "donut",
      },
      labels: ratingAllocationLabels,
      colors: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
    },
  };

  const maturityChart = {
    series: maturityAllocationData,
    options: {
      chart: {
        type: "donut",
      },
      labels: maturityAllocationLabels.map((label) => label + " Years"),
      colors: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
    },
  };

  return (
    <Card style={{ width: "100%" }}>
      <CardHeader title="Portfolio Performance" style={{ paddingBottom: 0 }} />
      <CardContent
        style={{
          paddingTop: 10,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Grid container spacing={2}>
          {portfolioData.map((data, index) => (
            <Grid key={index} item xs={4}>
              <Typography variant="body2" align="center">
                {data.label}
              </Typography>
              <Typography variant="body1" align="center">
                {data.value}
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div style={{ border: "2px solid #ddd", padding: "10px" }}>
              <Typography variant="subtitle1" align="center">
                Rating Allocation
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <DynamicChart
                  options={ratingChart.options}
                  series={ratingChart.series}
                  type="donut"
                  width={250}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div style={{ border: "2px solid #ddd", padding: "10px" }}>
              <Typography variant="subtitle1" align="center">
                Maturity Allocation
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <DynamicChart
                  options={maturityChart.options}
                  series={maturityChart.series}
                  type="donut"
                  width={280}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
