import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import BondSpreadChart from "./BondSpreadChart";
import BondCreditRatingChart from "./BondCreditRatingChart";

export default function BondBasicInfoCard({
  selectedRow,
  selectedPortfolio,
  dummyIssuerData,
}) {
  const [predictedIssuerRating, setPredictedIssuerRating] = useState("");

  useEffect(() => {
    const selectedIssuer = selectedRow.issuer;
    const issuerData = dummyIssuerData.find(
      (issuer) => issuer.issuer === selectedIssuer
    );

    if (issuerData) {
      setPredictedIssuerRating(issuerData.predictedIssuerRating);
    }
    console.log("selectedRow", selectedRow);
  }, [selectedRow, selectedPortfolio]);

  const basicinfodata = [
    { title: "Name", subtitle: selectedRow?.name || "N/A" },
    { title: "Country", subtitle: selectedRow?.country || "N/A" },
    { title: "Issuer", subtitle: selectedRow?.issuer || "N/A" },
    { title: "Rating", subtitle: selectedRow?.rating || "N/A" },
    { title: "Spread", subtitle: selectedRow?.spread || "N/A" },
    { title: "Coupons", subtitle: selectedRow?.coupons || "N/A" },
    { title: "Maturity Date", subtitle: selectedRow?.maturity || "N/A" },
    { title: "Liquidity", subtitle: selectedRow?.liquidity || "N/A" },
    {
      title: "Outstanding Amount",
      subtitle: selectedRow?.outstandingAmount || "N/A",
    },
    { title: "Bid", subtitle: selectedRow?.bid || "N/A" },
    { title: "Ask", subtitle: selectedRow?.ask || "N/A" },
    { title: "Net Change", subtitle: selectedRow?.netChange || "N/A" },
  ];

  const bondpredictiondata = [
    {
      title: "Predicted Issuer Credit Rating",
      subtitle: predictedIssuerRating || "N/A",
    },
    {
      title: "Spread Change",
      subtitle: selectedRow?.predictedSpreadMovement || "N/A",
    },
    { title: "Confidence Level for Spread Change", subtitle: "Subtitle 3" },
  ];

  return (
    <Card style={{ width: "100%", marginBottom: 20 }}>
      <CardContent>
        <Typography variant="h6">Selected Bond Information</Typography>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginTop: "10px",
            textAlign: "center",
          }}
        >
          {basicinfodata.map((data, index) => (
            <div key={index}>
              <Typography variant="body2" style={{ marginBottom: "5px" }}>
                {data.title}
              </Typography>
              <Typography variant="subtitle1">{data.subtitle}</Typography>
            </div>
          ))}
        </div>

        <Box
          style={{
            background: "#E0F0FF",
            padding: "10px",
            marginTop: "20px",
          }}
        >
          <Typography variant="h6">Bond Prediction</Typography>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            {bondpredictiondata.map((data, index) => (
              <div key={index}>
                <Typography variant="body2" style={{ marginBottom: "5px" }}>
                  {data.title}
                </Typography>
                <Typography variant="subtitle1">{data.subtitle}</Typography>
              </div>
            ))}
          </div>
          <Typography
            variant="body2"
            style={{ fontWeight: "bold", marginTop: "10px" }}
          >
            Average Credit Rating and Price Correlation: x%
          </Typography>
        </Box>

        <Box
          style={{
            background: "white",
            border: "1px solid #ccc",
            padding: "10px",
            marginTop: "20px",
          }}
        >
          <Typography variant="h6">Bond Trends</Typography>
          <BondSpreadChart />
          <BondCreditRatingChart />
        </Box>
      </CardContent>
    </Card>
  );
}
