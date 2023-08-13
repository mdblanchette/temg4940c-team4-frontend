import { Autocomplete, TextField } from "@mui/material";

const indicators = [
  "Corporate Income Tax Rate",
  "Current Account Balance",
  "GDP Per Capita",
  "Government Spending",
  "Short Term Interest Rate",
  "Unemployment Rate",
];

export default function IndicatorDropdown(props) {
  return (
    <Autocomplete
      disabled={props.disabled}
      options={indicators}
      renderInput={(params) => <TextField {...params} label={props.label} />}
      sx={{ width: "100%", marginRight: "16px" }}
      defaultValue={props.defaultValue}
      onChange={(e, option) => {
        if (option) props.setIndicator(option);
      }}
      disableClearable
    />
  );
}
