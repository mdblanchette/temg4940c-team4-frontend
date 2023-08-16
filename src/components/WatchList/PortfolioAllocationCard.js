import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import dynamic from "next/dynamic";

const DynamicChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function PortfolioAllocationCard({
  portfolioAllocationData,
  portfolioAllocationLabels,
}) {
  const data = {
    series: portfolioAllocationData,
    options: {
      chart: {
        type: "donut",
      },
      labels: portfolioAllocationLabels,
      colors: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
    },
  };
  return (
    <Card style={{ width: "100%" }}>
      <CardHeader title="Portfolio Allocation" />
      <CardContent style={{ paddingTop: 0 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DynamicChart
            options={data.options}
            series={data.series}
            type="donut"
            width={350}
          />
        </div>
        <Typography variant="body1" align="center">
          {/* Put any additional information here */}
        </Typography>
      </CardContent>
    </Card>
  );
}
