import React, { useEffect, useState } from "react";
import { Card, Icon } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import the correct Firebase Auth method
import gif from "assets/images/cardimgfree.png";

const WelcomeMark = () => {
  const [userName, setUserName] = useState(null);

  // Fetch the current signed-in user
  useEffect(() => {
    const auth = getAuth(); // Initialize Firebase Auth

    // Add listener for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If the user is signed in, set the display name or email
        setUserName(user.displayName || user.email); // Use the display name if available, else use the email
      } else {
        // No user is signed in, set a fallback name
        setUserName(null);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <Card
      sx={() => ({
        height: "340px",
        py: "32px",
        backgroundImage: `url(${gif})`,
        backgroundSize: "cover",
        backgroundPosition: "50%",
      })}
    >
      <VuiBox
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <VuiBox>
          <VuiTypography
            color="text"
            variant="button"
            fontWeight="regular"
            mb="12px"
          >
            Welcome back,
          </VuiTypography>
          <VuiTypography
            color="white"
            variant="h3"
            fontWeight="bold"
            mb="18px"
          >
            {userName ? userName : "User"} {/* Display user's name or a fallback */}
          </VuiTypography>
          <VuiTypography
            color="text"
            variant="h6"
            fontWeight="regular"
            mb="auto"
          >
            Glad to see you again!
            <br /> Ask me anything.
          </VuiTypography>
        </VuiBox>
        <VuiTypography
          component="a"
          href="#"
          variant="button"
          color="white"
          fontWeight="regular"
          sx={{
            mr: "5px",
            display: "inline-flex",
            alignItems: "center",
            cursor: "pointer",

            "& .material-icons-round": {
              fontSize: "1.125rem",
              transform: `translate(2px, -0.5px)`,
              transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
            },

            "&:hover .material-icons-round, &:focus  .material-icons-round": {
              transform: `translate(6px, -0.5px)`,
            },
          }}
        >
          Tap to record
          <Icon sx={{ fontWeight: "bold", ml: "5px" }}>arrow_forward</Icon>
        </VuiTypography>
      </VuiBox>
    </Card>
  );
};

export default WelcomeMark;