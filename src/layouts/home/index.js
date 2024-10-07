// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card, LinearProgress, Stack } from "@mui/material";

//   components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import welcome from "assets/images/welcome-profile.png";
import gif from "assets/images/cardimgfree.png";
//   example components
import HomeLayout from "examples/LayoutContainers/HomeLayout";
import HomeNavbar from "examples/Navbars/HomeNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";
import bgAdmin from "assets/images/homepage.jpg";
import homepage from "assets/images/homepage.jpg";
//   base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

import { useLocation, Link } from "react-router-dom";


// React icons
import { IoIosRocket } from "react-icons/io";
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

import homeimage from "assets/images/Home.png";



function Home() {
  const { gradients } = colors;
  const { cardContent } = gradients;
  const handleGetStartedClick = () => {
    // Navigate to the "Get Started" page, or any other functionality you need
    navigate('/authentication/sign-up'); // Redirect to the Get Started page
  };

  return (
    <HomeLayout>
      <VuiBox
        py={3}
        sx={{
          pl: 10,
          pr: 10,
          pt: 0,
          pb: 0,
          background: `url(${bgAdmin})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <HomeNavbar />
        <VuiBox mb={10}>
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item>
              <VuiTypography variant="h1" color="light" textAlign="center">
                V I D A S P H E R A
              </VuiTypography>
              <VuiTypography variant="subtitle1" color="light" textAlign="center">
                Manage your health like a Pro.
              </VuiTypography>
            </Grid>
          </Grid>

          {/* Centered column with image placeholder and Get Started button */}
          <Grid container spacing={3} justifyContent="center" alignItems="center" direction="column" mt={5}>
            <Grid item xs={12} md={8} lg={6}>
              {/* Image Card Placeholder */}
              <Card sx={{ p: 3, backgroundColor: "transparent" }}>
                <VuiBox
                  component="img"
                  src={homeimage}// Replace with the actual image or URL if available
                  alt="Image Placeholder"
                  width="100%"
                  borderRadius={borders.borderRadius.md}
                />
              </Card>
            </Grid>

            <Grid item xs={15} md={8} lg={10} mt={3}>
              {/* Get Started Button */}
              <Link to="/authentication/sign-up"> 
              <VuiButton variant="contained" color="black" size="large" fullWidth  >
                Get Started
              </VuiButton>
              </Link>
            </Grid>
          </Grid>
        </VuiBox>

        <Footer />
      </VuiBox>
    </HomeLayout>
  );
}

export default Home;