import React, { useEffect, useState } from "react";
import { Card, Icon } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firestore imports
import gif from "assets/images/cardimgfree.png";

const WelcomeMark = () => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const auth = getAuth(); // Initialize Firebase Auth
    const db = getFirestore(); // Initialize Firestore

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.email); // Firestore document reference
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            // Document found
            const userData = docSnap.data();
            console.log("User data:", userData); // Log user data to check if it's fetched correctly
            setUserName(userData.name); // Adjust the field name if necessary
          } else {
            console.error("No such document!"); // Document does not exist
            setUserName(user.displayName || user.email); // Fallback to displayName or email
          }
        } catch (error) {
          console.error("Error fetching document:", error); // Log any errors
          setUserName(user.displayName || user.email); // Fallback
        }
      } else {
        setUserName("Guest"); // Change fallback to "Guest" for better UX
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
            <br /> 
          </VuiTypography>
        </VuiBox>
        
      </VuiBox>
    </Card>
  );
};

export default WelcomeMark;