
import React from 'react'; 


import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { Link } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth"; 

import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { FormControl, FormControlLabel, Radio, FormLabel, Box } from '@mui/material'; // Ensure these imports are present

import { FaApple, FaFacebook, FaGoogle, FaHeartbeat } from "react-icons/fa";


import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";


import rgba from "assets/theme/functions/rgba";



import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";


import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgSignIn from "assets/images/signUpImage.png";
import bgSignIn2 from "assets/images/step.svg";
import { number } from "prop-types";
import { BsHeart } from "react-icons/bs";
import { Phone } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import { db } from "../../../firebase/firebase"; // Your Firestore instance
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";



function Step2() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [month, setDate] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState(null);
  const [gender, setGender] = useState("");
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = async () => {
    const auth = getAuth();
    const user = auth.currentUser; // Get the currently logged-in user

    // Check if the user is authenticated
    if (!user) {
      setError("User is not authenticated. Please log in.");
      return;
    }

    if (!phone || !country || !birthdate) {
      setError("Please fill out all fields");
      return;
    }

    const formData = {
      gender,
      birthdate,
      country,
      phone,
      email: user.email, // Optional: Store user's email along with the data
    };

    try {
      // Save the form data under the user's document in Firestore
      await setDoc(doc(db, "users", user.uid), formData, { merge: true });

      // Navigate to the next step after successful submission
      navigate("/next-step");
    } catch (e) {
      console.error("Error adding document: ", e);
      setError("There was an error submitting your data. Please try again.");
    }
  };



  const GenderSelection = () => {
    const [gender, setGender] = React.useState('male'); // Initialize gender state
    const [error, setError] = React.useState(''); // Initialize error state if needed
  
    return (
      
      <FormControl component="fieldset" sx={{ padding: 1 }}> {/* Add padding to the FormControl */}
        <Box display="flex" justifyContent="center" alignItems="center"> {/* Center the items */}
          <FormControlLabel
            control={
              <Radio
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
                sx={{ 
                  color: "white", // Color of the radio button when unselected
                  '&.Mui-checked': {
                    color: 'white', // Color of the radio button when selected
                  },
                  '&.MuiRadio-root': {
                    '&:not(.Mui-checked)': {
                      // Add a border when unselected
                      border: '1px solid white',
                      borderRadius: '50%', // Make it round
                      width: '20px', // Adjust size
                      height: '20px', // Adjust size
                    }
                  },
                }} 
              />
            }
            label={
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Male
              </VuiTypography>
            }
            sx={{ margin: 1 }} // Add margin for spacing
          />
          <FormControlLabel
            control={
              <Radio
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
                sx={{ 
                  color: "white", // Color of the radio button when unselected
                  '&.Mui-checked': {
                    color: 'white', // Color of the radio button when selected
                  },
                  '&.MuiRadio-root': {
                    '&:not(.Mui-checked)': {
                      // Add a border when unselected
                      border: '1px solid white',
                      borderRadius: '50%', // Make it round
                      width: '20px', // Adjust size
                      height: '20px', // Adjust size
                    }
                  },
                }} 
              />
            }
            label={
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Female
              </VuiTypography>
            }
            sx={{ margin: 1 }} // Add margin for spacing
          />
          <FormControlLabel
            control={
              <Radio
                value="other"
                checked={gender === "other"}
                onChange={(e) => setGender(e.target.value)}
                sx={{ 
                  color: "white", // Color of the radio button when unselected
                  '&.Mui-checked': {
                    color: 'white', // Color of the radio button when selected
                  },
                  '&.MuiRadio-root': {
                    '&:not(.Mui-checked)': {
                      // Add a border when unselected
                      border: '1px solid white',
                      borderRadius: '50%', // Make it round
                      width: '20px', // Adjust size
                      height: '20px', // Adjust size
                    }
                  },
                }} 
              />
            }
            label={
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Other
              </VuiTypography>
            }
            sx={{ margin: 1 }} // Add margin for spacing
          />
        </Box>
        {error && ( // Conditionally render error message
          <VuiTypography color="error" fontWeight="bold" textAlign="center">
            {error}
          </VuiTypography>
        )}
      </FormControl>
    );
  };



  const MonthPicker = () => {

    const [date, setDate] = useState('');
  
    return (
      <GradientBorder
        minWidth="100%"
        borderRadius={borders.borderRadius.lg}
        padding="1px"
        backgroundImage={radialGradient(
          palette.gradients.borderLight.main,
          palette.gradients.borderLight.state,
          palette.gradients.borderLight.angle
        )}
      >
        <VuiInput
          type="month"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={({ typography: { size } }) => ({
            fontSize: size.sm,
          })}
        />
      </GradientBorder>
    );
  };

  const CountryPicker = () => {

   // const [date, setCountry] = useState('');
  
    
      const [selected, setSelected] = useState("");

      return(
<ReactFlagsSelect
        selected={selected}
        onSelect={(code) => setSelected(code)}
        searchable
        searchPlaceholder='Search your Contry'
        placeholder='Select Country'
      />
      );
    
  };

  const PhoneInput = () => {
    const [phone, setPhoneNumber] = useState(''); // Manage the phone input state
  
    const handlePhoneChange = (event) => {
      setPhoneNumber(event.target.value); // Update state with the input value
    };
  
    return (
      <VuiBox mb={2}>
        {/* Label for the input */}
        <VuiBox mb={1} ml={0.5}>
          <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
            Phone Number
          </VuiTypography>
        </VuiBox>
  
        {/* Gradient border wrapper */}
        <GradientBorder
          minWidth="100%"
          borderRadius={borders.borderRadius.lg}
          padding="1px"
          backgroundImage={radialGradient(
            palette.gradients.borderLight.main,
            palette.gradients.borderLight.state,
            palette.gradients.borderLight.angle
          )}
        >
          {/* Input field */}
          <VuiInput
            type="tel" // Set input type to phone
            placeholder="Phone" // Placeholder text
            value={phone} // Bind input to state
            onChange={handlePhoneChange} // Update state on change
            sx={{
              color: 'white', // Make the text color white
              backgroundColor: '#0f143c', // Match the dark theme background
            }}
          />
        </GradientBorder>
      </VuiBox>
    );
  };

  return (
    <CoverLayout
      title="Your Details"
      color="white"
      description="Please enter your personal information so we can tailor your experience :)"
      image={bgSignIn2}
      premotto="PERSONAL HEALTH TO THE NEXT LEVEL"
      motto="VIDA SPHERA"
      cardContent
    >
      <GradientBorder borderRadius={borders.borderRadius.form} minWidth="100%" maxWidth="100%">
        <VuiBox
          component="form"
          role="form"
          borderRadius="inherit"
          p="45px"
          sx={({ palette: { secondary } }) => ({
            backgroundColor: secondary.focus,
          })}
        >
          
          {error && (
            <VuiTypography color="error" fontWeight="bold" textAlign="center">
              {error}
            </VuiTypography>
          )}
          <VuiTypography
            color="white"
            fontWeight="bold"
            textAlign="center"
            mb="24px"
            sx={({ typography: { size } }) => ({
              fontSize: size.lg,
            })}
          >
           Your Details
          </VuiTypography>
          <Stack mb="25px" justifyContent="center" alignItems="center" direction="row" spacing={2}>
            
            <GradientBorder borderRadius="xl">
              <a href="#">
                <IconButton
                  transition="all .25s ease"
                  justify="center"
                  align="center"
                  bg="rgb(19,21,54)"
                  borderradius="15px"
                  sx={({ palette: { secondary }, borders: { borderRadius } }) => ({
                    borderRadius: borderRadius.xl,
                    padding: "25px",
                    backgroundColor: secondary.focus,
                    "&:hover": {
                      backgroundColor: rgba(secondary.focus, 0.9),
                    },
                  })}
                >
                  <Icon
                    as={FaHeartbeat}
                    w="30px"
                    h="30px"
                    sx={({ palette: { white } }) => ({
                      color: white.focus,
                    })}
                  />
                </IconButton>
              </a>
            </GradientBorder>
            
          </Stack>
          <VuiBox mb={0}>
          <VuiBox mb={0} ml={0.5}>
          <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Gender
              </VuiTypography>
          <GenderSelection></GenderSelection>
          </VuiBox>
          </VuiBox>
          <VuiBox mb={2}>
          <VuiBox mb={2} ml={0.5}>
          <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Birthdate
              </VuiTypography>
          <MonthPicker></MonthPicker>
          </VuiBox>
          </VuiBox>
          <CountryPicker></CountryPicker>
         <PhoneInput></PhoneInput>
          
          <VuiBox mt={4} mb={1}>
            <VuiButton color="info" fullWidth onClick={handleSubmit}>
              NEXT
            </VuiButton>
          </VuiBox>
          
        </VuiBox>
      </GradientBorder>
    </CoverLayout>
  );
}

export default Step2;