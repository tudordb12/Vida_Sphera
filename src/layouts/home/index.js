// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card, LinearProgress, Stack } from "@mui/material";

// Vision UI Dashboard React components
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
// Vision UI Dashboard React example components
import HomeLayout from "examples/LayoutContainers/HomeLayout";
import HomeNavbar from "examples/Navbars/HomeNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";
import bgAdmin from "assets/images/body-background.png";
import homepage from "assets/images/homepage.jpg";
// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Dashboard layout components
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";



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

function Home() {
  const { gradients } = colors;
  const { cardContent } = gradients;

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
          backgroundSize: "cover",  // Ensures the image covers the entire background
          backgroundPosition: "center",  // Centers the image
          backgroundRepeat: "no-repeat",  // Prevents image repetition
          minHeight: "100vh", 
           // Ensures full height for the container
        }}
      >
         <HomeNavbar />
        <VuiBox mb={120}>
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={0} md={0} xl={0}>
              <VuiTypography variant="h1" color="light">
                V I D A S P H E R A
              </VuiTypography>
            </Grid>
          </Grid>
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={0} md={0} xl={0}>
              <VuiTypography variant="subtitle1" color="second">
                Health made simple.
              </VuiTypography>
            </Grid>
          </Grid>
        </VuiBox>

        <VuiBox mb={3} sx={{ pl: 10, pr: 10, pt: 0, pb: 0 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} xl={7} sx={{ pl: 100, pr: 0, pt: 0, pb: 0 }}>
              <GradientBorder
                minWidth="100%"
                padding="1px"
                borderRadius={borders.borderRadius.lg}
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <VuiInput type="email" placeholder="Your email..." fontWeight="500" size="large"/>
              </GradientBorder>
            </Grid>
            <Grid item xs={12} lg={6} xl={5}>
              <VuiBox mt={0} mb={1}>
                <VuiButton variant="gradient" color="info" size="large">
                  Get Started
                </VuiButton>
              </VuiBox>
            </Grid>
          </Grid>
        </VuiBox>

        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={6} lg={4}></Grid>
        </Grid>

        <Footer />
      </VuiBox>
    </HomeLayout>
  );
}

export default Home;