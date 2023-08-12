import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import dynamic from 'next/dynamic';

const DynamicChart = dynamic(() => import('react-apexcharts'), { ssr: false });


const basicInfoData = {
  stockTicker: 'ABC',
  stockPrice: '$100',
  headquarters: 'City, Country',
  issuerRating: 'A',
};

const financialPerformanceData = {
  revenue: '$1,000,000',
  netIncome: '$500,000',
  operatingCashFlow: '$700,000',
  debtToEquityRatio: '0.5',
};

const featureImportanceData = [
  { name: 'Feature 1', importance: 0.2 },
  { name: 'Feature 2', importance: 0.3 },
  { name: 'Feature 3', importance: 0.15 },
  { name: 'Feature 4', importance: 0.1 },
  { name: 'Feature 5', importance: 0.25 },
];

export default function IssuerInfoCard() {

  const chartOptions = {
    chart: {
      type: 'donut',
      toolbar: {
        show: false,
      },
    },
    labels: featureImportanceData.map(item => item.name),
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      offsetY: 10,
      fontSize: '14px',
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#FFA726', '#FFCC80', '#FF7043', '#FF5722', '#E64A19'],
    tooltip: {
      y: {
        formatter: (val) => (val * 100).toFixed(2) + '%',
      },
    },
  };

  return (
    <Card style={{ width: '100%', marginBottom: 20 }}>
      <CardContent>
        <Typography variant="h6">Issuer Information</Typography>
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          <Grid item xs={6}>
            <div style={{ padding: '10px' }}>
              <Typography variant="subtitle1" align="center">
                Basic Information
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body1" style={{ marginBottom: '10px' }}>
                  Name: Company Name
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Grid container spacing={1} style={{ textAlign: 'center' }}>
                    <Grid item xs={6}>
                      <Typography variant="body2">Stock Ticker</Typography>
                      <Typography variant="subtitle1">{basicInfoData.stockTicker}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Stock Price</Typography>
                      <Typography variant="subtitle1">{basicInfoData.stockPrice}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Headquarters</Typography>
                      <Typography variant="subtitle1">{basicInfoData.headquarters}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Issuer Rating</Typography>
                      <Typography variant="subtitle1">{basicInfoData.issuerRating}</Typography>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div style={{ padding: '10px' }}>
              <Typography variant="subtitle1" align="center">
                Financial Performance
              </Typography>
              <div style={{ display: 'flex', alignItems: 'center'}}>
                <Grid container spacing={1} style={{ textAlign: 'center' }}>
                  <Grid item xs={6}>
                    <Typography variant="body2">Revenue</Typography>
                    <Typography variant="subtitle1">{financialPerformanceData.revenue}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">Net Income</Typography>
                    <Typography variant="subtitle1">{financialPerformanceData.netIncome}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">Operating Cash Flow</Typography>
                    <Typography variant="subtitle1">{financialPerformanceData.operatingCashFlow}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">Debt-to-Equity Ratio</Typography>
                    <Typography variant="subtitle1">{financialPerformanceData.debtToEquityRatio}</Typography>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div style={{ padding: '10px' }}>
              <Typography variant="subtitle1" align="center">
                Feature Importance
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ReactApexChart options={chartOptions} series={featureImportanceData.map(item => item.importance)} type="donut" width={300} />
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div style={{ padding: '10px' }}>
              <Typography variant="subtitle1" align="center">
                CAMELS Ratios
              </Typography>
              {/* Content for CAMELS ratios */}
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
