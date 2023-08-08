import {
  Typography,
  Box,
  Stack,
  Button,
  Checkbox,
  Autocomplete,
  TextField,
  Slider,
  Input,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

import {
  createTheme,
  ThemeProvider,
  alpha,
  getContrastRatio,
} from "@mui/material/styles";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";

import { useState } from "react";

const blueBase = "#007AF5";

const ThemeSetting = createTheme({
  palette: {
    primary: {
      main: blueBase,
      light: alpha(blueBase, 0.5),
      dark: alpha(blueBase, 0.9),
      contrastText: getContrastRatio(blueBase, "#fff") > 4.5 ? "#fff" : "#111",
    },
  },
});

function AddColumn({ Title, Options, handleAdd, handleRemove }) {
  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <Typography>{Title}</Typography>
      <Autocomplete
        multiple
        options={Options}
        disableCloseOnSelect
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={<CheckBoxOutlineBlank fontSize="small" />}
              checkedIcon={<CheckBox fontSize="small" />}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </li>
        )}
        style={{ minWidth: 180 }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Type or choose here"
            variant="outlined"
          />
        )}
      />
    </Stack>
  );
}

function SliderColumn({
  Title,
  inputValue,
  unit,
  options,
  handleChange,
  handleOptions,
}) {
  return (
    <ThemeProvider theme={ThemeSetting}>
      <Stack spacing={1} sx={{ width: "100%" }}>
        <Typography>{Title}</Typography>
        <Slider
          value={inputValue}
          onChange={handleChange}
          valueLabelDisplay="auto"
          color="primary"
        />

        <Stack spacing="auto" direction="row">
          <Typography variant="body2">
            {inputValue[0]}
            {" - "}
            {inputValue[1]}
            {unit}
          </Typography>

          {options ? (
            <FormGroup row>
              {options.map((option) => (
                <FormControlLabel
                  key={option}
                  control={<Checkbox />}
                  value={option}
                  label={option}
                />
              ))}
            </FormGroup>
          ) : (
            ""
          )}
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default function AdvancedSetting() {
  const creditRatings = [
    "AAA",
    "AA+",
    "AA",
    "AA-",
    "A+",
    "A",
    "A-",
    "BBB+",
    "BBB",
    "BBB-",
    "BB+",
    "BB",
    "BB-",
    "B+",
    "B",
    "B-",
    "CCC+",
    "CCC",
    "CCC-",
    "CC",
    "C",
    "D",
  ];

  const oecdCountries = [
    "Australia",
    "Austria",
    "Belgium",
    "Canada",
    "Chile",
    "Czech Republic",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Iceland",
    "Ireland",
    "Israel",
    "Italy",
    "Japan",
    "Korea",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Mexico",
    "Netherlands",
    "New Zealand",
    "Norway",
    "Poland",
    "Portugal",
    "Slovak Republic",
    "Slovenia",
    "Spain",
    "Sweden",
    "Switzerland",
    "Turkey",
    "United Kingdom",
    "United States",
  ];

  const bondIssuers = [
    "JPMorgan Chase",
    "Bank of America",
    "Citigroup",
    "Wells Fargo",
    "Goldman Sachs",
    "Morgan Stanley",
    "HSBC Holdings",
    "Industrial and Commercial Bank of China",
    "China Construction Bank",
    "Bank of China",
    "Berkshire Hathaway",
    "BNP Paribas",
    "UBS Group",
    "Credit Suisse Group",
    "Barclays",
    "Royal Bank of Scotland",
    "Societe Generale",
    "Deutsche Bank",
    "Mitsubishi UFJ Financial Group",
    "Sumitomo Mitsui Financial Group",
  ];

  const [rateMigration, setRateMigration] = useState([0, 100]);
  const [changeSpread, setChangeSpread] = useState([10, 150]);
  const [liquidity, setLiquidity] = useState([2.4, 5]);
  //const [issueDate, setIssueDate] = useState(format(new Date(), "MM/dd/yyyy"));
  const [issueDate, setIssueDate] = useState(null);
  const [matureDate, setMatureDate] = useState(null);
  // const [matureDate, setMatureDate] = useState(
  //   format(new Date(), "MM/dd/yyyy")
  // );

  function handleRateMigrationChange(event, newValue) {
    setRateMigration(newValue);
  }

  function handleChangeSpread(event, newValue) {
    setChangeSpread(newValue);
  }

  function handleChangeLiquidity(event, newValue) {
    setLiquidity(newValue);
  }

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={ThemeSetting} />
        <Stack spacing={2}>
          <Stack spacing={8} direction="row">
            <AddColumn Title="Credit Rating" Options={creditRatings} />
            <AddColumn Title="Country" Options={oecdCountries} />
          </Stack>

          <Stack spacing={8} direction="row">
            <AddColumn Title="Issuer" Options={bondIssuers} />
            <SliderColumn
              Title="Liquidity"
              inputValue={liquidity}
              handleChange={handleChangeLiquidity}
              unit="B"
            />
          </Stack>

          <Stack spacing={1}>
            <Stack spacing={8} direction="row">
              <Stack spacing={1} sx={{ width: "100%" }}>
                <Typography>Issue Date</Typography>
                <DatePicker
                  label="Select date"
                  maxDate={matureDate}
                  value={issueDate}
                  onChange={(date) => setIssueDate(date)}
                  renderInput={(props) => <TextField {...props} size="small" />}
                />
              </Stack>

              <Stack spacing={1} sx={{ width: "100%" }}>
                <Typography>Mature Date</Typography>
                <DatePicker
                  label="Select date"
                  minDate={issueDate}
                  value={matureDate}
                  onChange={(date) => setMatureDate(date)}
                  renderInput={(props) => <TextField {...props} size="small" />}
                />
              </Stack>
            </Stack>
            <Stack spacing={1} direction="row">
              <Typography variant="body1">Maturity (years): </Typography>
              <Input inputProps={{ type: "number", step: 1, min: 0 }} />
            </Stack>
          </Stack>

          <Stack spacing={8} direction="row">
            <SliderColumn
              Title="Predicted Migration Rate"
              inputValue={rateMigration}
              handleChange={handleRateMigrationChange}
              unit="%"
              options={["Up", "Down", "Stable"]}
            />
            <SliderColumn
              Title="Predicted Change in Spread"
              inputValue={changeSpread}
              handleChange={handleChangeSpread}
              unit=" bp"
              options={["Up", "Down", "Stable"]}
            />
          </Stack>

          <Stack spacing={2} direction="row" justifyContent="center">
            <Button sx={{ minWidth: 100 }} variant="contained">
              Search
            </Button>
            <Button sx={{ minWidth: 100, color: "primary" }} variant="outlined">
              Clear
            </Button>
          </Stack>
        </Stack>
        <ThemeProvider theme={ThemeSetting} />
      </LocalizationProvider>
    </Box>
  );
}
