import React, { useState, useEffect } from "react";
import {
  Stack,
  Card,
  CardContent,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  CardHeader, // Import Button component
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ca } from "date-fns/locale";

export default function IssuerInfoCard({ selectedRow, dummyIssuerData }) {
  const apiEndPoint = "http://35.220.165.226/api/";
  const [predictedIssuerRating, setPredictedIssuerRating] = useState("");
  const [issuerData, setIssuerData] = useState(null);
  const [allExpanded, setAllExpanded] = useState(false); // Initialize as false
  const [accordionStates, setAccordionStates] = useState({}); // State to track individual accordion states
  const [camelsInfo, setCamelsInfo] = useState({});

  // retrieve issuer info
  useEffect(() => {
    const fetchIssuer = async () => {
      try {
        const response = await fetch(
          apiEndPoint + "company/" + selectedRow.PermID
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data from the API.");
        }
        const data = await response.json();
        console.log(data[0]);

        setIssuerData(data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIssuer();
  }, [selectedRow]);

  // retrieve issuer CAMELS
  useEffect(() => {
    const fetchCamels = async () => {
      try {
        const response = await fetch(
          apiEndPoint + "camels/" + selectedRow.PermID
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data from the API.");
        }
        const data = await response.json();
        console.log(data);

        setCamelsInfo(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCamels();
  }, [selectedRow]);

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

  // useEffect(() => {
  //   const selectedIssuer = selectedRow.issuer;
  //   const issuerData = dummyIssuerData.find(
  //     (issuer) => issuer.issuer === selectedIssuer
  //   );

  //   if (issuerData) {
  //     setIssuerData(issuerData);
  //     setPredictedIssuerRating(issuerData.predictedIssuerRating);
  //   }
  //   console.log("selectedRow", selectedRow);
  // }, [selectedRow, dummyIssuerData]);

  return (
    <Card style={{ width: "100%" }}>
      <CardHeader title="Issuer Information" />
      <CardContent>
        <Stack spacing={2}>
          <Card>
            <CardHeader title="Basic Information" />
            <CardContent>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  //border: "1px solid #ccc",
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Stack>
                    <Typography>Name</Typography>
                    <Typography variant="h6">
                      {selectedRow ? selectedRow.IssuerName : ""}
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography>Country</Typography>
                    <Typography variant="h6">
                      {selectedRow ? selectedRow.IssuerCountryName : ""}
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography>Issuer Rating</Typography>
                    <Typography variant="h6">
                      {selectedRow ? selectedRow.IssuerRating : ""}
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography>Ticker</Typography>
                    <Typography variant="h6">
                      {issuerData ? issuerData.Ticker : ""}
                    </Typography>
                  </Stack>
                </div>
              </Box>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="CAMELS Information" />
            <CardContent>
              <Stack
                spacing={4}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                  padding: "10px",
                }}
              >
                <Button onClick={handleToggleAll} variant="contained">
                  {allExpanded ? "Collapse All" : "Expand All"}
                </Button>
                <Stack spacing={2}>
                  <Accordion expanded={allExpanded}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography variant="h6">Capitalization</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <AccordionDetails>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "5px",
                            }}
                          >
                            <Typography
                              variant="body2"
                              style={{ textAlign: "left" }}
                            >
                              Equity/Assets
                            </Typography>
                            <Typography
                              variant="body2"
                              style={{ textAlign: "right" }}
                            >
                              {camelsInfo
                                ? (
                                    parseFloat(camelsInfo["Total Equity"]) /
                                    parseFloat(
                                      camelsInfo["Total Assets, Reported"]
                                    )
                                  ).toFixed(2)
                                : "N/A"}
                            </Typography>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "5px",
                            }}
                          >
                            <Typography
                              variant="body2"
                              style={{ textAlign: "left" }}
                            >
                              Core Tier 1 Capital
                            </Typography>
                            <Typography
                              variant="body2"
                              style={{ textAlign: "right" }}
                            >
                              {camelsInfo
                                ? camelsInfo.Core_Tier_1_Capital
                                : "N/A"}
                            </Typography>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "5px",
                            }}
                          >
                            <Typography
                              variant="body2"
                              style={{ textAlign: "left" }}
                            >
                              Tier 1 Capital
                            </Typography>
                            <Typography
                              variant="body2"
                              style={{ textAlign: "right" }}
                            >
                              {camelsInfo
                                ? `${camelsInfo["Tier 1 Capital %"]} %`
                                : "N/A"}
                            </Typography>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "5px",
                            }}
                          >
                            <Typography
                              variant="body2"
                              style={{ textAlign: "left" }}
                            >
                              Capital Adequacy Ratio
                            </Typography>
                            <Typography
                              variant="body2"
                              style={{ textAlign: "right" }}
                            >
                              {camelsInfo
                                ? `${camelsInfo["Total Capital, Percent"]} %`
                                : "N/A"}
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
                      <Typography variant="h6">Asset Quality</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{ textAlign: "left" }}
                          >
                            Non-Performing Loans / Gross Loans
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ textAlign: "right" }}
                          >
                            {camelsInfo
                              ? (
                                  parseFloat(
                                    camelsInfo["Non-Performing Loans"]
                                  ) /
                                  parseFloat(camelsInfo["Total Gross Loans"])
                                ).toFixed(3)
                              : "N/A"}
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{ textAlign: "left" }}
                          >
                            Loan Loss Reserves / Non Performing Loans
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ textAlign: "right" }}
                          >
                            {camelsInfo
                              ? (
                                  parseFloat(
                                    camelsInfo["Loan Loss Allowances"]
                                  ) /
                                  parseFloat(camelsInfo["Non-Performing Loans"])
                                ).toFixed(2)
                              : "N/A"}
                          </Typography>
                        </div>
                        {/* <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{ textAlign: "left" }}
                          >
                            Unreserved NPLs / Total Shareholders' Equity
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ textAlign: "right" }}
                          >
                            {issuerData ? issuerData.aq_3 : ""}
                          </Typography>
                        </div> */}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={allExpanded}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography variant="h6">Size</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{ textAlign: "left" }}
                          >
                            Total Assets
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ textAlign: "right" }}
                          >
                            {camelsInfo
                              ? camelsInfo["Total Assets, Reported"]
                              : "N/A"}
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{ textAlign: "left" }}
                          >
                            Total Deposits
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ textAlign: "right" }}
                          >
                            {camelsInfo ? camelsInfo["Total Deposits"] : "N/A"}
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{ textAlign: "left" }}
                          >
                            Total Gross Loans
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ textAlign: "right" }}
                          >
                            {camelsInfo
                              ? camelsInfo["Total Gross Loans"]
                              : "N/A"}
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{ textAlign: "left" }}
                          >
                            Liquid Assets
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ textAlign: "right" }}
                          >
                            {camelsInfo
                              ? camelsInfo["Total Current Assets"]
                              : "N/A"}
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{ textAlign: "left" }}
                          >
                            Total Shareholder Equity
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ textAlign: "right" }}
                          >
                            {camelsInfo ? camelsInfo["Total Equity"] : "N/A"}
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{ textAlign: "left" }}
                          >
                            Net Income
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ textAlign: "right" }}
                          >
                            {camelsInfo
                              ? camelsInfo["Net Income After Taxes"]
                              : "N/A"}
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
                      <Typography variant="h6">Funding/Liquidity</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{ textAlign: "left" }}
                          >
                            Net Loans/Customer Deposits
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ textAlign: "right" }}
                          >
                            {camelsInfo
                              ? (
                                  parseFloat(camelsInfo["Net Loans"]) /
                                  parseFloat(camelsInfo["Customer Advances"])
                                ).toFixed(2)
                              : "N/A"}
                          </Typography>
                        </div>
                        {/* <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{ textAlign: "left" }}
                          >
                            Stable Funds/Net Loans
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ textAlign: "right" }}
                          >
                            {issuerData ? issuerData.fl_2 : ""}
                          </Typography>
                        </div> */}
                        {/* <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{ textAlign: "left" }}
                          >
                            Liquid Assets / Wholesale Funds
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ textAlign: "right" }}
                          >
                            {issuerData ? issuerData.fl_3 : ""}
                          </Typography>
                        </div> */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{ textAlign: "left" }}
                          >
                            Liquidity Coverage Ratio
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ textAlign: "right" }}
                          >
                            {camelsInfo ? camelsInfo["Coverage_Ratio"] : ""}
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
                      <Typography variant="h6">Earnings</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        {/* <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{ textAlign: "left" }}
                          >
                            Net Interest Margin
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ textAlign: "right" }}
                          >
                             {camelsInfo
                                ? (
                                    parseFloat(camelsInfo["Net Loans"]) /
                                    parseFloat(
                                      camelsInfo["Customer Advances"]
                                    )
                                  ).toFixed(2)
                                : "N/A"}
                          </Typography>
                        </div> */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{ textAlign: "left" }}
                          >
                            Operating Profit / Risk Weighted Assets
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ textAlign: "right" }}
                          >
                            {camelsInfo
                              ? (
                                  (parseFloat(camelsInfo["Operating Income"]) -
                                    parseFloat(
                                      camelsInfo[
                                        "Other Non-Operating Income (Expense)"
                                      ]
                                    )) /
                                  parseFloat(camelsInfo["Risk_Weighted_Assets"])
                                ).toFixed(2)
                              : "N/A"}
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{ textAlign: "left" }}
                          >
                            Return on Average Assets
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ textAlign: "right" }}
                          >
                            {camelsInfo
                              ? camelsInfo["Return on Average Assets"]
                              : "N/A"}
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "5px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{ textAlign: "left" }}
                          >
                            Return on Average Equity
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ textAlign: "right" }}
                          >
                            {camelsInfo
                              ? camelsInfo["Return on Average Equity"]
                              : "N/A"}
                          </Typography>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </CardContent>
    </Card>
  );
}
