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
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

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

export default function BondInfoTable({ searchFilter }) {
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

  const countryInfo = [
    { name: "Australia", code: "AUS" },
    { name: "Austria", code: "AUT" },
    { name: "Belgium", code: "BEL" },
    { name: "Canada", code: "CAN" },
    { name: "Chile", code: "CHL" },
    { name: "Czechia", code: "CZE" },
    { name: "Denmark", code: "DNK" },
    { name: "Estonia", code: "EST" },
    { name: "Finland", code: "FIN" },
    { name: "France", code: "FRA" },
    { name: "Germany", code: "DEU" },
    { name: "Greece", code: "GRC" },
    { name: "Hungary", code: "HUN" },
    { name: "Iceland", code: "ISL" },
    { name: "Ireland", code: "IRL" },
    { name: "Israel", code: "ISR" },
    { name: "Italy", code: "ITA" },
    { name: "Japan", code: "JPN" },
    { name: "Korea", code: "KOR" },
    { name: "Latvia", code: "LVA" },
    { name: "Lithuania", code: "LTU" },
    { name: "Luxembourg", code: "LUX" },
    { name: "Mexico", code: "MEX" },
    { name: "Netherlands", code: "NLD" },
    { name: "New Zealand", code: "NZL" },
    { name: "Norway", code: "NOR" },
    { name: "Poland", code: "POL" },
    { name: "Portugal", code: "PRT" },
    { name: "Slovakia", code: "SVK" },
    { name: "Slovenia", code: "SVN" },
    { name: "Spain", code: "ESP" },
    { name: "Sweden", code: "SWE" },
    { name: "Switzerland", code: "CHE" },
    { name: "Turkey", code: "TUR" },
    { name: "United Kingdom", code: "GBR" },
    { name: "United States of America", code: "USA" },
  ];

  function getCountryNameFromCode(code) {
    const country = countryInfo.find((country) => country.code === code);
    return country ? country.name : null;
  }

  function getCountryCodeFromName(name) {
    const country = countryInfo.find((country) => country.name === name);
    return country ? country.code : null;
  }

  const [isBondAdded, setIsBondAdded] = useState(false);
  const portfolioOption = ["Portfolio A", "Portfolio B", "New Portfolio"];
  const [chosenBond, setChosenBond] = useState();
  const [displayedBond, setDisplayedBond] = useState([]);
  const apiEndPoint = "http://localhost:3500/";

  //dummy function for now, the idea is to get the value of the selected row/bond and later use it for Watchlist/other
  function handleAddRow(rowData) {
    //setSelectedRows((prevRows) => [...prevRows, rowData]);
    console.log(rowData);
    setChosenBond(rowData);
    setIsBondAdded(true);
  }

  function AddBondModal() {
    return (
      <Card>
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

  useEffect(() => {
    const getBondDatas = async () => {
      let allDataEndPoint = apiEndPoint + "bond";
      const { data: res } = await axios.get(allDataEndPoint);
      setDisplayedBond(res);
    };
    getBondDatas();
  }, []);

  // list of categories
  // const categories = [
  //   { field: "Name", headerName: "Name" },
  //   { field: "Group", headerName: "Group" },
  //   { field: "Issuer", headerName: "Issuer", width: 200 },
  //   { field: "Rating", headerName: "Rating" },
  //   {
  //     field: "Migration",
  //     headerName: "Migration",
  //     renderCell: (params) => (
  //       <span style={{ color: params.value > 0 ? "#0EA371" : "#DC4A41" }}>
  //         {params.value > 0 ? "+" : ""}
  //         {params.value * 100}
  //         {"%"}
  //       </span>
  //     ),
  //   },
  //   {
  //     field: "Spread",
  //     headerName: "Spread",
  //     renderCell: (params) => (
  //       <span style={{ color: params.value > 0 ? "#0EA371" : "#DC4A41" }}>
  //         {params.value > 0 ? "+" : ""}
  //         {params.value}
  //         {" bp"}
  //       </span>
  //     ),
  //   },
  //   { field: "Confidence", headerName: "Confidence" },
  //   { field: "Coupon", headerName: "Coupon" },
  //   { field: "maturityDate", headerName: "Maturity Date", width: 150 },
  //   { field: "Bid", headerName: "Bid" },
  //   { field: "Ask", headerName: "Ask" },
  //   { field: "netChange", headerName: "Net Change" },
  //   { field: "Sector", headerName: "Sector" },
  //   {
  //     field: "actions",
  //     headerName: "Save Bond",
  //     type: "actions",
  //     align: "center",
  //     renderCell: (params) => (
  //       <IconButton onClick={() => handleAddRow(params.row)}>
  //         <AddCircleOutlined sx={{ color: "#007AF5" }} />
  //       </IconButton>
  //     ),
  //   },
  // ];

  useEffect(() => {
    if (!searchFilter) {
      // Handle the case when the searchFilter is not available
      console.log("N/A");
      return;
    }

    console.log(searchFilter);

    const getSpecificBondDatas = async () => {
      const rawResponse = await fetch("http://localhost:3500/credit/bonds", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ countries: ["USA"] }),
      });

      const res = await rawResponse.json();

      //console.log(content);

      // const getSpecificBondDatas = async () => {
      //   const { data: res } = await axios.post(apiEndPoint + "credit/bonds", {
      //     countries: ["USA", "CAN"],
      //     ratings: ["A1", "A2"],
      //     // ...(searchFilter.Country?.includes("All")
      //     //   ? {}
      //     //   : { countries: searchFilter.Country }),
      //     // ...(searchFilter.Rating?.includes("All")
      //     //   ? {}
      //     //   : { ratings: searchFilter.Rating }),
      //     // ...(searchFilter.Issuer?.includes("All")
      //     //   ? {}
      //     //   : { issuers: searchFilter.Issuer }),
      //   });

      setDisplayedBond(res);
      console.log("Filtered Bonds:", res);
    };

    getSpecificBondDatas();
  }, [searchFilter]);

  const categories = [
    { field: "BondID", headerName: "Bond ID", width: 140 },
    {
      field: "Company Headquarter",
      headerName: "Country",
      width: 140,
      renderCell: (params) => getCountryNameFromCode(params.value),
    },
    { field: "MoodysRating", headerName: "Credit Rating", width: 160 },
    { field: "Issuer", headerName: "Issuer", width: 240 },
    { field: "MoodyIssuerRating", headerName: "Issuer Rating", width: 140 },
    {
      field: "IssueDate",
      headerName: "Issue Date",
      //valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
    }, //DD/MM/YYY format
    {
      field: "Maturity",
      headerName: "Mature Date",
      //valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
    },
    {
      field: "CouponRate",
      headerName: "Coupon Rate",
      valueFormatter: (params) => parseFloat(params.value),
      type: "number",
      width: 120,
    },
    { field: "FaceOutstanding", headerName: "Outstanding" },
    {
      field: "Actions",
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
      {/* {searchFilter && searchFilter.Country && (
        <Typography>{searchFilter.Country}</Typography>
      )} */}
      <CardContent>
        <DataGrid
          loader
          rows={displayedBond}
          columns={categories}
          disableRowSelectionOnClick
          getRowId={(row) => row.PermID}
          defaultViewOptions={25}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
            columns: { columnVisibilityModel: { BondID: false } },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          components={{
            Header: () => (
              <div
                style={{
                  backgroundColor: "#f2f2f2",
                  fontWeight: "bold",
                  textAlign: "left",
                  padding: "10px",
                }}
              >
                Custom Header
              </div>
            ),
          }}
          // initialState={{
          //   columns: {
          //     columnVisibilityModel: {
          //       Group: false,
          //       netChange: false,
          //       Sector: false,
          //     },
          //   },
          // }}
        />
      </CardContent>

      <Dialog
        open={isBondAdded}
        close={handleClickSetting}
        maxWidth="lg"
        fullWidth
      >
        <AddBondModal
          portfolios={portfolioOption}
          handleClose={handleClickSetting}
        />
      </Dialog>
    </Card>
  );
}
