import React, { useState, useEffect } from 'react';
import { Card, CardContent, Select, MenuItem, InputBase, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const dummyTableData = {
  0: [
    { id: 1, name: 'Item 1', issuer: 'Issuer A', rating: 'A', migration: 'XX', allocation: 25 },
    { id: 2, name: 'Item 2', issuer: 'Issuer B', rating: 'B', migration: 'XX', allocation: 15 },
    { id: 3, name: 'Item 3', issuer: 'Issuer C', rating: 'C', migration: 'XX', allocation: 30 },
    { id: 4, name: 'Item 4', issuer: 'Issuer D', rating: 'C', migration: 'XX', allocation: 10 },
  ],
  1: [
    { id: 5, name: 'Item 5', issuer: 'Issuer E', rating: 'C', migration: 'XX', allocation: 18 },
    { id: 6, name: 'Item 6', issuer: 'Issuer C', rating: 'A', migration: 'XX', allocation: 27 },
    // Add more data as needed for Portfolio 2
  ],
  2: [
    { id: 7, name: 'Item 7', issuer: 'Issuer F', rating: 'A', migration: 'XX', allocation: 40 },
    // Add more data as needed for Portfolio 3
  ],
};



export default function WatchlistSideBar({ selectedRow, onRowClick, onPortfolioChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPortfolio, setSelectedPortfolio] = useState(0);
  const [selectedPortfolioItems, setSelectedPortfolioItems] = useState([]);

  const filteredTableData = dummyTableData[selectedPortfolio].filter(row => {
    const lowerSearchQuery = searchQuery.toLowerCase();
    return (
      row.name.toLowerCase().includes(lowerSearchQuery) ||
      row.issuer.toLowerCase().includes(lowerSearchQuery) ||
      row.rating.toLowerCase().includes(lowerSearchQuery) ||
      row.migration.toLowerCase().includes(lowerSearchQuery)
    );
  });
  
  const handlePortfolioSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedPortfolio(selectedValue);
    const selectedPortfolioItems = dummyTableData[selectedValue];
    setSelectedPortfolioItems(selectedPortfolioItems);
  };

  return (
    <Card style={{ width: '400px', height: '100%' }}>
      <CardContent style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <Select variant="outlined" fullWidth style={{ height: '30px', marginRight: '10px' }} value={selectedPortfolio} onChange={handlePortfolioSelect}>
            <MenuItem value={0}>Portfolio 1</MenuItem>
            <MenuItem value={1}>Portfolio 2</MenuItem>
            <MenuItem value={2}>Portfolio 3</MenuItem>
          </Select>
          <IconButton color="primary" style={{ background: 'blue', borderRadius: '5px', width: '30px', height: '30px' }}>
            <AddIcon style={{ color: 'white' }} />
          </IconButton>
        </div>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '5px', height: '32px', width: '100%' }}>
            <InputBase
              placeholder="Search"
              fullWidth
              style={{ fontSize: '14px', paddingLeft: '5px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', marginBottom: '30px' }}>
          <Button variant="outlined" color="primary" style={{ width: '48%' }}>Modify Portfolio</Button>
          <Button variant="outlined" color="secondary" style={{ width: '48%' }}>Delete Portfolio</Button>
        </div>
        <TableContainer component={Paper} style={{ flex: 1, maxHeight: 'calc(100% - 180px)', overflowY: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '35%' }}>Name</TableCell>
                <TableCell style={{ width: '35%' }}>Issuer</TableCell>
                <TableCell style={{ width: '15%' }}>Rating</TableCell>
                <TableCell style={{ width: '15%' }}>Migration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTableData.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => onRowClick(row.id)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: selectedRow === row.id ? '#d8d3f5' : 'transparent',
                    '&:hover': {
                      backgroundColor: selectedRow === row.id ? '#d8d3f5' : '#f5f5f5',
                    },
                  }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.issuer}</TableCell>
                  <TableCell>{row.rating}</TableCell>
                  <TableCell>{row.migration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
