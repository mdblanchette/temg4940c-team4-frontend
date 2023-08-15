import React, { useState } from "react";
import { CssBaseline } from "@mui/material";
import { Layout as DashboardLayout } from "../layout/Layout";
import WatchlistSideBar from "../components/WatchList/WatchlistSideBar";
import BondBasicInfoCard from "../components/WatchList/BondBasicInfoCard";
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
    },
    {
      id: 2,
      name: "Item 2",
      issuer: "Issuer B",
      rating: "B",
      migration: "XX",
      allocation: 15,
      country: "United States",
      spread: "15%",
      coupons: "$900",
      maturity: 2,
      liquidity: "$2,000,000",
      outstandingAmount: "$20,000",
      bid: "13%",
      ask: "16%",
      netChange: "4%",
    },
    {
      id: 3,
      name: "Item 3",
      issuer: "Issuer C",
      rating: "C",
      migration: "XX",
      allocation: 30,
      country: "Japan",
      spread: "12%",
      coupons: "$500",
      maturity: 2,
      liquidity: "$3,000,000",
      outstandingAmount: "$30,000",
      bid: "14%",
      ask: "17%",
      netChange: "5%",
    },
    {
      id: 4,
      name: "Item 4",
      issuer: "Issuer D",
      rating: "C",
      migration: "XX",
      allocation: 10,
      country: "Korea",
      spread: "11%",
      coupons: "$400",
      maturity: 4,
      liquidity: "$4,000,000",
      outstandingAmount: "$40,000",
      bid: "15%",
      ask: "18%",
      netChange: "6%",
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
      country: "Korea",
      spread: "11%",
      coupons: "$400",
      maturity: 5,
      liquidity: "$5,000,000",
      outstandingAmount: "$50,000",
      bid: "16%",
      ask: "19%",
      netChange: "7%",
    },
    {
      id: 6,
      name: "Item 6",
      issuer: "Issuer C",
      rating: "A",
      migration: "XX",
      allocation: 27,
      country: "China",
      spread: "15%",
      coupons: "$700",
      maturity: 5,
      liquidity: "$6,000,000",
      outstandingAmount: "$60,000",
      bid: "17%",
      ask: "20%",
      netChange: "8%",
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
      country: "Japan",
      spread: "14%",
      coupons: "$500",
      maturity: 5,
      liquidity: "$7,000,000",
      outstandingAmount: "$70,000",
      bid: "18%",
      ask: "21%",
      netChange: "9%",
    },
    // Add more data as needed for Portfolio 3
  ],
};

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

  const handleRowClick = (rowId) => {
    setSelectedRow(rowId === selectedRow ? null : rowId);
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
              <BondBasicInfoCard />
              <CountryInfoCard />
              <IssuerInfoCard />
            </>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <PortfolioAllocationCard
                style={{ flex: "1" }}
                selectedPortfolio={selectedPortfolio}
                portfolioAllocationData={portfolioAllocationData}
                portfolioAllocationLabels={portfolioAllocationLabels}
              />
              <PortfolioPerformanceCard
                style={{ flex: "1" }}
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
