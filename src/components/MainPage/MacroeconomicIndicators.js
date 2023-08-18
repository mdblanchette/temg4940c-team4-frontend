import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import MacroChart from "./MacroChart";
import IndicatorDropdown from "./IndicatorDropdown";
import { useEffect, useState } from "react";

export default function MacroeconomicIndicators({
  selectedCountry,
  selectedCountryCode,
  selectedCountryFlag,
}) {
  const [timeframe, setTimeframe] = useState("Latest");
  const [indicatorA, setIndicatorA] = useState("Government Spending");
  const [indicatorB, setIndicatorB] = useState("Current Account Balance");
  const [indicatorA_Data, setIndicatorA_Data] = useState([]);
  const [indicatorB_Data, setIndicatorB_Data] = useState([]);
  const [indicator1, setIndicator1] = useState("Corporate Income Tax Rate");
  const [indicator2, setIndicator2] = useState("Current Account Balance");
  const [indicator3, setIndicator3] = useState("GDP Per Capita");
  const [indicator4, setIndicator4] = useState("Government Spending");
  const [indicator5, setIndicator5] = useState("Short Term Interest Rate");
  const [indicator6, setIndicator6] = useState("Unemployment Rate");
  const [macroData1, setMacroData1] = useState("N/A");
  const [macroData2, setMacroData2] = useState("N/A");
  const [macroData3, setMacroData3] = useState("N/A");
  const [macroData4, setMacroData4] = useState("N/A");
  const [macroData5, setMacroData5] = useState("N/A");
  const [macroData6, setMacroData6] = useState("N/A");
  const [prevMacroData1, setPrevMacroData1] = useState("");
  const [prevMacroData2, setPrevMacroData2] = useState("");
  const [prevMacroData3, setPrevMacroData3] = useState("");
  const [prevMacroData4, setPrevMacroData4] = useState("");
  const [prevMacroData5, setPrevMacroData5] = useState("");
  const [prevMacroData6, setPrevMacroData6] = useState("");

  const time_period = ["Latest", "1 Year", "2 Years", "5 Years", "10 Years"];
  const current_year = 2023;
  const indicators = [
    {
      title: "Corporate Income Tax Rate",
      interval: "yearly", // eg 2000, 2001, 2002...
    },
    {
      title: "Current Account Balance",
      interval: "quaterly", // eg 2000-Q1, 2000-Q2, 2000-Q3...
    },
    {
      title: "GDP Per Capita",
      interval: "yearly", // eg 2000, 2001, 2002...
    },
    {
      title: "Government Spending",
      interval: "yearly", // eg 2000, 2001, 2002...
    },
    {
      title: "Short Term Interest Rate",
      interval: "monthly-num", // eg 2000-06-01, 2000-07-01, 2000-08-01...
    },
    {
      title: "Unemployment Rate",
      interval: "monthly-word", // eg Sep-05, Oct-05, Nov-05...
    },
    {
      title: "Consumer Price Index",
      interval: "monthly-num", // eg 2000-06-01, 2000-07-01, 2000-08-01...
    },
    {
      title: "Government Debt to GDP",
      interval: "monthly-num", // eg 2000-06-01, 2000-07-01, 2000-08-01...
    },
  ];

  async function getMacroData(selectedCountryCode, indicator) {
    const fetch_link =
      "http://35.220.165.226/api/macro/" +
      convertTitleToKey(indicator) +
      "/" +
      selectedCountryCode;
    const res = await fetch(fetch_link);
    const parsed_res = await res.json();
    return parsed_res;
  }

  const renderGraphData = async (setIndicator_Data, indicator) => {
    const data = await getMacroData(selectedCountryCode, indicator);

    // Check how the data stores its time periods
    let interval = indicators.find((i) => i.title === indicator).interval;

    // Get all data from the last 10 years
    let graphData = [];
    if (interval === "yearly") {
      for (let i = current_year - 1; i > current_year - 11; i--) {
        if (data[i.toString()]) graphData.unshift(data[i.toString()]);
      }
    } else if (interval === "quaterly") {
      // Start from 2022-Q4 (we dont want to show any data past 2022 to keep it consistent with yearly data)
      // After finding the latest value, push that value and the 9 values before it into graphData
      let year = current_year - 1;
      let quarter = 4;
      let found_latest = false;
      while (year > 0) {
        if (data[year.toString() + "-Q" + quarter.toString()]) {
          if (!found_latest) {
            graphData.unshift(
              data[year.toString() + "-Q" + quarter.toString()]
            );
            found_latest = true;
          } else {
            // Push the 9 values by year before the latest value into graphData
            for (let i = year - 1; i > year - 10; i--) {
              graphData.unshift(data[i.toString() + "-Q" + quarter.toString()]);
            }
            break;
          }
        } else {
          if (quarter === 1) {
            year--;
            quarter = 4;
          } else {
            quarter--;
          }
        }
      }
    } else if (interval === "monthly-num") {
      // Start from 2023-08-01 and keep going back until you find a value. 2023-08-01 -> 2023-07-01 -> 2023-06-01 -> ... -> 2023-01-01 -> 2022-12-01 -> 2022-11-01 -> ...
      // After finding the latest value, push that value and the 9 values before it into graphData
      let year = current_year - 1;
      let month = 12;
      let found_latest = false;
      while (year > 0) {
        if (
          data[
            year.toString() +
              "-" +
              (month >= 10 ? month.toString() : "0" + month.toString()) +
              "-01"
          ]
        ) {
          if (!found_latest) {
            graphData.unshift(
              data[
                year.toString() +
                  "-" +
                  (month >= 10 ? month.toString() : "0" + month.toString()) +
                  "-01"
              ]
            );
            found_latest = true;
          } else {
            // Push the 9 values by year before the latest value into graphData
            for (let i = year - 1; i > year - 10; i--) {
              graphData.unshift(
                data[
                  i.toString() +
                    "-" +
                    (month >= 10 ? month.toString() : "0" + month.toString()) +
                    "-01"
                ]
              );
            }
            break;
          }
        } else {
          if (month === 1) {
            year--;
            month = 12;
          } else {
            month--;
          }
        }
      }
    } else {
      let year = current_year - 1;
      let month = 12;
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];
      let found_latest = false;
      while (year > 0) {
        if (data[monthNames[month - 1] + "-" + (year % 100)]) {
          if (!found_latest) {
            graphData.unshift(data[monthNames[month - 1] + "-" + (year % 100)]);
            found_latest = true;
            if (month === 1) {
              year--;
              month = 12;
            } else {
              month--;
            }
          } else {
            // Push the 9 values by year before the latest value into graphData
            for (let i = year - 1; i > year - 10; i--) {
              graphData.unshift(data[monthNames[month] + "-" + (i % 100)]);
            }
            break;
          }
        } else {
          if (month === 1) {
            year--;
            month = 12;
          } else {
            month--;
          }
        }
      }
    }

    // Convert N/A --> null
    graphData = graphData.map((data) => {
      if (data === "N/A") {
        return null;
      } else {
        return data;
      }
    });
    setIndicator_Data(graphData);
  };

  const refreshMacroData = async (
    setMacroData,
    setPrevMacroData,
    indicator,
    timeframe
  ) => {
    const data = await getMacroData(selectedCountryCode, indicator);

    // Check how the data stores its time periods
    let interval = indicators.find((i) => i.title === indicator).interval;

    // Get the latest data and the second latest data, depending on what the interval is
    let latest_country_data;
    let prev_country_data;
    if (timeframe === "Latest") {
      if (interval === "yearly") {
        latest_country_data = data[(current_year - 1).toString()]; // Because current_year is 2023, the latest yearly data will only be 2022
      } else if (interval === "quaterly") {
        // For macroData1, Start from 2023-Q2 and keep going back until you find a value. 2023-Q2 -> 2023-Q1 -> 2022-Q4 -> 2022-Q3 -> ...
        // For prevMacroData1, Start from the quarter before macroData1 and keep going back until you find a value. 2023-Q1 -> 2022-Q4 -> 2022-Q3 -> ...
        let year = current_year;
        let quarter = 2;
        while (current_year > 0) {
          if (data[year.toString() + "-Q" + quarter.toString()]) {
            latest_country_data =
              data[year.toString() + "-Q" + quarter.toString()];
            break;
          } else {
            if (quarter === 1) {
              year--;
              quarter = 4;
            } else {
              quarter--;
            }
          }
        }
      } else if (interval === "monthly-num") {
        // For macroData1, Start from 2023-08-01 and keep going back until you find a value. 2023-08-01 -> 2023-07-01 -> 2023-06-01 -> ... -> 2023-01-01 -> 2022-12-01 -> 2022-11-01 -> ...
        // For prevMacroData1, Start from the quarter before macroData1 and keep going back until you find a value.
        let year = current_year;
        let month = 6;
        while (year > 0) {
          if (
            data[
              year.toString() +
                "-" +
                (month >= 10 ? month.toString() : "0" + month.toString()) +
                "-01"
            ]
          ) {
            latest_country_data =
              data[
                year.toString() +
                  "-" +
                  (month >= 10 ? month.toString() : "0" + month.toString()) +
                  "-01"
              ];
            break;
          } else {
            if (month === 1) {
              year--;
              month = 12;
            } else {
              month--;
            }
          }
        }
      } else {
        // eg Sep-05, Oct-05, Nov-05...
        let year = current_year;
        let month = 6;
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ];

        while (year > 0) {
          if (data[monthNames[month - 1] + "-" + (year % 100)]) {
            latest_country_data =
              data[monthNames[month - 1] + "-" + (year % 100)];
            break;
          } else {
            if (month === 1) {
              year--;
              month = 12;
            } else {
              month--;
            }
          }
        }
      }
      prev_country_data = "";
    } else {
      const timeframe_years = parseInt(timeframe.split(" ")[0]);
      if (interval === "yearly") {
        latest_country_data = data[(current_year - 1).toString()]; // Because current_year is 2023, the latest yearly data will only be 2022
        prev_country_data =
          data[(current_year - timeframe_years - 1).toString()]; // Because current_year is 2023, the second latest yearly data will only be 2021
      } else if (interval === "quaterly") {
        // For macroData1, Start from 2023-Q2 and keep going back until you find a value. 2023-Q2 -> 2023-Q1 -> 2022-Q4 -> 2022-Q3 -> ...
        // For prevMacroData1, Start from the quarter before macroData1 and keep going back until you find a value. 2023-Q1 -> 2022-Q4 -> 2022-Q3 -> ...
        let year = current_year;
        let quarter = 2;
        let found_latest = false;
        let found_quarter;
        while (current_year > 0) {
          if (data[year.toString() + "-Q" + quarter.toString()]) {
            if (!found_latest) {
              latest_country_data =
                data[year.toString() + "-Q" + quarter.toString()];
              found_latest = true;
              found_quarter = quarter;
              year -= timeframe_years;
            } else {
              prev_country_data =
                data[year.toString() + "-Q" + found_quarter.toString()];
              break;
            }
          } else {
            if (quarter === 1) {
              year--;
              quarter = 4;
            } else {
              quarter--;
            }
          }
        }
      } else if (interval === "monthly-num") {
        // For macroData1, Start from 2023-08-01 and keep going back until you find a value. 2023-08-01 -> 2023-07-01 -> 2023-06-01 -> ... -> 2023-01-01 -> 2022-12-01 -> 2022-11-01 -> ...
        // For prevMacroData1, go back 12 months from macroData1 and keep going back until you find a value. 2023-07-01 -> 2023-06-01 -> ... -> 2022-08-01 -> 2022-07-01 -> ...
        let year = current_year;
        let month = 6;
        let found_latest = false;
        while (year > 0) {
          if (
            data[
              year.toString() +
                "-" +
                (month >= 10 ? month.toString() : "0" + month.toString()) +
                "-01"
            ]
          ) {
            if (!found_latest) {
              latest_country_data =
                data[
                  year.toString() +
                    "-" +
                    (month >= 10 ? month.toString() : "0" + month.toString()) +
                    "-01"
                ];
              found_latest = true;
              year -= timeframe_years;
            } else {
              prev_country_data =
                data[
                  year.toString() +
                    "-" +
                    (month >= 10 ? month.toString() : "0" + month.toString()) +
                    "-01"
                ];
              break;
            }
          } else {
            if (month === 1) {
              year--;
              month = 12;
            } else {
              month--;
            }
          }
        }
      } else {
        // eg Sep-05, Oct-05, Nov-05...
        let year = current_year;
        let month = 6;
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ];
        let found_latest = false;
        while (year > 0) {
          if (data[monthNames[month - 1] + "-" + (year % 100)]) {
            if (!found_latest) {
              latest_country_data =
                data[monthNames[month - 1] + "-" + (year % 100)];
              found_latest = true;
              year -= timeframe_years;
            } else {
              prev_country_data =
                data[monthNames[month - 1] + "-" + (year % 100)];
              break;
            }
          } else {
            if (month === 1) {
              year--;
              month = 12;
            } else {
              month--;
            }
          }
        }
      }
    }
    setMacroData(latest_country_data);
    setPrevMacroData(prev_country_data);
  };

  useEffect(() => {
    renderGraphData(setIndicatorA_Data, indicatorA, timeframe);
    renderGraphData(setIndicatorB_Data, indicatorB, timeframe);
  }, [selectedCountry, selectedCountryCode, indicatorA, indicatorB, timeframe]);

  useEffect(() => {
    refreshMacroData(setMacroData1, setPrevMacroData1, indicator1, timeframe);
  }, [selectedCountry, selectedCountryCode, indicator1, timeframe]);

  useEffect(() => {
    refreshMacroData(setMacroData2, setPrevMacroData2, indicator2, timeframe);
  }, [selectedCountry, selectedCountryCode, indicator2, timeframe]);

  useEffect(() => {
    refreshMacroData(setMacroData3, setPrevMacroData3, indicator3, timeframe);
  }, [selectedCountry, selectedCountryCode, indicator3, timeframe]);

  useEffect(() => {
    refreshMacroData(setMacroData4, setPrevMacroData4, indicator4, timeframe);
  }, [selectedCountry, selectedCountryCode, indicator4, timeframe]);

  useEffect(() => {
    refreshMacroData(setMacroData5, setPrevMacroData5, indicator5, timeframe);
  }, [selectedCountry, selectedCountryCode, indicator5, timeframe]);

  useEffect(() => {
    refreshMacroData(setMacroData6, setPrevMacroData6, indicator6, timeframe);
  }, [selectedCountry, selectedCountryCode, indicator6, timeframe]);

  function convertTitleToKey(title) {
    if (title === "Consumer Price Index") return "cpi";
    if (title === "Government Debt to GDP") return "governmentDeficit";

    // Convert the first word to all lowercase. Convert the remaining words so that only the first letter is uppercase. Join the words together with no spaces.
    return title
      .split(" ")
      .map((word, index) => {
        if (index === 0) {
          return word.toLowerCase();
        } else {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
      })
      .join("");
  }

  function simplifyNumber(number) {
    if (number === "N/A") return;

    number = parseFloat(number); // Convert to number type
    let absoluteValue = Math.abs(number);

    if (absoluteValue > 1000000000) {
      absoluteValue = (absoluteValue / 1000000000).toFixed(2) + "B";
    } else if (absoluteValue > 1000000) {
      absoluteValue = (absoluteValue / 1000000).toFixed(2) + "M";
    } else if (absoluteValue > 1000) {
      absoluteValue = (absoluteValue / 1000).toFixed(2) + "K";
    } else {
      absoluteValue = absoluteValue.toFixed(2);
    }

    return absoluteValue.toString();
  }
  function getPercentageChange(current, prev) {
    let percentageChange = (
      ((parseFloat(current) - parseFloat(prev)) / parseFloat(prev)) *
      100
    ).toFixed(2);
    let percentageChangeString =
      selectedCountry === "Global"
        ? ""
        : (percentageChange > 0 ? "+" : "") + percentageChange + "%";
    return (
      <Typography
        variant="h5"
        style={{
          fontSize: "15px",
          marginLeft: "10px",
          color:
            percentageChange > 0
              ? "green"
              : percentageChange < 0
              ? "red"
              : "black",
        }}
      >
        {selectedCountry === "Global" ||
        timeframe === "Latest" ||
        percentageChange === "NaN" ||
        percentageChangeString === "0.00%"
          ? ""
          : current === "N/A" || prev === "N/A"
          ? "N/A"
          : percentageChangeString}
      </Typography>
    );
  }

  return (
    <Card sx={{ height: "100%", px: 0 }}>
      <CardHeader
        sx={{ paddingBottom: 0 }} // Adjust the padding here
        action={
          <Box>
            <Typography
              style={{ display: "inline-block", marginRight: "10px" }}
            >
              Set timeframe:
            </Typography>
            <TextField
              select
              defaultValue={timeframe}
              size="small"
              variant="standard"
              onChange={(e) => setTimeframe(e.target.value)}
            >
              {time_period.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        }
        title={selectedCountryFlag + " Macroeconomic Indicators"}
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={5.5}>
            <MacroChart
              selectedCountry={selectedCountry}
              indicatorA={indicatorA}
              indicatorB={indicatorB}
              indicatorA_Data={indicatorA_Data}
              indicatorB_Data={indicatorB_Data}
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <IndicatorDropdown
                label="Indicator A"
                defaultValue={indicatorA}
                setIndicator={setIndicatorA}
                disabled={selectedCountry === "Global" ? true : false}
                size="small"
              />
              <IndicatorDropdown
                label="Indicator B"
                defaultValue={indicatorB}
                setIndicator={setIndicatorB}
                disabled={selectedCountry === "Global" ? true : false}
                size="small"
              />
            </Box>
          </Grid>
          <Grid container xs={6.5} spacing={2}>
            <Grid item xs={6}>
              <IndicatorDropdown
                label="Indicator"
                defaultValue={indicator1}
                setIndicator={setIndicator1}
                disabled={selectedCountry === "Global" ? true : false}
                size="small"
              />
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h5">
                  {selectedCountry === "Global" || macroData1 === "N/A"
                    ? "-"
                    : indicator1.includes("Rate") ||
                      indicator1 === "Consumer Price Index" ||
                      indicator1 === "Government Debt to GDP"
                    ? macroData1 < 0
                      ? "-" + simplifyNumber(macroData1) + "%"
                      : simplifyNumber(macroData1) + "%"
                    : macroData1 < 0
                    ? "-$" + simplifyNumber(macroData1)
                    : "$" + simplifyNumber(macroData1)}
                </Typography>
                {getPercentageChange(macroData1, prevMacroData1)}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <IndicatorDropdown
                label="Indicator"
                defaultValue={indicator2}
                setIndicator={setIndicator2}
                disabled={selectedCountry === "Global" ? true : false}
                size="small"
              />
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h5">
                  {selectedCountry === "Global" || macroData2 === "N/A"
                    ? "-"
                    : indicator2.includes("Rate") ||
                      indicator2 === "Consumer Price Index" ||
                      indicator2 === "Government Debt to GDP"
                    ? macroData2 < 0
                      ? "-" + simplifyNumber(macroData2) + "%"
                      : simplifyNumber(macroData2) + "%"
                    : macroData2 < 0
                    ? "-$" + simplifyNumber(macroData2)
                    : "$" + simplifyNumber(macroData2)}
                </Typography>
                {getPercentageChange(macroData2, prevMacroData2)}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <IndicatorDropdown
                label="Indicator"
                defaultValue={indicator3}
                setIndicator={setIndicator3}
                disabled={selectedCountry === "Global" ? true : false}
                size="small"
              />
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h5">
                  {selectedCountry === "Global" || macroData3 === "N/A"
                    ? "-"
                    : indicator3.includes("Rate") ||
                      indicator3 === "Consumer Price Index" ||
                      indicator3 === "Government Debt to GDP"
                    ? macroData3 < 0
                      ? "-" + simplifyNumber(macroData3) + "%"
                      : simplifyNumber(macroData3) + "%"
                    : macroData3 < 0
                    ? "-$" + simplifyNumber(macroData3)
                    : "$" + simplifyNumber(macroData3)}
                </Typography>
                {getPercentageChange(macroData3, prevMacroData3)}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <IndicatorDropdown
                label="Indicator"
                defaultValue={indicator4}
                setIndicator={setIndicator4}
                disabled={selectedCountry === "Global" ? true : false}
                size="small"
              />
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h5">
                  {selectedCountry === "Global" || macroData4 === "N/A"
                    ? "-"
                    : indicator4.includes("Rate") ||
                      indicator4 === "Consumer Price Index" ||
                      indicator4 === "Government Debt to GDP"
                    ? macroData4 < 0
                      ? "-" + simplifyNumber(macroData4) + "%"
                      : simplifyNumber(macroData4) + "%"
                    : macroData4 < 0
                    ? "-$" + simplifyNumber(macroData4)
                    : "$" + simplifyNumber(macroData4)}
                </Typography>
                {getPercentageChange(macroData4, prevMacroData4)}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <IndicatorDropdown
                label="Indicator"
                defaultValue={indicator5}
                setIndicator={setIndicator5}
                disabled={selectedCountry === "Global" ? true : false}
                size="small"
              />
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h5">
                  {selectedCountry === "Global" || macroData5 === "N/A"
                    ? "-"
                    : indicator5.includes("Rate") ||
                      indicator5 === "Consumer Price Index" ||
                      indicator5 === "Government Debt to GDP"
                    ? macroData5 < 0
                      ? "-" + simplifyNumber(macroData5) + "%"
                      : simplifyNumber(macroData5) + "%"
                    : macroData5 < 0
                    ? "-$" + simplifyNumber(macroData5)
                    : "$" + simplifyNumber(macroData5)}
                </Typography>
                {getPercentageChange(macroData5, prevMacroData5)}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <IndicatorDropdown
                label="Indicator"
                defaultValue={indicator6}
                setIndicator={setIndicator6}
                disabled={selectedCountry === "Global" ? true : false}
                size="small"
              />
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h5">
                  {selectedCountry === "Global" || macroData6 === "N/A"
                    ? "-"
                    : indicator6.includes("Rate") ||
                      indicator6 === "Consumer Price Index" ||
                      indicator6 === "Government Debt to GDP"
                    ? macroData6 < 0
                      ? "-" + simplifyNumber(macroData6) + "%"
                      : simplifyNumber(macroData6) + "%"
                    : macroData6 < 0
                    ? "-$" + simplifyNumber(macroData6)
                    : "$" + simplifyNumber(macroData6)}
                </Typography>
                {getPercentageChange(macroData6, prevMacroData6)}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
