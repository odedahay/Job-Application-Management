import React from 'react'
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import ApplicationList from './Applications/Application-list';

import "../Dash.css";
import { Box } from '@mui/material';

export default function Applications() {
  return (
    <>
      <div className='bgColor'>
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: 'flex' }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {/* <h1>Applications</h1> */}
            <ApplicationList />
          </Box>
        </Box>
      </div>

    </>
  )
}
