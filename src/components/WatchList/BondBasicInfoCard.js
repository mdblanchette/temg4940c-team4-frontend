import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function BondBasicInfoCard({
  selectedRow,
  selectedPortfolio,
  dummyTableData,
  dummyIssuerData,
}) {
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [predictedIssuerRating, setPredictedIssuerRating] = useState("");

  useEffect(() => {
    if (selectedRow !== null && selectedPortfolio) {
      const selectedData = dummyTableData[selectedPortfolio].find(
        (item) => item.id === selectedRow
      );

      setSelectedRowData(selectedData);

      const selectedIssuer = selectedData.issuer;
      const issuerData = dummyIssuerData.find(
        (issuer) => issuer.issuer === selectedIssuer
      );

      if (issuerData) {
        setPredictedIssuerRating(issuerData.predictedIssuerRating);
      }
    }
  }, [selectedRow, selectedPortfolio]);

  const basicinfodata = [
    { title: 'Name', subtitle: selectedRowData?.name || 'N/A' },
    { title: 'Country', subtitle: selectedRowData?.country || 'N/A' },
    { title: 'Issuer', subtitle: selectedRowData?.issuer || 'N/A' },
    { title: 'Rating', subtitle: selectedRowData?.rating || 'N/A' },
    { title: "Spread", subtitle: selectedRowData?.spread || 'N/A' },
    { title: "Coupons", subtitle: selectedRowData?.coupons || 'N/A' },
    { title: "Maturity Date", subtitle: selectedRowData?.maturity || 'N/A' },
    { title: "Liquidity", subtitle: selectedRowData?.liquidity || 'N/A' },
    { title: "Outstanding Amount", subtitle: selectedRowData?.outstandingAmount || 'N/A' },
    { title: "Bid", subtitle: selectedRowData?.bid || 'N/A' },
    { title: "Ask", subtitle: selectedRowData?.ask || 'N/A' },
    { title: "Net Change", subtitle: selectedRowData?.netChange || 'N/A' },
  ];


  const bondpredictiondata = [
    { title: "Predicted Issuer Credit Rating", subtitle: predictedIssuerRating || 'N/A' },
    { title: "Spread Change", subtitle: selectedRowData?.predictedSpreadMovement || 'N/A' },
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
                <Typography
                  variant="body2"
                  style={{ marginBottom: "5px" }}
                >
                  {data.title}
                </Typography>
                <Typography variant="subtitle1">
                  {data.subtitle}
                </Typography>
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
          {/* Add your content for Bond Trends here */}
        </Box>
      </CardContent>
    </Card>
  );
}
