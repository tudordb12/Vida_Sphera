import React, { useEffect, useState } from 'react';
import { Card, Stack, Grid } from '@mui/material'; // Import Grid for layout management
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import colors from 'assets/theme/base/colors';
import { FaEllipsisH } from 'react-icons/fa';
import linearGradient from 'assets/theme/functions/linearGradient';
import CircularProgress from '@mui/material/CircularProgress';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function IdealBodyW() {
    const { info, gradients } = colors;
    const { cardContent } = gradients;
    
    // State to hold BMR, IBW, and BFP values
    const [bmr, setBmr] = useState(0);
    const [ibw, setIbw] = useState(0);
    const [bfp, setBfp] = useState(0);

    // Function to calculate BMR using Mifflin-St Jeor Equation
    const calculateBMR = (weight, height, age, gender) => {
        if (gender === 'male') {
            return Math.round(10 * weight + 6.25 * height - 5 * age + 5);
        } else {
            return Math.round(10 * weight + 6.25 * height - 5 * age - 161);
        }
    };

    // Function to calculate IBW (Ideal Body Weight) using Devine formula
    const calculateIBW = (height, gender) => {
        return gender === "male" ? Math.round(50 + 0.91 * (height - 152.4)) : Math.round(45.5 + 0.91 * (height - 152.4));
    };

    // Function to calculate BFP (Body Fat Percentage)
    const calculateBFP = (weight, height, age, gender) => {
        const bmi = weight / Math.pow(height / 100, 2); // BMI calculation
        if (gender === "male") {
            return Math.round(1.20 * bmi + 0.23 * age - 16.2);
        } else {
            return Math.round(1.20 * bmi + 0.23 * age - 5.4);
        }
    };

    // Fetch user data from Firestore
    useEffect(() => {
        const auth = getAuth();
        const db = getFirestore();

        const fetchData = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const userEmail = user.email;
                    try {
                        const userQuery = query(collection(db, 'users'), where('email', '==', userEmail));
                        const querySnapshot = await getDocs(userQuery);

                        if (!querySnapshot.empty) {
                            const userDoc = querySnapshot.docs[0].data();
                            const { weight, height, birthdate, gender } = userDoc;

                            // Calculate age from birthYear
                            const currentYear = new Date().getFullYear();
                            const age = currentYear - birthdate;

                            if (weight && height && birthdate && gender) {
                                const calculatedBMR = calculateBMR(weight, height, age, gender);
                                const calculatedIBW = calculateIBW(height, gender);
                                const calculatedBFP = calculateBFP(weight, height, age, gender);

                                setBmr(calculatedBMR);
                                setIbw(calculatedIBW);
                                setBfp(calculatedBFP);
                            } else {
                                console.error('One or more values are undefined!', { weight, height, birthdate, gender });
                            }
                        } else {
                            console.error('No user document matching the email found!');
                        }
                    } catch (error) {
                        console.error('Error fetching user data:', error);
                    }
                } else {
                    console.error('No user is signed in.');
                }
            });
        };

        fetchData();
    }, []);

    return (
        <Card
            sx={{
                height: '100%',
                background: linearGradient(gradients.cardDark.main, gradients.cardDark.state, gradients.cardDark.deg)
            }}>
            <VuiBox sx={{ width: '100%' }}>
                <VuiBox
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    sx={{ width: '100%' }}
                    mb='40px'>
                    <VuiTypography variant='lg' color='white' mr='auto' fontWeight='bold'>
                        Your Body Metrics
                    </VuiTypography>
                    <VuiBox
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        bgColor='#22234B'
                        sx={{ width: '37px', height: '37px', cursor: 'pointer', borderRadius: '12px' }}>
                        <FaEllipsisH color={info.main} size='18px' />
                    </VuiBox>
                </VuiBox>
                
                {/* Grid Layout to position BMR, IBW on the left and CircularProgress on the right */}
                <Grid container spacing={2}>
                    {/* Left Section: BMR and IBW */}
                    <Grid item xs={12} md={6} lg={6}>
                        <Stack direction='row' spacing={2} mb={2}>
                            {/* BMR Display */}
                            <VuiBox
                                display='flex'
                                width='220px'
                                p='20px 22px'
                                flexDirection='column'
                                sx={{
                                    background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                                    borderRadius: '20px'
                                }}>
                                <VuiTypography color='text' variant='button' fontWeight='regular' mb='5px'>
                                    Basal Metabolic Rate (BMR)
                                </VuiTypography>
                                <VuiTypography color='white' variant='lg' fontWeight='bold'>
                                    {bmr} kcal
                                </VuiTypography>
                            </VuiBox>
                            {/* IBW Display */}
                            <VuiBox
                                display='flex'
                                width='220px'
                                p='20px 22px'
                                flexDirection='column'
                                sx={{
                                    background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                                    borderRadius: '20px'
                                }}>
                                <VuiTypography color='text' variant='button' fontWeight='regular' mb='5px'>
                                    Ideal Body Weight (IBW)
                                </VuiTypography>
                                <VuiTypography color='white' variant='lg' fontWeight='bold'>
                                    {ibw} kg
                                </VuiTypography>
                            </VuiBox>
                        </Stack>
                    </Grid>

                    {/* Right Section: Circular Progress Indicator */}
                    <Grid item xs={12} md={6} lg={6}>
                        <VuiBox sx={{ position: 'relative', display: 'inline-flex' }}>
                            <CircularProgress
                                variant='determinate'
                                value={bfp} // Use BFP value for circular progress
                                size={window.innerWidth >= 1024 ? 200 : window.innerWidth >= 768 ? 170 : 200}
                                color='warning'
                            />
                            <VuiBox
                                sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                <VuiBox display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                                    <VuiTypography color='text' variant='button' mb='4px'>
                                        Body Fat Percentage
                                    </VuiTypography>
                                    <VuiTypography
                                        color='white'
                                        variant='h5'
                                        fontWeight='bold'
                                        mb='4px'>
                                        {bfp}%
                                    </VuiTypography>
                                </VuiBox>
                            </VuiBox>
                        </VuiBox>
                    </Grid>
                </Grid>
            </VuiBox>
        </Card>
    );
}

export default IdealBodyW;