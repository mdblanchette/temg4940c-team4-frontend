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
} from "@mui/material";

import {
  SettingsOutlined,
  AddCircleOutlined,
  CloseOutlined,
  AddOutlined,
} from "@mui/icons-material";
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

export default function BondInfoColumn() {
  // bondDatas = Array of each bond's complete information (regardless users choose to show it or not)
  const bondDatas = [
    createBondData(
      "JP Morgan Chase Co.",
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
      "Goldman Sachs",
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
      "Barclays PLC",
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
      "HSBC Holdings",
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
      "UBS Group AG",
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
  //const [rowPage, setRowPage] = useState(5);
  const [openParameterModal, setOpenParameterModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  //   function handleChangeRowsPerPage(event) {
  //     setRowPage(parseInt(event.target.value, 10));
  //     setPage(0);
  //   }

  function handleClickSetting() {
    setOpenParameterModal(false);
  }

  function ParameterModal() {
    function addParameter(category) {
      const updatedChosenParameters = categories.filter(
        (category) => [...chosenParameters, category].indexOf(category) !== -1
      );

      //handleParameterChange(updatedChosenParameters);
      //setChosenParameters((prevCategories) => [...prevCategories, category]);
    }

    const handleRemove = (categoryToDelete) => () => {
      // setChosenParameters((prevCategories) =>
      //   prevCategories.filter((category) => category !== categoryToDelete)
      // );

      const updatedChosenParameters = chosenParameters.filter(
        (category) => category !== categoryToDelete
      );

      handleParameterChange(updatedChosenParameters);
    };

    return (
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Stack direction="row" spacing="auto" sx={{ alignItems: "center" }}>
              <Typography variant="body1">
                Choose metrics to be shown in column
              </Typography>
              <IconButton onClick={handleClickSetting}>
                <CloseOutlined />
              </IconButton>
            </Stack>

            <Stack spacing={1} direction="row">
              {chosenParameters.map((category) => (
                <Chip
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
              ))}
            </Stack>

            <Stack spacing={1} direction="row">
              {categories
                .filter((category) => !chosenParameters.includes(category))
                .map((category) => (
                  <Chip
                    icon={<AddOutlined />}
                    variant="outlined"
                    label={
                      category.toLowerCase() === "maturitydate"
                        ? "Maturity"
                        : category.toLowerCase() === "netchange"
                        ? "Net Change"
                        : category
                    }
                    onClick={addParameter(category)}
                  />
                ))}
            </Stack>

            {/* <Typography variant="body1">Change alert setting</Typography> */}
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
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
              Bond Information
            </Typography>

            <IconButton onClick={() => setOpenParameterModal(true)}>
              <SettingsOutlined />
            </IconButton>

            <Dialog
              open={openParameterModal}
              close={handleClickSetting}
              maxWidth="lg"
            >
              <ParameterModal />
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
      </CardContent>
    </Card>
  );
}
