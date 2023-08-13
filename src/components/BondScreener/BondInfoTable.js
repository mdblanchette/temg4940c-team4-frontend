import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  TextField,
  MenuItem,
  Dialog,
  Grid,
  Stack,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { AddCircleOutlined, CloseOutlined } from "@mui/icons-material";
import { useState } from "react";

function createBondData(
  Name,
  Group,
  Issuer,
  Rating,
  Migration,
  Spread,
  Confidence,
  Coupon,
  maturityDate,
  Bid,
  Ask,
  netChange,
  Sector
) {
  return {
    Name,
    Group,
    Issuer,
    Rating,
    Migration,
    Spread,
    Confidence,
    Coupon,
    maturityDate,
    Bid,
    Ask,
    netChange,
    Sector,
  };
}

export default function BondInfoTable() {
  const [isBondAdded, setIsBondAdded] = useState(false);
  const portfolioOption = ["Portfolio A", "Portfolio B", "New Portfolio"];
  const [chosenBond, setChosenBond] = useState();

  //dummy function for now, the idea is to get the value of the selected row/bond and later use it for Watchlist/other
  function handleAddRow(rowData) {
    //setSelectedRows((prevRows) => [...prevRows, rowData]);
    console.log(rowData);
    setChosenBond(rowData);
    setIsBondAdded(true);
  }

  function AddBondModal() {
    return (
      <Card sx={{ width: "60vw" }}>
        <CardHeader
          action={
            <IconButton onClick={handleClickSetting}>
              <CloseOutlined />
            </IconButton>
          }
          title="Bond Prediction"
        />
        <CardContent>
          <Stack spacing={4}>
            <Grid container>
              <Grid item xs={4}>
                <Stack spacing={1}>
                  <Typography>Bond Name</Typography>
                  <Typography variant="h5">{chosenBond.Name}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={6}>
                <Stack spacing={1}>
                  <Typography>Bond Issuer</Typography>
                  <Typography variant="h5">{chosenBond.Issuer}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={2}>
                <Stack spacing={1}>
                  <Typography>Bond Rating</Typography>
                  <Typography variant="h5">{chosenBond.Rating}</Typography>
                </Stack>
              </Grid>
            </Grid>

            <Stack spacing={2} direction="row">
              <Typography>Add to </Typography>
              <TextField select size="small" variant="standard">
                {portfolioOption.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <Button onClick={handleClickSetting} variant="contained">
              Save Bond
            </Button>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  function handleClickSetting() {
    setIsBondAdded(false);
  }

  // bondDatas = Array of each bond's complete information (regardless users choose to show it or not)
  const bondDatas = [
    createBondData(
      "Bond A",
      "United States",
      "JP Morgan Chase Co.",
      "A+",
      0.201,
      -20,
      "95%",
      "2.5%",
      "10/01/2030",
      "2.44%",
      "2.35%",
      "0.01%",
      "Financial"
    ),
    createBondData(
      "Bond B",
      "United States",
      "Goldman Sachs",
      "A",
      -0.13,
      15,
      "74%",
      "2.8%",
      "05/01/2033",
      "2.73%",
      "2.70%",
      "0.02%",
      "Financial"
    ),
    createBondData(
      "Bond C",
      "United Kingdom",
      "Barclays PLC",
      "A-",
      0.076,
      -11,
      "81.3%",
      "3.2%",
      "06/01/2035",
      "3.16%",
      "3.05%",
      "0.02%",
      "Financial"
    ),
    createBondData(
      "Bond D",
      "Hong Kong",
      "HSBC Holdings",
      "A",
      -0.32,
      45,
      "68.8%",
      "2.7%",
      "07/01/2032",
      "2.74%",
      "2.65%",
      "0.02%",
      "Financial"
    ),
    createBondData(
      "Bond E",
      "Switzerland",
      "UBS Group AG",
      "A-",
      0.24,
      -22,
      "87.3%",
      "3.0%",
      "09/01/2031",
      "2.93%",
      "2.88%",
      "0.02%",
      "Financial"
    ),
  ];

  // list of categories
  const categories = [
    { field: "Name", headerName: "Name" },
    { field: "Group", headerName: "Group" },
    { field: "Issuer", headerName: "Issuer", width: 200 },
    { field: "Rating", headerName: "Rating" },
    {
      field: "Migration",
      headerName: "Migration",
      renderCell: (params) => (
        <span style={{ color: params.value > 0 ? "#0EA371" : "#DC4A41" }}>
          {params.value > 0 ? "+" : ""}
          {params.value * 100}
          {"%"}
        </span>
      ),
    },
    {
      field: "Spread",
      headerName: "Spread",
      renderCell: (params) => (
        <span style={{ color: params.value > 0 ? "#0EA371" : "#DC4A41" }}>
          {params.value > 0 ? "+" : ""}
          {params.value}
          {" bp"}
        </span>
      ),
    },
    { field: "Confidence", headerName: "Confidence" },
    { field: "Coupon", headerName: "Coupon" },
    { field: "maturityDate", headerName: "Maturity Date", width: 150 },
    { field: "Bid", headerName: "Bid" },
    { field: "Ask", headerName: "Ask" },
    { field: "netChange", headerName: "Net Change" },
    { field: "Sector", headerName: "Sector" },
    {
      field: "actions",
      headerName: "Save Bond",
      type: "actions",
      align: "center",
      renderCell: (params) => (
        <IconButton onClick={() => handleAddRow(params.row)}>
          <AddCircleOutlined sx={{ color: "#007AF5" }} />
        </IconButton>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader title="Basic Information" />

      <CardContent>
        <DataGrid
          rows={bondDatas}
          columns={categories}
          disableRowSelectionOnClick
          getRowId={(row) => row.Name}
          initialState={{
            columns: {
              columnVisibilityModel: {
                Group: false,
                netChange: false,
                Sector: false,
              },
            },
          }}
        />
      </CardContent>

      <Dialog open={isBondAdded} close={handleClickSetting} maxWidth="md">
        <AddBondModal
          portfolios={portfolioOption}
          handleClose={handleClickSetting}
        />
      </Dialog>
    </Card>
  );
}
