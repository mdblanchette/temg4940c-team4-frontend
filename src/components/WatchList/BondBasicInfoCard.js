import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

// Define the dummy data
const basicinfodata = [
  { title: 'Name', subtitle: 'Subtitle 1' },
  { title: 'Country', subtitle: 'Subtitle 2' },
  { title: 'Issuer', subtitle: 'Subtitle 3' },
  { title: 'Rating', subtitle: 'Subtitle 4' },
  { title: 'Spread', subtitle: 'Subtitle 5' },
  { title: 'Coupons', subtitle: 'Subtitle 6' },
  { title: 'Maturity Date', subtitle: 'Subtitle 7' },
  { title: 'Liquidity', subtitle: 'Subtitle 8' },
  { title: 'Outstanding Amount', subtitle: 'Subtitle 9' },
  { title: 'Bid', subtitle: 'Subtitle 10' },
  { title: 'Ask', subtitle: 'Subtitle 11' },
  { title: 'Net Change', subtitle: 'Subtitle 11' },
];

const bondpredictiondata = [
    { title: 'Issuer Credit Rating Migration', subtitle: 'Subtitle 1' },
    { title: 'Spread Change', subtitle: 'Subtitle 2' },
    { title: 'Confidence Level for Spread Change', subtitle: 'Subtitle 3' },
  ];

export default function BondBasicInfoCard() {
  return (
    <Card style={{ width: '100%', marginBottom: 20 }}>
      <CardContent>
        <Typography variant="h6">Selected Bond Information</Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '10px', textAlign: 'center' }}>
          {basicinfodata.map((data, index) => (
            <div key={index}>
              <Typography variant="body2" style={{ marginBottom: '5px' }}>{data.title}</Typography>
              <Typography variant="subtitle1">{data.subtitle}</Typography>
            </div>
          ))}
        </div>

        <Box style={{ background: '#E0F0FF', padding: '10px', marginTop: '20px' }}>
          <Typography variant="h6">Bond Prediction</Typography>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '10px', textAlign: 'center' }}>
            {bondpredictiondata.map((data, index) => (
            <div key={index}>
              <Typography variant="body2" style={{ marginBottom: '5px' }}>{data.title}</Typography>
              <Typography variant="subtitle1">{data.subtitle}</Typography>
            </div>
          ))}
          </div>
          <Typography variant="body2" style={{ fontWeight: 'bold', marginTop: '10px' }}>
            Average Credit Rating and Price Correlation: x%
          </Typography>
        </Box>

        <Box style={{ background: 'white', border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
          <Typography variant="h6">Bond Trends</Typography>
          {/* Add your content for Bond Trends here */}
        </Box>
      </CardContent>
    </Card>
  );
}
