import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import welcome from "assets/images/welcome-profile.png";
import profileImage from "assets/images/logo.svg";

import VuiAvatar from "components/VuiAvatar";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  
  return (
    <VuiBox position="relative" padding={2}> {/* Added exterior padding here */}
      <Card
        sx={{
          background: `url(${welcome})`,
          backgroundSize: "cover",
          borderRadius: "20px",
          height: 140,
          width: "100%",
          padding: "32px", // Increased interior padding to 32px
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="flex-start" // Align elements to the left
          sx={({ breakpoints }) => ({
            [breakpoints.up("xs")]: {
              gap: "16px",
            },
            [breakpoints.up("md")]: { // Adjust gap for larger screens
              gap: "0px",
            },
          })}
        >
          <Grid
            item
            xs={12}
            md={1.7}
            lg={1.5}
            xl={1.2}
            xxl={0.8}
            display="flex"
            sx={({ breakpoints }) => ({
              [breakpoints.only("sm")]: {
                justifyContent: "center",
                alignItems: "center",
              },
            })}
          >
            <VuiAvatar
              src={profileImage}  // Conditionally rendered profile image
              alt="profile-image"
              variant="rounded"
              size="xl"
              shadow="sm"
            />
          </Grid>

          <Grid item xs={12} md={4.3} lg={4} xl={3.8} xxl={7}>
            <VuiBox
              height="100%"
              mt={0.5}
              lineHeight={1}
              display="flex"
              flexDirection="column"
              sx={({ breakpoints }) => ({
                [breakpoints.only("sm")]: {
                  justifyContent: "center",
                  alignItems: "flex-start", // Align text to the left
                },
              })}
            >
              {/* Replace with dynamic user data */}
              <VuiTypography variant="h1" color="white" fontWeight="bold">
                Meet VIDA
              </VuiTypography>
              <VuiTypography variant="button" color="white" fontWeight="regular">
                Your Personal Health Assistant
              </VuiTypography>
            </VuiBox>
          </Grid>
        </Grid>
      </Card>
    </VuiBox>
  );
}

export default Header;