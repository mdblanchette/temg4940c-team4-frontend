import React from 'react';
import { Card, CardContent, Select, MenuItem, InputBase, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const dummyTableData = [
  { id: 1, name: 'Item 1', issuer: 'Issuer A', rating: 'A', migration: 'XX' },
  { id: 2, name: 'Item 2', issuer: 'Issuer B', rating: 'B', migration: 'XX' },
  { id: 3, name: 'Item 3', issuer: 'Issuer C', rating: 'C', migration: 'XX' },
  // Add more data as needed
];

export default function WatchlistSideBar({ selectedRow, onRowClick }) {
  return (
    <Card style={{ width: '420px', height: '100%', marginBottom: 20 }}>
      <CardContent style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <Select variant="outlined" fullWidth style={{ height: '30px', marginRight: '10px' }} defaultValue={1}> {/* Set defaultValue */}
            <MenuItem value={1}>Portfolio 1</MenuItem>
            <MenuItem value={2}>Portfolio 2</MenuItem>
            <MenuItem value={3}>Portfolio 3</MenuItem>
            {/* Add more portfolios as needed */}
          </Select>
          <IconButton color="primary" style={{ background: 'blue', borderRadius: '5px', width: '30px', height: '30px' }}>
            <AddIcon style={{ color: 'white' }} />
          </IconButton>
        </div>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '5px', height: '32px', width: '100%' }}>
            <InputBase placeholder="Search" fullWidth style={{ fontSize: '14px', paddingLeft: '5px' }} />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
        </div>
        <TableContainer component={Paper} style={{ flex: 1, maxHeight: 'calc(100% - 180px)', overflowY: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '35%' }}>Name</TableCell>
                <TableCell style={{ width: '35%' }}>Issuer</TableCell>
                <TableCell style={{ width: '15%' }}>Rating</TableCell>
                <TableCell style={{ width: '15%' }}>Spread</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dummyTableData.map((row) => (
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
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <Button variant="outlined" color="primary" style={{ width: '48%' }}>Modify Portfolio</Button>
          <Button variant="outlined" color="secondary" style={{ width: '48%' }}>Delete Portfolio</Button>
        </div>
      </CardContent>
    </Card>
  );
}