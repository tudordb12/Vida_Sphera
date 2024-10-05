import React, { useEffect, useState } from "react";
import { Card, CircularProgress } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import { IoBodySharp } from "react-icons/io5";
import colors from "assets/theme/base/colors";
import linearGradient from "assets/theme/functions/linearGradient";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const BMI = () => {
  const [height, setHeight] = useState(null);  // Store height
  const [weight, setWeight] = useState(null);  // Store weight
  const [bmi, setBmi] = useState(null);        // Store calculated BMI

  useEffect(() => {
    const auth = getAuth(); // Initialize Firebase Auth
    const db = getFirestore(); // Initialize Firestore

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.email); // Firestore document reference
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data(); // Get the document data
            const heightInMeters = userData.height / 100; // Convert height to meters
            setHeight(heightInMeters);  // Update height state
            setWeight(userData.weight);  // Update weight state

            // Calculate and update BMI
            const calculatedBmi = userData.weight / (heightInMeters * heightInMeters);
            setBmi(calculatedBmi.toFixed(2)); // Set BMI and round to 2 decimal places
          } else {
            console.error("No such document!"); // Document does not exist
          }
        } catch (error) {
          console.error("Error fetching document:", error); // Log any errors
        }
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Determine the BMI status (Underweight, Normal, Overweight)
  const getBmiStatus = () => {
    if (!bmi) return null;
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) {
      return { status: "Underweight", color: "#e31a1a" };  // Use Error color (red)
    } else if (bmiValue >= 18.5 && bmiValue < 24.5) {
      return { status: "Normal", color: "#01b574" };  // Use Success color (green)
    } else {
      return { status: "Overweight", color: "#e31a1a" };  // Use Error color (red)
    }
  };

  const bmiStatus = getBmiStatus(); // Get the BMI status

  const { info, gradients } = colors;
  const { cardContent } = gradients;

    // Calculate circular progress value between 0 and 100
	const minBmi = 12;
	const maxBmi = 53;
  
	const progressValue = bmi ? Math.min(Math.max(((bmi - minBmi) / (maxBmi - minBmi)) * 100, 0), 100) : 0;
  
	let category = '';
	let color = 'info'; // Default to "info"
  
	if (bmi) {
	  if (bmi < 18.5) {
		category = 'info';
		color = error.main; // Set color to "error"
	  } else if (bmi < 24.5) {
		category = "Normal";
		color = 'info'; // Set color to "info"
	  } else {
		category = "Overweight";
		color = 'error'; // Set color to "error"
	  }
	}


  return (
    <Card sx={{ height: "340px" }}>
      <VuiBox display="flex" flexDirection="column">
        <VuiTypography variant="lg" color="white" fontWeight="bold" mb="4px">
          Your BMI
        </VuiTypography>
        <VuiTypography variant="button" color="text" fontWeight="regular" mb="20px">
          Body mass index
        </VuiTypography>
        <VuiBox sx={{ alignSelf: "center", justifySelf: "center", zIndex: "-1" }}>
          <VuiBox sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress variant="determinate" value={progressValue} size={170} color={color} />
            <VuiBox
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <VuiBox
                sx={{
                  background: info.main,
                  transform: "translateY(-50%)",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IoBodySharp size="30px" color="#fff" />
              </VuiBox>
            </VuiBox>
          </VuiBox>
        </VuiBox>
        <VuiBox
          sx={({ breakpoints }) => ({
            width: "90%",
            padding: "18px 22px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            height: "82px",
            mx: "auto",
            borderRadius: "20px",
            background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
            transform: "translateY(-90%)",
            zIndex: "1000",
          })}
        >
          <VuiTypography color="text" variant="caption" display="inline-block" fontWeight="regular">
            14
          </VuiTypography>
          <VuiBox
            flexDirection="column"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ minWidth: "80px" }}
          >
            <VuiTypography color="white" variant="h3">
              {bmi ? `${bmi}` : "Calculating..."} {/* Display BMI or fallback */}
            </VuiTypography>
            {bmiStatus && (
              <VuiTypography
                variant="caption"
                fontWeight="regular"
                sx={{ color: bmiStatus.color }} // Inline style for dynamic color using predefined colors
              >
                {bmiStatus.status} {/* Display status */}
              </VuiTypography>
            )}
          </VuiBox>
          <VuiTypography color="text" variant="caption" display="inline-block" fontWeight="regular">
            53
          </VuiTypography>
        </VuiBox>
      </VuiBox>
    </Card>
  );
};

export default BMI;