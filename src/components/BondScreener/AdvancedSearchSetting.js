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
import dayjs from "dayjs";

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

const AutocompleteChips = ({
  multiple,
  options,
  value,
  onSelectionChange,
  disableCloseOnSelect,
  renderOption,
  style,
  renderInput,
}) => {
  const [selectedItems, setSelectedItems] = useState(value || []);

  const handleCheckboxChange = (item, selected) => {
    let updatedSelection;
    if (selected) {
      updatedSelection = [...selectedItems, item];
    } else {
      updatedSelection = selectedItems.filter(
        (selectedItem) => selectedItem !== item
      );
    }

    setSelectedItems(updatedSelection);
    onSelectionChange(updatedSelection);
  };

  return (
    <Autocomplete
      multiple={multiple}
      options={options}
      value={selectedItems}
      onChange={(event, newValue) => {
        setSelectedItems(newValue);
        onSelectionChange(newValue);
      }}
      disableCloseOnSelect={disableCloseOnSelect}
      renderOption={(props, option, state) => (
        <li {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlank fontSize="small" />}
            checkedIcon={<CheckBox fontSize="small" />}
            style={{ marginRight: 8 }}
            checked={state.selected}
            onChange={(event) =>
              handleCheckboxChange(option, event.target.checked)
            }
          />
          {option}
        </li>
      )}
      style={style}
      renderInput={renderInput}
    />
  );
};

function AddColumn({ Title, Options, handleChange, inputValue }) {
  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <Typography>{Title}</Typography>
      <AutocompleteChips
        multiple
        options={Options}
        value={inputValue}
        onSelectionChange={handleChange}
        disableCloseOnSelect
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={<CheckBoxOutlineBlank fontSize="small" />}
              checkedIcon={<CheckBox fontSize="small" />}
              style={{ marginRight: 8 }}
              checked={selected}
              onChange={(event) =>
                handleCheckboxChange(option, event.target.checked)
              }
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

          {options && (
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={options.Up}
                    onChange={handleOptions}
                    name="Up"
                  />
                }
                label="Up"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={options.Down}
                    onChange={handleOptions}
                    name="Down"
                  />
                }
                label="Down"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={options.Stable}
                    onChange={handleOptions}
                    name="Stable"
                  />
                }
                label="Stable"
              />
            </FormGroup>
          )}
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default function AdvancedSetting({ searchFilter, handleUpdate }) {
  const creditRatings = [
    "All",
    "Aaa",
    "Aa1",
    "Aa2",
    "Aa3",
    "A1",
    "A2",
    "A3",
    "Baa1",
    "Baa2",
    "Baa3",
    "Ba1",
    "Ba2",
    "Ba3",
    "B1",
    "B2",
    "B3",
    "Caa1",
    "Caa2",
    "Caa3",
    "Ca",
    "C",
  ];

  const oecdCountries = [
    "All",
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
    "All",
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

  // state of variables shown on the Advanced Search card
  const [rateMigration, setRateMigration] = useState([0, 100]);
  const [changeSpread, setChangeSpread] = useState([10, 150]);
  const [liquidity, setLiquidity] = useState([3, 5]);
  const [issueDate, setIssueDate] = useState(dayjs().format());
  const [matureDate, setMatureDate] = useState(dayjs().format());
  const [maturity, setMaturity] = useState(30);
  const [creditRate, setCreditRate] = useState(["All"]);
  const [country, setCountry] = useState(["All"]);
  const [issuer, setIssuer] = useState(["All"]);
  const [ratingDirection, setRatingDirection] = useState({
    Up: true,
    Down: true,
    Stable: false,
  });
  const [spreadDirection, setSpreadDirection] = useState({
    Up: true,
    Down: true,
    Stable: false,
  });

  function handleRateMigrationChange(event, newValue) {
    setRateMigration(newValue);
  }

  function handleChangeSpread(event, newValue) {
    setChangeSpread(newValue);
  }

  function handleChangeLiquidity(event, newValue) {
    setLiquidity(newValue);
  }

  const handleRatingDirection = (event) => {
    const { name, checked } = event.target;

    setRatingDirection((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSpreadDirection = (event) => {
    const { name, checked } = event.target;

    setSpreadDirection((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  function handleInputChange() {
    const updatedFilter = {
      Issuer: issuer,
      Rating: creditRate,
      Country: country,
    };

    handleUpdate(updatedFilter);
  }

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={ThemeSetting} />
        <Stack spacing={4}>
          <Stack spacing={8} direction="row">
            <AddColumn
              Title="Credit Rating"
              Options={creditRatings}
              inputValue={creditRate}
              handleChange={(items) => setCreditRate(items)}
            />
            <AddColumn
              Title="Country"
              Options={oecdCountries}
              inputValue={country}
              handleChange={(items) => setCountry(items)}
            />
          </Stack>

          <Stack spacing={8} direction="row">
            <AddColumn
              Title="Issuer"
              Options={bondIssuers}
              inputValue={issuer}
              handleChange={(items) => setIssuer(items)}
            />
            <SliderColumn
              Title="Outstanding"
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
                  maxDate={dayjs(matureDate)}
                  value={dayjs(issueDate)}
                  onChange={(date) => setIssueDate(dayjs(date).format())}
                  renderInput={(props) => <TextField {...props} size="small" />}
                />
              </Stack>

              <Stack spacing={2} sx={{ width: "100%" }}>
                <Typography>Mature Date</Typography>
                <DatePicker
                  label="Select date"
                  minDate={dayjs(issueDate)}
                  value={dayjs(matureDate)}
                  onChange={(date) => setMatureDate(dayjs(date).format())}
                  renderInput={(props) => <TextField {...props} size="small" />}
                />
              </Stack>
            </Stack>
            <Stack spacing={1} direction="row">
              <Typography>Maturity (years): </Typography>
              <Input inputProps={{ type: "number", step: 1, min: 0 }} />
            </Stack>
          </Stack>

          <Stack spacing={8} direction="row">
            <SliderColumn
              Title="Predicted Migration Rate"
              inputValue={rateMigration}
              handleChange={handleRateMigrationChange}
              unit="%"
              options={ratingDirection}
              handleOptions={handleRatingDirection}
            />
            <SliderColumn
              Title="Predicted Change in Spread"
              inputValue={changeSpread}
              handleChange={handleChangeSpread}
              unit=" bp"
              options={spreadDirection}
              handleOptions={handleSpreadDirection}
            />
          </Stack>

          <Stack spacing={2} direction="row" justifyContent="center">
            <Button
              sx={{ minWidth: 100 }}
              variant="contained"
              onClick={handleInputChange}
            >
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
