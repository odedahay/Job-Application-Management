import React from 'react';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import AccordionDash from '../components/AccordionDash';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import "../Dash.css";
import BarChart from '../charts/BarChart';
import CountUp from 'react-countup';

export default function Home() {
  return (
    <>
    <div className='bgColor'>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={2}>

            <Grid size={9}>
              <Stack spacing={2} direction={'row'}>
                <Card sx={{ width: 50 + '%', height: 150, background: '#1b9e77', color: 'white',  }}  >
                  <CardContent>
                     <div><CreditCardIcon /></div>
                    <Typography gutterBottom variant="h5" component="div">
                       $<CountUp end={500} duration={0.3} />
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div" sx={{color: '#fff'}}>
                       Total Applications
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ width: 49 + '%', height: 150, background: 'linear-gradient(158deg, #d95f02 30%, #fc466b 90%)', color: 'white' }} >
                  <CardContent>
                    <div><ShoppingBagIcon /></div>
                    <Typography gutterBottom variant="h5" component="div">
                       $<CountUp end={900} duration={0.3} />
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div" sx={{color: '#fff'}}>
                       Total No Response
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ width: 49 + '%', height: 150, background: 'linear-gradient(158deg, #d95f02 30%, #fc466b 90%)', color: 'white' }} >
                  <CardContent>
                    <div><ShoppingBagIcon /></div>
                    <Typography gutterBottom variant="h5" component="div">
                       $<CountUp end={900} duration={0.3} />
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div" sx={{color: '#fff'}}>
                       In Progress
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
            <Grid size={3}>
              <Stack spacing={2}>
                <Card sx={{ background: 'linear-gradient(158deg, rgba(63, 94, 251, 1), rgba(252, 70, 107, 1) 100%)', color: 'white' }}>
                    <Stack spacing={2} direction={'row'}>
                      <div className='iconstyle'>
                        <StorefrontIcon />
                      </div>
                      <div className='paddingall'>
                        <span className='priceTitle'>5</span>
                        <span className='priceSubTitle'>Total Rejected</span>
                      </div>
                    </Stack>
                </Card>
                <Card sx={{ }}>
                    <Stack spacing={2} direction={'row'}>
                      <div className='iconstyle'>
                        <StorefrontIcon />
                      </div>
                      <div className='paddingall'>
                        <span className='priceTitle'>2</span>
                        <span className='priceSubTitle'>Total Interview</span>
                      </div>
                    </Stack>
                </Card>
              </Stack>
            </Grid>
          </Grid>
          <Box height={20} />
          <Grid container spacing={2}>
            <Grid size={9}>
              <Card sx={{ height: 60 + 'vh' }}>
                <CardContent>
                  <BarChart />
                </CardContent>
              </Card>
            </Grid>
            <Grid size={3}>
              <Card sx={{ height: 60 + 'vh' }}>
                <CardContent>
                  <div className='paddingall'>
                        <span className='priceTitle'>Popular Products</span>
                      </div>
                  <AccordionDash />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
      
    </>
  )
}