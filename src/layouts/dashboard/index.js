// @mui material components
import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card, LinearProgress, Stack } from "@mui/material";

//   components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";

//   example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

//   base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Dashboard layout components
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import Projects from "layouts/dashboard/components/Projects";
import BMI from "layouts/dashboard/components/BMI";
import SleepDebt from "layouts/dashboard/components/SleepDebt";

// React icons
import { IoIosRocket } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { IoGlobe } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

// Data
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";
import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import { barChartDataDashboard } from "layouts/dashboard/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore"; // Ensure all Firestore imports are present
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";


function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;
  const [recommendations, setRecommendations] = useState({
    recommendation1: "Loading...",
    recommendation2: "Loading...",
    recommendation3: "Loading...",
    recommendation4: "Loading..."
  });

  useEffect(() => {
    const fetchUserDataAndRecommendations = async () => {
      const auth = getAuth();
      const db = getFirestore();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userEmail = user.email; // Get the authenticated user's email
          try {
            // Fetch the user document from Firestore
            const userQuery = query(collection(db, 'users'), where('email', '==', userEmail));
            const querySnapshot = await getDocs(userQuery);

            if (!querySnapshot.empty) {
              const userDoc = querySnapshot.docs[0];
              const userData = userDoc.data(); // Extract user data

              // Prepare data for ChatGPT recommendations
              const prompt = `Provide 4 personalized health recommendations, consisting of maximum 2 sentences, 1 about diet, 1 about sleep wellness and 2 more other recommendations for today based on the following user data: 
              - Birth year: ${userData.birthYear}
              - Sleep time: ${userData.sleepTime} hours
              - Medical history: ${userData.medicalHistory}
              - Allergies: ${userData.allergies}
              - Gender: ${userData.gender}
              - Weight: ${userData.weight} kg
              - Dietary preferences: ${userData.dietary}.

             There must be 4 in total`;
             const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
             console.log("OpenAI API Key:", process.env.REACT_APP_OPENAI_API_KEY);
              // Make a request to the ChatGPT API
              const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 100,
                temperature: 0.7
              }, {
                headers: {
                  'Authorization': `Bearer ${apiKey}` // Use your API key here
                }
              });

              // Process the recommendations
              const recommendationsData = response.data.choices[0].message.content.split("\n").filter(Boolean);
              setRecommendations({
                recommendation1: recommendationsData[0] || "Recommendation not available",
                recommendation2: recommendationsData[1] || "Recommendation not available",
                recommendation3: recommendationsData[2] || "Recommendation not available",
                recommendation4: recommendationsData[3] || "Recommendation not available"
              });
            } else {
              console.error('No user document matching the email found!');
            }
          } catch (error) {
            console.error('Error fetching user data or recommendations:', error);
          }
        } else {
          console.error('No user is signed in.');
        }
      });
    };

    fetchUserDataAndRecommendations();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
      <VuiTypography
            color="white"
            variant="h1"
            fontWeight="normal"
            mb="12px"
          >
           Your Personalised Tips & Stats
          </VuiTypography>
        <VuiBox mb={3}>
        <VuiBox mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} lg={12} xl={5}>
             
            </Grid>
          </Grid>
        </VuiBox>
        <Grid container spacing={3}>
            {/* Replace statistic cards with health recommendations */}
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Health Recommendation 1", fontWeight: "regular" }}
                count={recommendations.recommendation1}
                percentage={{ color: "success", text: "" }}
                icon={{ color: "info", component: <IoHeart size="22px" color="white" /> }} // Optional, can be removed
              />
            </Grid>

            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Health Recommendation 2", fontWeight: "regular" }}
                count={recommendations.recommendation2}
                percentage={{ color: "success", text: "" }}
                icon={{ color: "error", component: <IoHeart size="22px" color="white" /> }} // Optional, can be removed
              />
            </Grid>

            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Health Recommendation 3", fontWeight: "regular" }}
                count={recommendations.recommendation3}
                percentage={{ color: "success", text: "" }}
                icon={{ color: "info", component: <IoHeart size="22px" color="white" /> }} // Optional, can be removed
              />
            </Grid>

            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Health Recommendation 4", fontWeight: "regular" }}
                count={recommendations.recommendation4}
                percentage={{ color: "success", text: "" }}
                icon={{ color: "info", component: <IoHeart size="22px" color="white" /> }} // Optional, can be removed
              />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} lg={12} xl={5}>
              <WelcomeMark />
            </Grid>
            <Grid item xs={12} lg={6} xl={3}>
              <BMI />
            </Grid>
            <Grid item xs={12} lg={6} xl={4}>
              <SleepDebt/>
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} xl={7}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Unhealthy Sleep Schedule vs Healthy Sleep Schedule
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      +50% improved{" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox sx={{ height: "310px" }}>
                    <LineChart
                      lineChartData={lineChartDataDashboard}
                      lineChartOptions={lineChartOptionsDashboard}
                    />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6} xl={5}>
              <Card>
                <VuiBox>
                  <VuiBox
                    mb="24px"
                    height="220px"
                    sx={{
                      background: linearGradient(
                        cardContent.main,
                        cardContent.state,
                        cardContent.deg
                      ),
                      borderRadius: "20px",
                    }}
                  >
                    <BarChart
                      barChartData={barChartDataDashboard}
                      barChartOptions={barChartOptionsDashboard}
                    />
                  </VuiBox>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Active Users
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      (+23){" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        than last week
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <Grid container spacing="50px">
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <IoWallet color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Users
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        32,984
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <IoIosRocket color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Clicks
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        2,42M
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <FaShoppingCart color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Sales
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        2,400$
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <IoBuild color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Items
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        320
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                  </Grid>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
       
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;