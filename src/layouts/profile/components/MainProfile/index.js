import React, { useEffect, useState } from 'react';
import { Card, Stack, Grid, Icon } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import linearGradient from 'assets/theme/functions/linearGradient';
import colors from 'assets/theme/base/colors';
import axios from 'axios';
import { FaHandHoldingWater } from "react-icons/fa";
import { FaEarthAsia, FaHand } from "react-icons/fa6";
import { FaBriefcaseMedical } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

const MainProfile = () => {
    const { gradients, info } = colors;
    const { cardContent } = gradients;

    const [geoInfo, setGeoInfo] = useState({});
    const [data, setData] = useState({
        water_quality: 'Loading...',
        air_quality: 'Loading...',
        number_of_clinics: 'Loading...',
        number_of_doctors: 'Loading...',
    });
    const mapSrc = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${geoInfo.city}, ${geoInfo.country}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;

    useEffect(() => {
        const getVisitorIPAndFetchInfo = async () => {
            try {
                const response = await fetch('https://api.ipify.org');
                const ip = await response.text();
                const locationResponse = await axios.get(`https://ipwho.is/${ip}`);
                setGeoInfo(locationResponse.data);
                await fetchDataFromChatGPT(locationResponse.data.city, locationResponse.data.country);
            } catch (error) {
                console.error('Failed to fetch IP or location info', error);
            }
        };

        getVisitorIPAndFetchInfo();
    }, []);

    const fetchDataFromChatGPT = async (city, country) => {
        const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
        const url = 'https://api.openai.com/v1/chat/completions';

        const prompt = `
            I need the following information in JSON format, with only numerical values:
            {
                "water_quality": "<Water Quality Value percentage>",
                "air_quality": "<Air Quality Index>",
                "number_of_clinics": "<Number of Clinics>",
                "number_of_doctors": "<Number of Doctors>"
            }
            Please provide the values specifically for the city of ${city} and the country of ${country}.
        `;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        };

        const body = JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 150,
        });

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body,
            });

            const dataResponse = await response.json();
            const content = dataResponse.choices[0].message.content;
            const result = JSON.parse(content);
            setData(result);
        } catch (error) {
            console.error('Error fetching data from ChatGPT:', error);
        }
    };

    return (
        <Card
            sx={({ breakpoints }) => ({
                height: '100%', // Allows the card to expand to fill available space
                maxHeight: '100vh', // Prevents it from exceeding the viewport height
                [breakpoints.up('xxl')]: {
                    height: 'auto', // Allow auto height for larger screens
                }
            })}>
            <VuiBox display='flex' flexDirection='column' sx={{ height: '100%' }}>
                <VuiTypography variant='lg' color='white' fontWeight='bold' mb='6px'>
                    Your Location
                </VuiTypography>
                <VuiTypography variant='button' color='text' fontWeight='regular' mb='30px'>
                    A few suggestions based on your location.
                </VuiTypography>
                <Stack
                    spacing='24px'
                    background='#fff'
                    sx={({ breakpoints }) => ({
                        [breakpoints.up('sm')]: {
                            flexDirection: 'column'
                        },
                        [breakpoints.up('md')]: {
                            flexDirection: 'row'
                        },
                        [breakpoints.only('xl')]: {
                            flexDirection: 'column'
                        }
                    })}>
                    <VuiBox
                        display='flex'
                        flexDirection='column'
                        justifyContent='center'
                        sx={({ breakpoints }) => ({
                            [breakpoints.only('sm')]: {
                                alignItems: 'center'
                            }
                        })}
                        alignItems='center'>
                        <VuiBox sx={{
                            width: '100%',
                            height: '350px',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        }}>
                            <iframe
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight="0"
                                marginWidth="0"
                                src={mapSrc}
                                title="Google Map"
                            >
                                <a href="https://www.gps.ie/">gps systems</a>
                            </iframe>
                        </VuiBox>
                        <VuiBox
                            display='flex'
                            justifyContent='center'
                            flexDirection='column'
                            sx={{ textAlign: 'center' }}>
                            <VuiTypography color='white' variant='lg' fontWeight='bold' mb='2px' mt='18px'>
                                Country: {geoInfo.country ? geoInfo.country : 'Loading...'}
                            </VuiTypography>
                            <VuiTypography color='white' variant='lg' fontWeight='bold' mb='2px' mt='18px'>
                                City: {geoInfo.city ? geoInfo.city : 'Loading...'}
                            </VuiTypography>
                        </VuiBox>
                    </VuiBox>
                    <Grid
                        container
                        sx={({ breakpoints }) => ({
                            spacing: '24px',
                            [breakpoints.only('sm')]: {
                                columnGap: '0px',
                                rowGap: '24px'
                            },
                            [breakpoints.up('md')]: {
                                gap: '24px',
                                ml: '50px !important'
                            },
                            [breakpoints.only('xl')]: {
                                gap: '12px',
                                mx: 'auto !important'
                            }
                        })}>
                        {/* Water Quality Card */}
                        <Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
                            <VuiBox
                                display='flex'
                                p='18px'
                                alignItems='center'
                                sx={{
                                    background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                                    minHeight: '110px',
                                    borderRadius: '20px'
                                }}>
                                <VuiBox display='flex' flexDirection='column' mr='auto'>
                                    <VuiTypography color='text' variant='caption' fontWeight='medium' mb='2px'>
                                        Water Quality Index 
                                    </VuiTypography>
                                    <VuiTypography
                                        color='white'
                                        variant='h4'
                                        fontWeight='bold'
                                        sx={({ breakpoints }) => ({
                                            [breakpoints.only('xl')]: {
                                                fontSize: '20px'
                                            }
                                        })}>
                                        {data.water_quality}
                                    </VuiTypography>
                                </VuiBox>
                                <Grid item xs={4}>
                                    <VuiBox
                                        bgColor="#0075FF"
                                        color="white"
                                        width="3rem"
                                        height="3rem"
                                        marginLeft="auto"
                                        borderRadius="lg"
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        shadow="md"
                                    >
                                        <Icon fontSize="small" color="inherit">
                                            <FaHandHoldingWater size="20px" color="white" /> 
                                        </Icon>
                                    </VuiBox>
                                </Grid>
                            </VuiBox>
                        </Grid>
                        {/* Air Quality Card */}
                        <Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
                            <VuiBox
                                display='flex'
                                p='18px'
                                alignItems='center'
                                sx={{
                                    background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                                    borderRadius: '20px'
                                }}>
                                <VuiBox display='flex' flexDirection='column' mr='auto'>
                                    <VuiTypography color='text' variant='caption' fontWeight='medium' mb='2px'>
                                        Air Quality Index 
                                    </VuiTypography>
                                    <VuiTypography
                                        color='white'
                                        variant='h4'
                                        fontWeight='bold'
                                        sx={({ breakpoints }) => ({
                                            [breakpoints.only('xl')]: {
                                                fontSize: '20px'
                                            }
                                        })}>
                                        {data.air_quality}
                                    </VuiTypography>
                                </VuiBox>
                                <Grid item xs={4}>
                                    <VuiBox
                                        bgColor="#0075FF"
                                        color="white"
                                        width="3rem"
                                        height="3rem"
                                        marginLeft="auto"
                                        borderRadius="lg"
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        shadow="md"
                                    >
                                        <Icon fontSize="small" color="inherit">
                                            <FaEarthAsia size="20px" color="white" />
                                        </Icon>
                                    </VuiBox>
                                </Grid>
                            </VuiBox>
                        </Grid>
                        {/* Clinics Card */}
                        <Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
                            <VuiBox
                                display='flex'
                                p='18px'
                                alignItems='center'
                                sx={{
                                    background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                                    borderRadius: '20px'
                                }}>
                                <VuiBox display='flex' flexDirection='column' mr='auto'>
                                    <VuiTypography color='text' variant='caption' fontWeight='medium' mb='2px'>
                                        Number of Clinics 
                                    </VuiTypography>
                                    <VuiTypography
                                        color='white'
                                        variant='h4'
                                        fontWeight='bold'
                                        sx={({ breakpoints }) => ({
                                            [breakpoints.only('xl')]: {
                                                fontSize: '20px'
                                            }
                                        })}>
                                        {data.number_of_clinics}
                                    </VuiTypography>
                                </VuiBox>
                                <Grid item xs={4}>
                                    <VuiBox
                                        bgColor="#0075FF"
                                        color="white"
                                        width="3rem"
                                        height="3rem"
                                        marginLeft="auto"
                                        borderRadius="lg"
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        shadow="md"
                                    >
                                        <Icon fontSize="small" color="inherit">
                                            <FaBriefcaseMedical size="20px" color="white" />
                                        </Icon>
                                    </VuiBox>
                                </Grid>
                            </VuiBox>
                        </Grid>
                        {/* Doctors Card */}
                        <Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
                            <VuiBox
                                display='flex'
                                p='18px'
                                alignItems='center'
                                sx={{
                                    background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                                    borderRadius: '20px'
                                }}>
                                <VuiBox display='flex' flexDirection='column' mr='auto'>
                                    <VuiTypography color='text' variant='caption' fontWeight='medium' mb='2px'>
                                        Number of Doctors 
                                    </VuiTypography>
                                    <VuiTypography
                                        color='white'
                                        variant='h4'
                                        fontWeight='bold'
                                        sx={({ breakpoints }) => ({
                                            [breakpoints.only('xl')]: {
                                                fontSize: '20px'
                                            }
                                        })}>
                                        {data.number_of_doctors}
                                    </VuiTypography>
                                </VuiBox>
                                <Grid item xs={4}>
                                    <VuiBox
                                        bgColor="#0075FF"
                                        color="white"
                                        width="3rem"
                                        height="3rem"
                                        marginLeft="auto"
                                        borderRadius="lg"
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        shadow="md"
                                    >
                                        <Icon fontSize="small" color="inherit">
                                            <FaUserDoctor size="20px" color="white" />
                                        </Icon>
                                    </VuiBox>
                                </Grid>
                            </VuiBox>
                        </Grid>
                    </Grid>
                </Stack>
            </VuiBox>
        </Card>
    );
};

export default MainProfile;