import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import CountryFlag from 'react-country-flag';

export default function CountryInfoCard() {
  // Placeholder country data
  const countryData = {
    name: 'Country A',
    code: 'US', // ISO 3166-1 alpha-2 country code
    sovereignRating: 'A',
    averageIssuerRating: 'B',
    predictedRatingMigration: +0.2,
    predictedSpreadChange: -0.1,
    predictionConfidence: '80%',
  };

  return (
    <Card style={{ width: '100%', marginBottom: 20 }}>
      <CardContent>
        <Typography variant="h6">Country Information</Typography>
        <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="body2">Country</Typography>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
              <CountryFlag countryCode={countryData.code} svg style={{ width: '1.5em', height: '1.5em' }} />
              <Typography variant="subtitle1" style={{ marginLeft: '5px' }}>{countryData.name}</Typography>
            </div>
            <Typography variant="body2">Sovereign Rating</Typography>
            <Typography variant="subtitle1">{countryData.sovereignRating}</Typography>
            <Typography variant="body2">Average Issuer Rating</Typography>
            <Typography variant="subtitle1">{countryData.averageIssuerRating}</Typography>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="body2">Average Predicted Rating Migration</Typography>
            <Typography variant="subtitle1" style={{ color: countryData.predictedRatingMigration > 0 ? 'green' : 'red', marginBottom: '10px' }}>
              {countryData.predictedRatingMigration > 0 ? `+${countryData.predictedRatingMigration}` : countryData.predictedRatingMigration}
            </Typography>
            <Typography variant="body2">Average Predicted Spread Change</Typography>
            <Typography variant="subtitle1" style={{ color: countryData.predictedSpreadChange > 0 ? 'green' : 'red', marginBottom: '10px' }}>
              {countryData.predictedSpreadChange > 0 ? `+${countryData.predictedSpreadChange}` : countryData.predictedSpreadChange}
            </Typography>
            <Typography variant="body2">Prediction Confidence Level</Typography>
            <Typography variant="subtitle1">{countryData.predictionConfidence}</Typography>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
}
