import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardHeader,
  Stack,
} from "@mui/material";

export default function CountryInfoCard({ selectedRow, oecdCountries }) {
  const apiEndPoint = "http://35.220.165.226/api/macro/creditRating/";
  const countryNames = oecdCountries.map((country) => country.name);

  function getCountryNameFromCode(code) {
    const country = oecdCountries.find((country) => country.code === code);
    return country ? country.name : null;
  }

  function getFlag(code) {
    const country = oecdCountries.find((country) => country.code === code);
    return country ? country.flag : null;
  }

  const [countryInfo, setCountryInfo] = useState({
    flag: "",
    name: "No country information available",
    sovereignRating: "N/A",
    averageIssuerRating: "N/A",
  });

  useEffect(() => {
    // if (!selectedRow) return;
    // const country = oecdCountries.find((c) => c.name === selectedRow.country);
    // if (!country) return;
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndPoint + selectedRow.IssuerCountry);
        if (!response.ok) {
          throw new Error("Failed to fetch data from the API.");
        }
        const data = await response.json();
        console.log(data);

        setCountryInfo({
          flag: getFlag(selectedRow.IssuerCountry),
          name: getCountryNameFromCode(selectedRow.IssuerCountry),
          sovereignRating: data.Moodys ? data.Moodys : "N/A", // SET UP FETCHING WHEN READY
          averageIssuerRating: data["Average Issuer Rating"]
            ? data["Average Issuer Rating"]
            : "N/A", // SET UP FETCHING WHEN READY
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedRow]);

  return (
    <Card style={{ width: "100%", marginBottom: 20 }}>
      <CardHeader title="Country Information" />
      <CardContent>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            textAlign: "center",
          }}
        >
          <Stack sx={{ alignItems: "start" }}>
            <Typography>Country</Typography>
            <Typography variant="h6">
              {countryInfo.flag + " " + countryInfo.name}
            </Typography>
          </Stack>

          <Stack sx={{ alignItems: "start" }}>
            <Typography>Sovereign Rating</Typography>
            <Typography variant="h6">{countryInfo.sovereignRating}</Typography>
          </Stack>

          <Stack sx={{ alignItems: "start" }}>
            <Typography>Average Issuer Rating</Typography>
            <Typography variant="h6">
              {countryInfo.averageIssuerRating}
            </Typography>
          </Stack>
        </div>
      </CardContent>
    </Card>
  );
}
