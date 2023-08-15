import React, { useState } from 'react';
import { CssBaseline } from '@mui/material';
import { Layout as DashboardLayout } from '../layout/Layout';
import WatchlistSideBar from '../components/WatchList/WatchlistSideBar';
import BondBasicInfoCard from '../components/WatchList/BondBasicInfoCard';
import IssuerInfoCard from '../components/WatchList/IssuerInfoCard';
import PortfolioAllocationCard from '../components/WatchList/PortfolioAllocationCard';
import PortfolioPerformanceCard from '../components/WatchList/PortfolioPerformanceCard';
import CountryInfoCard from '../components/WatchList/CountryInfoCard';

const Page = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (rowId) => {
    setSelectedRow(rowId === selectedRow ? null : rowId);
  };

  return (
    <DashboardLayout>
      <CssBaseline />
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <div style={{ width: '420px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <WatchlistSideBar selectedRow={selectedRow} onRowClick={handleRowClick} />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {selectedRow !== null ? (
            <>
              <BondBasicInfoCard />
              <CountryInfoCard />
              <IssuerInfoCard />
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <PortfolioAllocationCard style={{ flex: '1' }} />
              <PortfolioPerformanceCard style={{ flex: '1' }} />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Page;

