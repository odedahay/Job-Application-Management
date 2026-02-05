import React, { useEffect, useMemo } from 'react';
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
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { useAppStore } from '../appStore';

export default function Home() {
  const rows = useAppStore((state) => state.rows);
  const setRows = useAppStore((state) => state.setRows);

  useEffect(() => {
    const load = async () => {
      if (rows && rows.length) return;
      const snapshot = await getDocs(collection(db, "applications"));
      const items = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setRows(items);
    };
    load();
  }, [rows, setRows]);

  const totalApplications = useMemo(() => rows?.length || 0, [rows]);
  const totalNoResponse = useMemo(
    () =>
      (rows || []).filter(
        (r) => String(r?.status || "").toLowerCase() === "no response"
      ).length,
    [rows]
  );

  const totalPending = useMemo(()=>(
    rows || []).filter(
      (r)=>String(r?.status || "").toLocaleLowerCase() == "pending"
    ).length, [rows]
  );

  const totalRejected = useMemo(()=>(rows || []).filter(
    (r)=>String(r?.status || "").toLocaleLowerCase() == "rejected"
  ).length, [rows]);

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
                       <CountUp end={totalApplications} duration={0.3} />
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
                       <CountUp end={totalNoResponse} duration={0.3} />
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
                      <CountUp end={totalPending} duration={0.3} />
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div" sx={{color: '#fff'}}>
                       In Progress
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
            <Grid size={3}>
              <Stack spacing={0}>
                <Card sx={{ width: 100 + '%', height: 150, background: 'linear-gradient(158deg, #e7e7e7 30%, #a4a4a4 90%)', color: 'black' }} >
                  <CardContent>
                    <div><ShoppingBagIcon /></div>
                    <Typography gutterBottom variant="h5" component="div">
                      <CountUp end={totalRejected} duration={0.3} />
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div" sx={{color: '#000'}}>
                       Rejected
                    </Typography>
                  </CardContent>
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
