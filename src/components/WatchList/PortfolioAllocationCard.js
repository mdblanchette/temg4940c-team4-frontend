import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import dynamic from 'next/dynamic';

const DynamicChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const data = {
  series: [30, 20, 15, 35],
  options: {
    chart: {
      type: 'donut',
    },
    labels: ['Bond 1', 'Bond 2', 'Bond 3', 'Bond 4'],
    colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
  },
};

export default function PortfolioAllocationCard() {
  return (
    <Card style={{ width: '100%',}}>
      <CardHeader title="Portfolio Allocation" />
      <CardContent style={{ paddingTop: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <DynamicChart options={data.options} series={data.series} type="donut" width={350} />
        </div>
        <Typography variant="body1" align="center">
          {/* Put any additional information here */}
        </Typography>
      </CardContent>
    </Card>
  );
}
