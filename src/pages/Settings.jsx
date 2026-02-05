import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Sidenav from '../components/Sidenav';
import Navbar from '../components/Navbar';

export default function Settings() {
  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Settings</h1>
        </Box>
      </Box>
    </>
  )
}