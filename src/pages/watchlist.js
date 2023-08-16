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
      predictedSpreadMovement: "8%"
    },
    {
      id: 2,
      name: "Item 2",
      issuer: "Issuer B",
      rating: "B",
      migration: "XX",
      allocation: 15,
      country: "US",
      spread: "15%",
      coupons: "$900",
      maturity: 2,
      liquidity: "$2,000,000",
      outstandingAmount: "$20,000",
      bid: "13%",
      ask: "16%",
      netChange: "4%",
      predictedSpreadMovement: "7%"
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
      predictedSpreadMovement: "6%"
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
      predictedSpreadMovement: "5%"
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
      predictedSpreadMovement: "4%"
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
      predictedSpreadMovement: "3%"
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
      predictedSpreadMovement: "2%"
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
    country: "US",
    revenue: "1,000,000",
    netIncome: "800,000",
    operatingCF: "400,000",
    debtEquityRatio: "0.5",
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
  },
];

const dummyCountryData = [
  {
    country: "US",
    sovereignRating: "AA",
    averageIssuerRating: "AAA",
  },
  {
    country: "UK",
    sovereignRating: "A",
    averageIssuerRating: "AA",
  },
  {
    country: "Canada",
    sovereignRating: "AAA",
    averageIssuerRating: "BBB",
  },
];

const Page = () => {
  const [selectedRow, setSelectedRow] = useState(null);
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
    setSelectedRow(rowData.id === selectedRow ? null : rowData.id);
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
          {selectedRow !== null ? (
            <>
              <BondBasicInfoCard
                selectedRow={selectedRow}
                selectedPortfolio={selectedPortfolio}
                dummyTableData={dummyTableData}
                dummyIssuerData={dummyIssuerData}
              />
              <CountryInfoCard
                selectedRow={selectedRow}
                selectedPortfolio={selectedPortfolio}
                dummyTableData={dummyTableData}
                dummyCountryData={dummyCountryData}
              />
              <IssuerInfoCard />
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
