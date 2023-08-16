import React, { useState } from "react";
import { CssBaseline } from "@mui/material";
import { Layout as DashboardLayout } from "../layout/Layout";
import WatchlistSideBar from "../components/WatchList/WatchlistSideBar";
import BondBasicInfoCard from "../components/WatchList/BondBasicInfoCard"; // Make sure to use the correct import path
import IssuerInfoCard from "../components/WatchList/IssuerInfoCard";
import PortfolioAllocationCard from "../components/WatchList/PortfolioAllocationCard";
import PortfolioPerformanceCard from "../components/WatchList/PortfolioPerformanceCard";
import CountryInfoCard from "../components/WatchList/CountryInfoCard";

const dummyTableData = {
  1: [
    {
      id: 1,
      name: "Item 1",
      issuer: "Issuer A",
      rating: "A",
      migration: "XX",
      allocation: 25,
      country: "Canada",
      spread: "12%",
      coupons: "$100",
      maturity: 5,
      liquidity: "$1,000,000",
      outstandingAmount: "$10,000",
      bid: "12%",
      ask: "15%",
      netChange: "3%",
      predictedSpreadMovement: "8%",
    },
    {
      id: 2,
      name: "Item 2",
      issuer: "Issuer B",
      rating: "B",
      migration: "XX",
      allocation: 15,
      country: "United States of America",
      spread: "15%",
      coupons: "$900",
      maturity: 2,
      liquidity: "$2,000,000",
      outstandingAmount: "$20,000",
      bid: "13%",
      ask: "16%",
      netChange: "4%",
      predictedSpreadMovement: "7%",
    },
    {
      id: 3,
      name: "Item 3",
      issuer: "Issuer C",
      rating: "C",
      migration: "XX",
      allocation: 30,
      country: "Canada",
      spread: "12%",
      coupons: "$500",
      maturity: 2,
      liquidity: "$3,000,000",
      outstandingAmount: "$30,000",
      bid: "14%",
      ask: "17%",
      netChange: "5%",
      predictedSpreadMovement: "6%",
    },
    {
      id: 4,
      name: "Item 4",
      issuer: "Issuer D",
      rating: "C",
      migration: "XX",
      allocation: 10,
      country: "Canada",
      spread: "11%",
      coupons: "$400",
      maturity: 4,
      liquidity: "$4,000,000",
      outstandingAmount: "$40,000",
      bid: "15%",
      ask: "18%",
      netChange: "6%",
      predictedSpreadMovement: "5%",
    },
  ],
  2: [
    {
      id: 5,
      name: "Item 5",
      issuer: "Issuer E",
      rating: "C",
      migration: "XX",
      allocation: 18,
      country: "UK",
      spread: "11%",
      coupons: "$400",
      maturity: 5,
      liquidity: "$5,000,000",
      outstandingAmount: "$50,000",
      bid: "16%",
      ask: "19%",
      netChange: "7%",
      predictedSpreadMovement: "4%",
    },
    {
      id: 6,
      name: "Item 6",
      issuer: "Issuer C",
      rating: "A",
      migration: "XX",
      allocation: 27,
      country: "Canada",
      spread: "15%",
      coupons: "$700",
      maturity: 5,
      liquidity: "$6,000,000",
      outstandingAmount: "$60,000",
      bid: "17%",
      ask: "20%",
      netChange: "8%",
      predictedSpreadMovement: "3%",
    },
    // Add more data as needed for Portfolio 2
  ],
  3: [
    {
      id: 7,
      name: "Item 7",
      issuer: "Issuer F",
      rating: "A",
      migration: "XX",
      allocation: 40,
      country: "Canada",
      spread: "14%",
      coupons: "$500",
      maturity: 5,
      liquidity: "$7,000,000",
      outstandingAmount: "$70,000",
      bid: "18%",
      ask: "21%",
      netChange: "9%",
      predictedSpreadMovement: "2%",
    },
    // Add more data as needed for Portfolio 3
  ],
};

const dummyIssuerData = [
  {
    issuer: "Issuer A",
    issuerRating: "AA",
    predictedIssuerRating: "AAA",
    stockTicker: "IA",
    stockPrice: "$24.57",
    country: "United States of America",
    revenue: "1,000,000",
    netIncome: "800,000",
    operatingCF: "400,000",
    debtEquityRatio: "0.5",
    capitalization_1: "0.0",
    capitalization_2: "0.1",
    capitalization_3: "0.2",
    capitalization_4: "0.3",
    aq_1: "1",
    aq_2: "2",
    aq_3: "3",
    size_1: "1",
    size_2: "2",
    size_3: "3",
    size_4: "4",
    size_5: "5",
    size_6: "6",
  },
  {
    issuer: "Issuer B",
    issuerRating: "BB",
    predictedIssuerRating: "AA",
    stockTicker: "IB",
    stockPrice: "$25.61",
    country: "Canada",
    revenue: "2,000,000",
    netIncome: "900,000",
    operatingCF: "500,000",
    debtEquityRatio: "0.6",
    capitalization_1: "0.4",
    capitalization_2: "0.5",
    capitalization_3: "0.6",
    capitalization_4: "0.7",
    aq_1: "4",
    aq_2: "5",
    aq_3: "6",
    size_1: "7",
    size_2: "8",
    size_3: "9",
    size_4: "40",
    size_5: "1",
    size_6: "4",
    fl_1: "1",
    fl_2: "2",
    fl_3: "3",
    fl_4: "4",
    earnings_1: "1",
    earnings_2: "2",
    earnings_3: "3",
    earnings_4: "4",
  },
  {
    issuer: "Issuer C",
    issuerRating: "B",
    predictedIssuerRating: "BB",
    stockTicker: "IC",
    stockPrice: "$23.11",
    country: "UK",
    revenue: "3,000,000",
    netIncome: "700,000",
    operatingCF: "600,000",
    debtEquityRatio: "0.2",
    capitalization_1: "0.8",
    capitalization_2: "0.9",
    capitalization_3: "0.0",
    capitalization_4: "0.1",
    aq_1: "7",
    aq_2: "8",
    aq_3: "9",
    size_1: "19",
    size_2: "2",
    size_3: "3",
    size_4: "4",
    size_5: "5",
    size_6: "6",
    fl_1: "4",
    fl_2: "5",
    fl_3: "6",
    fl_4: "7",
    earnings_1: "4",
    earnings_2: "5",
    earnings_3: "6",
    earnings_4: "7",
  },
  {
    issuer: "Issuer D",
    issuerRating: "C",
    predictedIssuerRating: "BB",
    stockTicker: "ID",
    stockPrice: "$29.50",
    country: "US",
    revenue: "8,000,000",
    netIncome: "900,000",
    operatingCF: "100,000",
    debtEquityRatio: "0.1",
    capitalization_1: "0.2",
    capitalization_2: "0.3",
    capitalization_3: "0.4",
    capitalization_4: "0.5",
    aq_1: "0",
    aq_2: "1",
    aq_3: "2",
    size_1: "13",
    size_2: "24",
    size_3: "3",
    size_4: "6",
    size_5: "9",
    size_6: "6",
    fl_1: "8",
    fl_2: "9",
    fl_3: "310",
    fl_4: "11",
    earnings_1: "8",
    earnings_2: "9",
    earnings_3: "10",
    earnings_4: "11",
  },
  {
    issuer: "Issuer E",
    issuerRating: "AAA",
    predictedIssuerRating: "AA",
    stockTicker: "IE",
    stockPrice: "$22.53",
    country: "Canada",
    revenue: "7,000,000",
    netIncome: "900,000",
    operatingCF: "500,000",
    debtEquityRatio: "0.8",
    capitalization_1: "0.6",
    capitalization_2: "0.7",
    capitalization_3: "0.8",
    capitalization_4: "0.9",
    aq_1: "3",
    aq_2: "4",
    aq_3: "5",
    size_1: "9",
    size_2: "4",
    size_3: "6",
    size_4: "8",
    size_5: "3",
    size_6: "6",
    fl_1: "6",
    fl_2: "7",
    fl_3: "8",
    fl_4: "9",
    earnings_1: "6",
    earnings_2: "7",
    earnings_3: "8",
    earnings_4: "9",
  },
  {
    issuer: "Issuer F",
    issuerRating: "AAA",
    predictedIssuerRating: "BB",
    stockTicker: "IC",
    stockPrice: "$23.57",
    country: "US",
    revenue: "7,000,000",
    netIncome: "900,000",
    operatingCF: "700,000",
    debtEquityRatio: "0.1",
    capitalization_1: "1.0",
    capitalization_2: "1.1",
    capitalization_3: "1.2",
    capitalization_4: "1.3",
    aq_1: "6",
    aq_2: "7",
    aq_3: "8",
    size_1: "1",
    size_2: "2",
    size_3: "3",
    size_4: "4",
    size_5: "5",
    size_6: "6",
    fl_1: "3",
    fl_2: "4",
    fl_3: "5",
    fl_4: "6",
    earnings_1: "3",
    earnings_2: "4",
    earnings_3: "5",
    earnings_4: "6",
  },
];

const oecdCountries = [
  { flag: "🇦🇺", name: "Australia", code: "AUS" },
  { flag: "🇦🇹", name: "Austria", code: "AUT" },
  { flag: "🇧🇪", name: "Belgium", code: "BEL" },
  { flag: "🇨🇦", name: "Canada", code: "CAN" },
  { flag: "🇨🇱", name: "Chile", code: "CHL" },
  { flag: "🇨🇿", name: "Czechia", code: "CZE" },
  { flag: "🇩🇰", name: "Denmark", code: "DNK" },
  { flag: "🇪🇪", name: "Estonia", code: "EST" },
  { flag: "🇫🇮", name: "Finland", code: "FIN" },
  { flag: "🇫🇷", name: "France", code: "FRA" },
  { flag: "🇩🇪", name: "Germany", code: "DEU" },
  { flag: "🇬🇷", name: "Greece", code: "GRC" },
  { flag: "🇭🇺", name: "Hungary", code: "HUN" },
  { flag: "🇮🇸", name: "Iceland", code: "ISL" },
  { flag: "🇮🇪", name: "Ireland", code: "IRL" },
  { flag: "🇮🇱", name: "Israel", code: "ISR" },
  { flag: "🇮🇹", name: "Italy", code: "ITA" },
  { flag: "🇯🇵", name: "Japan", code: "JPN" },
  { flag: "🇰🇷", name: "Korea", code: "KOR" },
  { flag: "🇱🇻", name: "Latvia", code: "LVA" },
  { flag: "🇱🇹", name: "Lithuania", code: "LTU" },
  { flag: "🇱🇺", name: "Luxembourg", code: "LUX" },
  { flag: "🇲🇽", name: "Mexico", code: "MEX" },
  { flag: "🇳🇱", name: "Netherlands", code: "NLD" },
  { flag: "🇳🇿", name: "New Zealand", code: "NZL" },
  { flag: "🇳🇴", name: "Norway", code: "NOR" },
  { flag: "🇵🇱", name: "Poland", code: "POL" },
  { flag: "🇵🇹", name: "Portugal", code: "PRT" },
  { flag: "🇸🇰", name: "Slovakia", code: "SVK" },
  { flag: "🇸🇮", name: "Slovenia", code: "SVN" },
  { flag: "🇪🇸", name: "Spain", code: "ESP" },
  { flag: "🇸🇪", name: "Sweden", code: "SWE" },
  { flag: "🇨🇭", name: "Switzerland", code: "CHE" },
  { flag: "🇹🇷", name: "Turkey", code: "TUR" },
  { flag: "🇬🇧", name: "United Kingdom", code: "GBR" },
  { flag: "🇺🇸", name: "United States of America", code: "USA" },
];

const Page = () => {
  const [selectedRow, setSelectedRow] = useState(-1);
  const [selectedPortfolio, setSelectedPortfolio] = useState(1);
  const [portfolioAllocationData, setPortfolioAllocationData] = useState([]);
  const [portfolioAllocationLabels, setPortfolioAllocationLabels] = useState(
    []
  );
  const [ratingAllocationData, setRatingAllocationData] = useState([]);
  const [ratingAllocationLabels, setRatingAllocationLabels] = useState([]);
  const [maturityAllocationData, setMaturityAllocationData] = useState([]);
  const [maturityAllocationLabels, setMaturityAllocationLabels] = useState([]);

  const handleRowClick = (rowData) => {
    setSelectedRow(rowData === selectedRow ? -1 : rowData);
    // Update portfolioAllocationData, portfolioAllocationLabels, ratingAllocationData,
    // ratingAllocationLabels, maturityAllocationData, and maturityAllocationLabels here
  };

  return (
    <DashboardLayout>
      <CssBaseline />
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <div
          style={{
            width: "420px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <WatchlistSideBar
            selectedRow={selectedRow}
            onRowClick={handleRowClick}
            setSelectedRow={setSelectedRow}
            selectedPortfolio={selectedPortfolio}
            setSelectedPortfolio={setSelectedPortfolio}
            dummyTableData={dummyTableData}
            setPortfolioAllocationData={setPortfolioAllocationData}
            setPortfolioAllocationLabels={setPortfolioAllocationLabels}
            setRatingAllocationData={setRatingAllocationData}
            setRatingAllocationLabels={setRatingAllocationLabels}
            setMaturityAllocationData={setMaturityAllocationData}
            setMaturityAllocationLabels={setMaturityAllocationLabels}
          />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {selectedRow !== -1 ? (
            <>
              <BondBasicInfoCard
                selectedRow={selectedRow}
                selectedPortfolio={selectedPortfolio}
                dummyTableData={dummyTableData}
                dummyIssuerData={dummyIssuerData}
              />
              <CountryInfoCard
                selectedRow={selectedRow}
                dummyTableData={dummyTableData}
                oecdCountries={oecdCountries}
              />
              <IssuerInfoCard 
                selectedRow={selectedRow}
                dummyIssuerData={dummyIssuerData}
              />
            </>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <PortfolioAllocationCard
                selectedPortfolio={selectedPortfolio}
                portfolioAllocationData={portfolioAllocationData}
                portfolioAllocationLabels={portfolioAllocationLabels}
              />
              <PortfolioPerformanceCard
                ratingAllocationData={ratingAllocationData}
                ratingAllocationLabels={ratingAllocationLabels}
                maturityAllocationData={maturityAllocationData}
                maturityAllocationLabels={maturityAllocationLabels}
              />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Page;
