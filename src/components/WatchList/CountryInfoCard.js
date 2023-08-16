import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function CountryInfoCard({ selectedRow, oecdCountries }) {
  const [countryInfo, setCountryInfo] = useState({
    flag: "",
    name: "No country information available",
    sovereignRating: "N/A",
    averageIssuerRating: "N/A",
  });

  useEffect(() => {
    if (!selectedRow) return;
    const country = oecdCountries.find((c) => c.name === selectedRow.country);
    if (!country) return;

    setCountryInfo({
      flag: country.flag,
      name: country.name,
      sovereignRating: "N/A", // SET UP FETCHING WHEN READY
      averageIssuerRating: "N/A", // SET UP FETCHING WHEN READY
    });
  }, [selectedRow, oecdCountries]);

  return (
    <Card style={{ width: "100%", marginBottom: 20 }}>
      <CardContent>
        <Typography variant="h6">Country Information</Typography>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <div>
            <Typography variant="body2">Country</Typography>
            <Typography variant="subtitle1">
              {countryInfo.flag + " " + countryInfo.name}
            </Typography>
          </div>
          <div>
            <Typography variant="body2">Sovereign Rating</Typography>
            <Typography variant="subtitle1">
              {countryInfo.sovereignRating}
            </Typography>
          </div>
          <div>
            <Typography variant="body2">Average Issuer Rating</Typography>
            <Typography variant="subtitle1">
              {countryInfo.averageIssuerRating}
            </Typography>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
}
