import React from 'react';
import SideNav from '../../../components/Admin/SideNav/SideNav';
// import Navbar from '../components/Navbar';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
// import '../css/Dash.css';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AccordionDash from '../../../components/Admin/AccordionDash/AccordionDash';
import BarChart from '../../../components/Admin/charts/BarChart';
import CountUp from 'react-countup';
import './Dash.css';
function HomeAdmin() {
    return (
        <>
            {/* <Navbar /> */}
            <Box height={70} />
            <Box sx={{ display: 'flex' }}>
                <SideNav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Stack spacing={2} direction={'row'}>
                                <Card
                                    sx={{ minWidth: 49 + '%', height: 150 }}
                                    style={{
                                        background:
                                            'linear-gradient(158deg, rgba(40, 34, 70, 1) 0%, rgba(30, 47, 141, 1) 100%)',
                                    }}
                                >
                                    <CardContent>
                                        <div>
                                            <CreditCardIcon style={{ color: 'white' }} />
                                        </div>
                                        <Typography gutterBottom variant="h5" component="div" sx={{ color: '#ffffff' }}>
                                            $<CountUp delay={0.4} end={500} duration={1} />
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="body2"
                                            component="div"
                                            sx={{ color: '#ccd1d1' }}
                                        >
                                            Total Earning
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card
                                    sx={{ minWidth: 49 + '%', height: 150 }}
                                    style={{
                                        background:
                                            'linear-gradient(158deg, rgba(53, 138, 148, 1) 0%, rgba(91, 180, 96, 1) 100%)',
                                    }}
                                >
                                    <CardContent>
                                        <div>
                                            <BusinessCenterIcon style={{ color: 'white' }} />
                                        </div>
                                        <Typography gutterBottom variant="h5" component="div" sx={{ color: '#ffffff' }}>
                                            $<CountUp delay={0.4} end={900} duration={1} />
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="body2"
                                            component="div"
                                            sx={{ color: '#ccd1d1' }}
                                        >
                                            Total Order
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Stack>
                        </Grid>

                        <Grid item xs={4}>
                            <Stack spacing={2}>
                                <Card
                                    style={{
                                        background:
                                            'linear-gradient(158deg, rgba(53, 138, 148, 1) 0%, rgba(91, 180, 96, 1) 100%)',
                                    }}
                                >
                                    <Stack spacing={2} direction="row">
                                        <div style={{ marginTop: 20, marginLeft: 20 }}>
                                            <StorefrontIcon style={{ color: 'white' }} />
                                        </div>
                                        <div style={{ padding: 10 }}>
                                            <span style={{ fontWeight: 600 }}>
                                                $<CountUp delay={0.4} end={335000} duration={1} />
                                            </span>
                                            <br />
                                            <span style={{ fontSize: 15 }}>Total Income</span>
                                        </div>
                                    </Stack>
                                </Card>
                                <Card>
                                    <Stack spacing={2} direction="row">
                                        <div style={{ marginTop: 20, marginLeft: 20 }}>
                                            <StorefrontIcon />
                                        </div>
                                        <div style={{ padding: 10 }}>
                                            <span style={{ fontWeight: 600 }}>
                                                $<CountUp delay={0.4} end={22750} duration={1} />
                                            </span>
                                            <br />
                                            <span style={{ fontSize: 15 }}>Total Order</span>
                                        </div>
                                    </Stack>
                                </Card>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Box height={30} />
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Card sx={{ height: 60 + 'vh' }}>
                                <CardContent>
                                    <BarChart />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ height: 60 + 'vh' }}>
                                <CardContent>
                                    <div>
                                        <span style={{ fontWeight: 600 }}>Task today</span>
                                    </div>

                                    <br />
                                    <AccordionDash />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default HomeAdmin;
