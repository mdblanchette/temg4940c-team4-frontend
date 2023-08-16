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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { set } from "date-fns";

export default function WatchlistSideBar({
  selectedRow,
  onRowClick,
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

  const filteredTableData = dummyTableData[selectedPortfolio].filter((row) => {
    const lowerSearchQuery = searchQuery.toLowerCase();
    return (
      row.name.toLowerCase().includes(lowerSearchQuery) ||
      row.issuer.toLowerCase().includes(lowerSearchQuery) ||
      row.rating.toLowerCase().includes(lowerSearchQuery) ||
      row.migration.toLowerCase().includes(lowerSearchQuery)
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
    dummyTableData[selectedPortfolio].map((item) => {
      portfolioData.push(item.allocation);
      portfolioAllocationLabels.push(item.name);
      portfolioRatingData.push(item.rating);
      portfolioRatingLabels.push(item.name);
      portfolioMaturityData.push(item.maturity);
      portfolioMaturityLabels.push(item.name);
    });

    setPortfolioData(portfolioData);
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
    <Card style={{ width: "400px", height: "100%" }}>
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
            }}
          >
            {Object.keys(dummyTableData).map((key) => (
              <MenuItem key={key} value={key}>
                Portfolio {parseInt(key)}
              </MenuItem>
            ))}
          </Select>
          <IconButton
            color="primary"
            style={{
              background: "blue",
              borderRadius: "5px",
              width: "30px",
              height: "30px",
            }}
          >
            <AddIcon style={{ color: "white" }} />
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "5px",
            marginBottom: "30px",
          }}
        >
          <Button variant="outlined" color="primary" style={{ width: "48%" }}>
            Modify Portfolio
          </Button>
          <Button variant="outlined" color="secondary" style={{ width: "48%" }}>
            Delete Portfolio
          </Button>
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
                <TableCell style={{ width: "35%" }}>Name</TableCell>
                <TableCell style={{ width: "35%" }}>Issuer</TableCell>
                <TableCell style={{ width: "15%" }}>Rating</TableCell>
                <TableCell style={{ width: "15%" }}>Migration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTableData.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => onRowClick(row)}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedRow === row.id ? "#d8d3f5" : "transparent",
                    "&:hover": {
                      backgroundColor:
                        selectedRow === row.id ? "#d8d3f5" : "#f5f5f5",
                    },
                  }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.issuer}</TableCell>
                  <TableCell>{row.rating}</TableCell>
                  <TableCell>{row.migration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
