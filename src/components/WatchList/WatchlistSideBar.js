import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Select,
  MenuItem,
  InputBase,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  CardHeader,
  Box,
  TextField,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import { CloseOutlined, RemoveCircleOutlined } from "@mui/icons-material";

export default function WatchlistSideBar({
  selectedRow,
  onRowClick,
  setSelectedRow,
  selectedPortfolio,
  setSelectedPortfolio,
  dummyTableData,
  setPortfolioAllocationData,
  setPortfolioAllocationLabels,
  setRatingAllocationData,
  setRatingAllocationLabels,
  setMaturityAllocationData,
  setMaturityAllocationLabels,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openPortfolioSettings, setOpenPortfolioSettings] = useState(false);

  // Filter table data based on search query
  const filteredTableData = dummyTableData[selectedPortfolio]?.filter((row) => {
    const lowerSearchQuery = searchQuery.toLowerCase();
    return (
      row.BondID.toLowerCase().includes(lowerSearchQuery) ||
      row.IssuerName.toLowerCase().includes(lowerSearchQuery) ||
      row.RecentBondRating.toLowerCase().includes(lowerSearchQuery) ||
      row.PredictedRating.toLowerCase().includes(lowerSearchQuery)
    );
  });

  const renderPortfolioGraphs = (
    setPortfolioData,
    selectedPortfolio,
    dummyTableData,
    setPortfolioAllocationLabels,
    setRatingAllocationData,
    setRatingAllocationLabels,
    setMaturityAllocationData,
    setMaturityAllocationLabels
  ) => {
    const portfolioData = [];
    const portfolioAllocationLabels = [];
    const portfolioRatingData = [];
    const portfolioRatingLabels = [];
    const portfolioMaturityData = [];
    const portfolioMaturityLabels = [];

    dummyTableData[selectedPortfolio]?.map((item) => {
      //portfolioData.push(item.allocation);
      portfolioData.push(100 / dummyTableData[selectedPortfolio].length);
      portfolioAllocationLabels.push(item.BondID);
      portfolioRatingData.push(item.RecentBondRating);
      portfolioRatingLabels.push(item.BondID);
      portfolioMaturityData.push(
        parseFloat(item.BondYTMAtPriceDate).toFixed(2)
      );
      portfolioMaturityLabels.push(item.BondID);
    });

    console.log(dummyTableData);

    setPortfolioData(portfolioData);
    console.log("portfolio data:", portfolioData);
    setPortfolioAllocationLabels(portfolioAllocationLabels);
    // Get unique ratings so that there are no duplicates, sort them in increasing alphabetical order
    const uniqueRatingDataLabels = [...new Set(portfolioRatingData)].sort(
      (a, b) => a.localeCompare(b)
    );

    setRatingAllocationLabels(uniqueRatingDataLabels);

    // Counts of each rating
    const ratingCounts = uniqueRatingDataLabels.map((rating) => {
      return portfolioRatingData.filter((item) => item === rating).length;
    });
    setRatingAllocationData(ratingCounts);

    // Get unique maturities so that there are no duplicates
    const uniqueMaturityDataLabels = [...new Set(portfolioMaturityData)];
    setMaturityAllocationLabels(uniqueMaturityDataLabels);

    // Counts of each maturity
    const maturityCounts = uniqueMaturityDataLabels.map((maturity) => {
      return portfolioMaturityData.filter((item) => item === maturity).length;
    });
    setMaturityAllocationData(maturityCounts);
  };

  function handleClosePortfolioSettings() {
    setOpenPortfolioSettings(false);
  }

  function deletePortfolio() {
    delete dummyTableData[selectedPortfolio];
    setSelectedPortfolio(Object.keys(dummyTableData)[0]);
    setOpenPortfolioSettings(false);
  }

  function deleteBond(deletingRow) {
    const newTableData = dummyTableData[selectedPortfolio].filter(
      (row) => row.id !== deletingRow.id
    );
    dummyTableData[selectedPortfolio] = newTableData;
    setSelectedRow(-1);
  }

  useEffect(() => {
    renderPortfolioGraphs(
      setPortfolioAllocationData,
      selectedPortfolio,
      dummyTableData,
      setPortfolioAllocationLabels,
      setRatingAllocationData,
      setRatingAllocationLabels,
      setMaturityAllocationData,
      setMaturityAllocationLabels
    );
  }, [selectedPortfolio]);

  return (
    <Card style={{ height: "100%" }}>
      <CardContent
        style={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Select
            variant="outlined"
            fullWidth
            style={{ height: "30px", marginRight: "10px" }}
            value={selectedPortfolio}
            onChange={(e) => {
              setSelectedPortfolio(e.target.value);
              setSelectedRow(-1);
            }}
          >
            {Object.keys(dummyTableData).map((key) => (
              <MenuItem key={key} value={key}>
                {"Portfolio "}
                {key}
              </MenuItem>
            ))}
          </Select>
          <Dialog
            open={openPortfolioSettings}
            onClose={() => handleClosePortfolioSettings}
          >
            <Card>
              <CardHeader
                action={
                  <IconButton onClick={handleClosePortfolioSettings}>
                    <CloseOutlined />
                  </IconButton>
                }
                style={{ borderBottom: "1px solid #ccc", marginBottom: 0 }}
                title={"Portfolio Settings"}
              />
              <CardContent>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Select
                    variant="outlined"
                    fullWidth
                    style={{ height: "30px", marginRight: "10px" }}
                    value={selectedPortfolio}
                    onChange={(e) => {
                      setSelectedPortfolio(e.target.value);
                      setSelectedRow(-1);
                    }}
                  >
                    {Object.keys(dummyTableData).map((key) => (
                      <MenuItem key={key} value={key}>
                        Portfolio {key}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button
                    sx={{ color: "red", marginTop: "10px" }}
                    onClick={() => deletePortfolio(selectedPortfolio)}
                    disabled={Object.keys(dummyTableData).length === 1}
                  >
                    Delete Portfolio
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Dialog>
          <IconButton
            color="primary"
            style={{
              background: "#6466f1",
              borderRadius: "5px",
              width: "30px",
              height: "30px",
            }}
            onClick={() => setOpenPortfolioSettings(true)}
          >
            <SettingsIcon style={{ color: "white" }} />
          </IconButton>
        </div>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "5px",
              height: "32px",
              width: "100%",
            }}
          >
            <InputBase
              placeholder="Search"
              fullWidth
              style={{ fontSize: "14px", paddingLeft: "5px" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
        </div>

        <TableContainer
          component={Paper}
          style={{
            flex: 1,
            maxHeight: "calc(100% - 180px)",
            overflowY: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "15%" }}>ID</TableCell>
                <TableCell style={{ width: "25%" }}>Issuer</TableCell>
                <TableCell style={{ width: "30%" }}>Current Rating</TableCell>
                <TableCell style={{ width: "30%" }}>Predicted Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTableData?.map((row) => (
                <TableRow
                  key={row.BondID}
                  onClick={() => onRowClick(row)}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedRow.BondID === row.BondID
                        ? "#E0F0FF"
                        : "transparent",
                    "&:hover": {
                      backgroundColor:
                        selectedRow.BondID === row.BondID
                          ? "#E0F0FF"
                          : "#f5f5f5",
                    },
                  }}
                >
                  <TableCell style={{ width: "15%" }}>{row.BondID}</TableCell>
                  <TableCell style={{ width: "25%" }}>
                    {row.IssuerName}
                  </TableCell>
                  <TableCell style={{ width: "30%" }}>
                    {row.RecentBondRating}
                  </TableCell>
                  <TableCell style={{ width: "30%" }}>
                    {row.PredictedRating}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => deleteBond(row)}>
                      <RemoveCircleOutlined sx={{ color: "#007AF5" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
