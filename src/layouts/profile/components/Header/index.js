import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Images
import burceMars from "assets/images/avatar-simmmple.png";  // Default image (optional)
import female from "assets/images/female.avif";
import male from "assets/images/male.avif";

//   base styles
import breakpoints from "assets/theme/base/breakpoints";

//   components
import VuiAvatar from "components/VuiAvatar";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

//   example components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [userData, setUserData] = useState(null); // State to store user data

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.lg
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    // The event listener that's calling the handleTabsOrientation function when resizing the window.
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  useEffect(() => {
    const auth = getAuth(); // Initialize Firebase Auth
    const db = getFirestore(); // Initialize Firestore

    const fetchUserData = async (email) => {
      try {
        const userDoc = doc(db, "users", email);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Listen to authentication state and fetch user data
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.email);
      } else {
        console.log("No user signed in");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  // Show loading state until userData is fetched
  if (!userData) {
    return <div>Loading...</div>;
  }

  // Choose avatar image based on user's gender
  const profileImage = userData.gender === "female" ? female : male;

  return (
    <VuiBox position="relative">
      <DashboardNavbar light />
      <Card
        sx={{
          px: 3,
          mt: 2,
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={({ breakpoints }) => ({
            [breakpoints.up("xs")]: {
              gap: "16px",
            },
            [breakpoints.up("xs")]: {
              gap: "0px",
            },
            [breakpoints.up("xl")]: {
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
                  alignItems: "center",
                },
              })}
            >
              {/* Replace with dynamic user data */}
              <VuiTypography variant="h1" color="white" fontWeight="bold">
                {userData.name}
              </VuiTypography>
              <VuiTypography variant="button" color="text" fontWeight="regular">
                {userData.email}
              </VuiTypography>
            </VuiBox>
          </Grid>

          <Grid item xs={12} md={6} lg={6.5} xl={6} xxl={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{ background: "transparent", display: "flex", justifyContent: "flex-end" }}
              >
                {/* Tabs content can be added here */}
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </Card>
    </VuiBox>
  );
}

export default Header;