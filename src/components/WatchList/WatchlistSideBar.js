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
import {
  AddCircleOutlined,
  CloseOutlined,
  RemoveCircleOutlineOutlined,
  RemoveCircleOutlined,
} from "@mui/icons-material";

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
  const [settingSelectedPortfolio, setSettingSelectedPortfolio] = useState();

  // Filter table data based on search query
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
              setSelectedRow(-1);
            }}
          >
            {Object.keys(dummyTableData).map((key) => (
              <MenuItem key={key} value={key}>
                Portfolio {parseInt(key)}
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
                    style={{ height: "30px", marginTop: 0 }}
                    value={selectedPortfolio}
                    onChange={(e) => {
                      setSettingSelectedPortfolio(e.target.value);
                    }}
                  >
                    {Object.keys(dummyTableData).map((key) => (
                      <MenuItem key={key} value={key}>
                        Portfolio {parseInt(key)}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button
                    sx={{ color: "red", marginTop: "10px" }}
                    onClick={() => deletePortfolio(settingSelectedPortfolio)}
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
                <TableCell style={{ width: "35%" }}>Name</TableCell>
                <TableCell style={{ width: "35%" }}>ISSUER</TableCell>
                <TableCell style={{ width: "5%" }}>RAT</TableCell>
                <TableCell style={{ width: "15%" }}>MIG</TableCell>
                <TableCell style={{ width: "10%" }} />
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
                      selectedRow.id === row.id ? "#d8d3f5" : "transparent",
                    "&:hover": {
                      backgroundColor:
                        selectedRow.id === row.id ? "#d8d3f5" : "#f5f5f5",
                    },
                  }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.issuer}</TableCell>
                  <TableCell>{row.rating}</TableCell>
                  <TableCell>{row.migration}</TableCell>
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
