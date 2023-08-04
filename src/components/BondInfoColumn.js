import {
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Pagination,
  Stack,
  Button,
  Dialog,
  Chip,
  Select,
  MenuItem,
  Slider,
} from "@mui/material";

import {
  SettingsOutlined,
  AddCircleOutlined,
  CloseOutlined,
  AddOutlined,
} from "@mui/icons-material";
import { useState, useEffect } from "react";

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

export default function BondInfoColumn() {
  // bondDatas = Array of each bond's complete information (regardless users choose to show it or not)
  const bondDatas = [
    createBondData(
      "Bond A",
      "United States",
      "JP Morgan Chase Co.",
      "A+",
      0.05,
      0.002,
      0.95,
      "2.5%",
      "10/01/2030",
      "2.35%",
      "2.44%",
      "0.01%",
      "Financial"
    ),
    createBondData(
      "Bond B",
      "United States",
      "Goldman Sachs",
      "A",
      0.1,
      0.003,
      0.9,
      "2.8%",
      "05/01/2033",
      "2.70%",
      "2.73%",
      "0.02%",
      "Financial"
    ),
    createBondData(
      "Bond C",
      "United Kingdom",
      "Barclays PLC",
      "A-",
      0.07,
      0.001,
      0.85,
      "3.2%",
      "06/01/2035",
      "3.05%",
      "3.16%",
      "0.02%",
      "Financial"
    ),
    createBondData(
      "Bond D",
      "Hong Kong",
      "HSBC Holdings",
      "A",
      0.12,
      0.004,
      0.92,
      "2.7%",
      "07/01/2032",
      "2.65%",
      "2.74%",
      "0.02%",
      "Financial"
    ),
    createBondData(
      "Bond E",
      "Switzerland",
      "UBS Group AG",
      "A-",
      0.09,
      0.002,
      0.88,
      "3.0%",
      "09/01/2031",
      "2.88%",
      "2.93%",
      "0.02%",
      "Financial"
    ),
  ];

  // list of categories
  const categories = [
    "Name",
    "Group",
    "Issuer",
    "Rating",
    "Migration",
    "Spread",
    "Confidence",
    "Coupon",
    "maturityDate",
    "Bid",
    "Ask",
    "netChange",
    "Sector",
  ];

  // list of chosen parameters
  const [chosenParameters, setChosenParameters] = useState([
    "Name",
    "Issuer",
    "Rating",
    "Migration",
    "Spread",
    "Confidence",
    "Coupon",
    "maturityDate",
    "Bid",
    "Ask",
  ]);

  function handleParameterChange(updatedParametersList) {
    setChosenParameters(updatedParametersList);
  }

  const [page, setPage] = useState(0);
  const [chosenAlert, setChosenAlert] = useState(
    "Based on Predicted Rating Migration"
  );
  const [valueAlert, setValueAlert] = useState([1, 10]);
  //const [rowPage, setRowPage] = useState(5);
  const [openParameterModal, setOpenParameterModal] = useState(false);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }
  function handleValueAlertChange(event, newValue) {
    setValueAlert(newValue);
  }

  //   function handleChangeRowsPerPage(event) {
  //     setRowPage(parseInt(event.target.value, 10));
  //     setPage(0);
  //   }

  function handleClickSetting() {
    setOpenParameterModal(false);
  }

  function ParameterModal({ change }) {
    function addParameter(category) {
      if (!chosenParameters.includes(category)) {
        const updatedChosenParameters = categories.filter((param) => {
          return chosenParameters.includes(param) || param === category;
        });

        change(updatedChosenParameters);
      }
    }

    const handleRemove = (categoryToDelete) => () => {
      const updatedChosenParameters = chosenParameters.filter(
        (category) => category !== categoryToDelete
      );

      change(updatedChosenParameters);
    };

    return (
      <Card>
        <CardContent>
          <Stack spacing={4}>
            <Stack spacing={1}>
              <Stack
                direction="row"
                spacing="auto"
                sx={{ alignItems: "center" }}
              >
                <Typography variant="body1">
                  Choose metrics to be shown in column
                </Typography>
                <IconButton onClick={handleClickSetting}>
                  <CloseOutlined />
                </IconButton>
              </Stack>

              <Stack spacing={1} direction="row">
                {categories.map((category) => {
                  if (chosenParameters.includes(category)) {
                    return (
                      <Chip
                        key={category}
                        variant="outlined"
                        label={
                          category.toLowerCase() === "maturitydate"
                            ? "Maturity"
                            : category.toLowerCase() === "netchange"
                            ? "Net Change"
                            : category
                        }
                        onDelete={handleRemove(category)}
                      />
                    );
                  }
                })}
              </Stack>

              <Stack spacing={1} direction="row">
                {categories.map((category) => {
                  if (!chosenParameters.includes(category)) {
                    return (
                      <Chip
                        icon={<AddOutlined />}
                        key={category}
                        variant="outlined"
                        label={
                          category.toLowerCase() === "maturitydate"
                            ? "Maturity"
                            : category.toLowerCase() === "netchange"
                            ? "Net Change"
                            : category
                        }
                        onClick={() => addParameter(category)}
                      />
                    );
                  }
                })}
              </Stack>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="body1">Change alert setting</Typography>
              <Select
                value={chosenAlert}
                onChange={(event) => setChosenAlert(event.target.value)}
              >
                <MenuItem value="Based on Predicted Rating Migration">
                  Based on Predicted Rating Migration
                </MenuItem>
                <MenuItem value="Based on Predicted Change in Spread">
                  Based on Predicted Change in Spread
                </MenuItem>
              </Select>

              <Stack spacing={1} sx={{ width: "100%" }}>
                <Slider
                  value={valueAlert}
                  onChange={handleValueAlertChange}
                  valueLabelDisplay="auto"
                  color="secondary"
                />
                <Typography variant="body2">
                  {valueAlert[0]}
                  {" - "}
                  {valueAlert[1]}
                  {"%"}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Stack spacing={2}>
      {/* title of table */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Basic Information
        </Typography>

        <IconButton onClick={() => setOpenParameterModal(true)}>
          <SettingsOutlined />
        </IconButton>

        <Dialog
          open={openParameterModal}
          close={handleClickSetting}
          maxWidth="lg"
        >
          <ParameterModal change={handleParameterChange} />
        </Dialog>
      </Box>

      <TableContainer>
        <Table>
          {/* head of table */}
          <TableHead>
            <TableRow>
              {chosenParameters.map((parameter) => (
                <TableCell key={parameter} align="left">
                  {parameter.toLowerCase() === "maturitydate"
                    ? "Maturity"
                    : parameter.toLowerCase() === "netchange"
                    ? "Net Change"
                    : parameter}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* content of table */}
          <TableBody>
            {bondDatas.map((data) => (
              <TableRow key={data.Name}>
                {chosenParameters.map((category) => (
                  <TableCell
                    key={data[category]}
                    align="left"
                    style={{
                      color:
                        category === "Migration" || category === "Spread"
                          ? data[category] > 0.099
                            ? "#0EA371"
                            : "#DC4A41"
                          : "default",
                    }}
                  >
                    {data[category]}
                  </TableCell>
                ))}
                <TableCell key="addOption">
                  <IconButton>
                    <AddCircleOutlined sx={{ color: "#007AF5" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* end of table, pagination */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" sx={{ flexGrow: 1 }}>
          {bondDatas.length} Bonds Total
        </Typography>
        <Pagination
          count={bondDatas.length}
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChangePage}
        />
      </Box>
    </Stack>
  );
}
