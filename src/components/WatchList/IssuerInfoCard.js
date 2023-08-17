import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button, // Import Button component
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


export default function IssuerInfoCard({ selectedRow, dummyIssuerData }) {
  const [predictedIssuerRating, setPredictedIssuerRating] = useState("");
  const [issuerData, setIssuerData] = useState(null);
  const [allExpanded, setAllExpanded] = useState(false); // Initialize as false
  const [accordionStates, setAccordionStates] = useState({}); // State to track individual accordion states

  useEffect(() => {
    // Set all accordion states based on the allExpanded state
    const newAccordionStates = {};
    dummyIssuerData.forEach((_, index) => {
      newAccordionStates[index] = allExpanded;
    });
    setAccordionStates(newAccordionStates);
  }, [allExpanded, dummyIssuerData]);

  // Handler function to toggle individual accordion state
  const handleAccordionToggle = (index) => {
    setAccordionStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // Handler function to toggle all accordions
  const handleToggleAll = () => {
    setAllExpanded((prevExpanded) => !prevExpanded);
  };

  useEffect(() => {
    const selectedIssuer = selectedRow.issuer;
    const issuerData = dummyIssuerData.find(
      (issuer) => issuer.issuer === selectedIssuer
    );

    if (issuerData) {
      setIssuerData(issuerData);
      setPredictedIssuerRating(issuerData.predictedIssuerRating);
    }
    console.log("selectedRow", selectedRow);
  }, [selectedRow, dummyIssuerData]);

  return (
    <Card style={{ width: '100%' }}>
      <CardContent>
        <Typography variant="h6">Issuer Information</Typography>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
            border: '1px solid #ccc',
            padding: '10px',
          }}
        >
          <Typography variant="h6" style={{ marginBottom: '10px' }}>
            Basic Information
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <Typography variant="body2">Name</Typography>
              <Typography variant="subtitle1">
                {issuerData ? issuerData.issuer : ""}
              </Typography>
            </div>
            <div>
              <Typography variant="body2">Country</Typography>
              <Typography variant="subtitle1">
                {issuerData ? issuerData.country : ""}
              </Typography>
            </div>
            <div>
              <Typography variant="body2">Issuer Rating</Typography>
              <Typography variant="subtitle1">
                {issuerData ? issuerData.issuerRating : ""}
              </Typography>
            </div>
            <div>
              <Typography variant="body2">Predicted Issuer Rating</Typography>
              <Typography variant="subtitle1">
                {predictedIssuerRating}
              </Typography>
            </div>
          </div>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
            border: '1px solid #ccc',
            padding: '10px',
          }}
        >
          <Typography variant="h6" style={{ marginBottom: '10px' }}>
            CAMELS Information
          </Typography>
          <Button onClick={handleToggleAll}>
            {allExpanded ? "Collapse All" : "Expand All"}
          </Button>
          <Accordion expanded={allExpanded}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body2">
                Capitalization
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <AccordionDetails>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <Typography variant="body2" style={{ textAlign: 'left' }}>
                    Equity/Assets
                  </Typography>
                  <Typography variant="body2" style={{ textAlign: 'right' }}>
                    {issuerData ? issuerData.capitalization_1 : ""}
                  </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <Typography variant="body2" style={{ textAlign: 'left' }}>
                    Core Tier 1 Capital
                  </Typography>
                  <Typography variant="body2" style={{ textAlign: 'right' }}>
                    {issuerData ? issuerData.capitalization_2 : ""}
                  </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <Typography variant="body2" style={{ textAlign: 'left' }}>
                    Tier 1 Capital
                  </Typography>
                  <Typography variant="body2" style={{ textAlign: 'right' }}>
                    {issuerData ? issuerData.capitalization_3 : ""}
                  </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <Typography variant="body2" style={{ textAlign: 'left' }}>
                    Capital Adequacy Ratio
                  </Typography>
                  <Typography variant="body2" style={{ textAlign: 'right' }}>
                    {issuerData ? issuerData.capitalization_4 : ""}
                  </Typography>
                </div>
              </div>
            </AccordionDetails>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={allExpanded}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body2">
                Asset Quality
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <Typography variant="body2" style={{ textAlign: 'left' }}>
                    Non-Performing Loans / Gross Loans
                  </Typography>
                  <Typography variant="body2" style={{ textAlign: 'right' }}>
                    {issuerData ? issuerData.aq_1 : ""}
                  </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <Typography variant="body2" style={{ textAlign: 'left' }}>
                    Loan Loss Reserves / Non Performing Loans
                  </Typography>
                  <Typography variant="body2" style={{ textAlign: 'right' }}>
                    {issuerData ? issuerData.aq_2 : ""}
                  </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <Typography variant="body2" style={{ textAlign: 'left' }}>
                    Unreserved NPLs / Total Shareholders' Equity
                  </Typography>
                  <Typography variant="body2" style={{ textAlign: 'right' }}>
                    {issuerData ? issuerData.aq_3 : ""}
                  </Typography>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={allExpanded}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body2">
                Size
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <Typography variant="body2" style={{ textAlign: 'left' }}>
                    Total Assets
                  </Typography>
                  <Typography variant="body2" style={{ textAlign: 'right' }}>
                    {issuerData ? issuerData.size_1 : ""}
                  </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <Typography variant="body2" style={{ textAlign: 'left' }}>
                    Total Deposits
                  </Typography>
                  <Typography variant="body2" style={{ textAlign: 'right' }}>
                    {issuerData ? issuerData.size_2 : ""}
                  </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <Typography variant="body2" style={{ textAlign: 'left' }}>
                    Total Loans
                  </Typography>
                  <Typography variant="body2" style={{ textAlign: 'right' }}>
                    {issuerData ? issuerData.size_3 : ""}
                  </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <Typography variant="body2" style={{ textAlign: 'left' }}>
                    Liquid Assets
                  </Typography>
                  <Typography variant="body2" style={{ textAlign: 'right' }}>
                    {issuerData ? issuerData.size_4 : ""}
                  </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <Typography variant="body2" style={{ textAlign: 'left' }}>
                    Total Shareholder Equity
                  </Typography>
                  <Typography variant="body2" style={{ textAlign: 'right' }}>
                    {issuerData ? issuerData.size_5 : ""}
                  </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <Typography variant="body2" style={{ textAlign: 'left' }}>
                    Net Income
                  </Typography>
                  <Typography variant="body2" style={{ textAlign: 'right' }}>
                    {issuerData ? issuerData.size_6 : ""}
                  </Typography>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={allExpanded}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body2">
                Funding/Liquidity
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <Typography variant="body2" style={{ textAlign: 'left' }}>
                    Net Loans/Customer Deposits
                  </Typography>
                  <Typography variant="body2" style={{ textAlign: 'right' }}>
                    {issuerData ? issuerData.fl_1 : ""}
                  </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <Typography variant="body2" style={{ textAlign: 'left' }}>
                    Stable Funds/Net Loans
                  </Typography>
                  <Typography variant="body2" style={{ textAlign: 'right' }}>
                    {issuerData ? issuerData.fl_2 : ""}
                  </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <Typography variant="body2" style={{ textAlign: 'left' }}>
                    Liquid Assets / Wholesale Funds
                  </Typography>
                  <Typography variant="body2" style={{ textAlign: 'right' }}>
                    {issuerData ? issuerData.fl_3 : ""}
                  </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <Typography variant="body2" style={{ textAlign: 'left' }}>
                    Liquidity Coverage Ratio
                  </Typography>
                  <Typography variant="body2" style={{ textAlign: 'right' }}>
                    {issuerData ? issuerData.fl_4 : ""}
                  </Typography>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={allExpanded}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body2">
                Earnings
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <Typography variant="body2" style={{ textAlign: 'left' }}>
                    Net Interest Margin
                  </Typography>
                  <Typography variant="body2" style={{ textAlign: 'right' }}>
                  {issuerData ? issuerData.earnings_1 : ""}
                  </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <Typography variant="body2" style={{ textAlign: 'left' }}>
                    Operating Profit / Risk Weighted Assets
                  </Typography>
                  <Typography variant="body2" style={{ textAlign: 'right' }}>
                    {issuerData ? issuerData.earnings_2 : ""}
                  </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <Typography variant="body2" style={{ textAlign: 'left' }}>
                    Return on Average Assets
                  </Typography>
                  <Typography variant="body2" style={{ textAlign: 'right' }}>
                    {issuerData ? issuerData.earnings_3 : ""}
                  </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <Typography variant="body2" style={{ textAlign: 'left' }}>
                    Return on Average Equity
                  </Typography>
                  <Typography variant="body2" style={{ textAlign: 'right' }}>
                    {issuerData ? issuerData.earnings_4 : ""}
                  </Typography>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </Box>
      </CardContent>
    </Card>
  );
}
