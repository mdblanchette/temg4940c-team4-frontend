import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import CountryFlag from 'react-country-flag';

export default function CountryInfoCard({ selectedRowData, dummyCountryData }) {
  const [countryInfo, setCountryInfo] = useState({
    name: 'No country information available',
    sovereignRating: 'N/A',
    averageIssuerRating: 'N/A',
  });

  useEffect(() => {
    if (selectedRowData && dummyCountryData) {
      const countryCode = selectedRowData.country;
      const countryData = dummyCountryData.find(country => country.country === countryCode);

      if (countryData) {
        setCountryInfo({
          name: countryData.country,
          sovereignRating: countryData.sovereignRating,
          averageIssuerRating: countryData.averageIssuerRating,
        });
      }
    }
  }, [selectedRowData, dummyCountryData]);

  return (
    <Card style={{ width: '100%', marginBottom: 20 }}>
      <CardContent>
        <Typography variant="h6">Country Information</Typography>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '20px',
            textAlign: 'center',
          }}
        >
          <div>
            <Typography variant="body2">Country</Typography>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
              }}
            >
              {countryInfo.country ? (
                <>
                  <CountryFlag countryCode={countryInfo.code} svg style={{ width: '1.5em', height: '1.5em' }} />
                  <Typography variant="subtitle1" style={{ marginLeft: '5px' }}>
                    {countryInfo.name}
                  </Typography>
                </>
              ) : (
                <Typography variant="subtitle1" style={{ marginLeft: '5px' }}>
                  {countryInfo.name}
                </Typography>
              )}
            </div>
          </div>
          <div>
            <Typography variant="body2">Sovereign Rating</Typography>
            <Typography variant="subtitle1">{countryInfo.sovereignRating}</Typography>
          </div>
          <div>
            <Typography variant="body2">Average Issuer Rating</Typography>
            <Typography variant="subtitle1">{countryInfo.averageIssuerRating}</Typography>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
}
