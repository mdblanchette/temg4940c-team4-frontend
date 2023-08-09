import React from 'react';
import { Card, CardHeader, CardContent, Typography, Grid } from '@mui/material';
import dynamic from 'next/dynamic';

const DynamicChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function PortfolioPerformanceCard() {
  const dummyTexts = ['Text 1', 'Text 2', 'Text 3', 'Text 4', 'Text 5', 'Text 6'];
  const dummyValues = [10, 20, 30, 15, 5, 25]; // Dummy values for demonstration

  const donutChartData = [
    { title: 'Category 1', value: 25 },
    { title: 'Category 2', value: 35 },
    { title: 'Category 3', value: 15 },
    { title: 'Category 4', value: 10 },
  ];

  const chartOptions = {
    chart: {
      type: 'donut',
    },
    labels: donutChartData.map(item => item.title),
    colors: COLORS,
    legend: {
      position: 'right',
      offsetY: -20, // Adjust this value to align the legend with the center
      height: 230,
    },
    tooltip: {
      enabled: true,
    },
  };

  return (
    <Card style={{ width: '100%', marginBottom: 20 }}>
      <CardHeader title="Portfolio Performance" style={{ paddingBottom: 0 }} />
      <CardContent>
        <Grid container spacing={2}>
          {dummyTexts.map((text, index) => (
            <Grid key={index} item xs={4}>
              <Typography variant="subtitle1" align="center">
                {text}
              </Typography>
              <Typography variant="body1" align="center">
                {dummyValues[index]}%
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2} style={{ marginTop: 20 }}>
          <Grid item xs={6}>
            <div style={{ border: '2px solid #ddd', padding: '10px' }}>
              <Typography variant="subtitle1" align="center">
                Rating Allocation
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <DynamicChart options={chartOptions} series={donutChartData.map(item => item.value)} type="donut" width={250} />
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div style={{ border: '2px solid #ddd', padding: '10px' }}>
              <Typography variant="subtitle1" align="center">
                Maturity Allocation
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <DynamicChart options={chartOptions} series={donutChartData.map(item => item.value)} type="donut" width={250} />
              </div>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
