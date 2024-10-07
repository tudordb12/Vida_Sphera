// src/layouts/authentication/sign-up/index.js

import React from 'react'; 

import ReactFlagsSelect from "react-flags-select";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";  // Correct import from auth.js

import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

// Icons
import { FaUser, FaFacebook, FaGoogle } from "react-icons/fa";

//   components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

import { FormControl, FormControlLabel, Radio, FormLabel, Box, MenuItem, Select } from '@mui/material'; // Ensure these imports are present

import rgba from "assets/theme/functions/rgba";


//   Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgSignIn from "assets/images/cardimgfree3.png";
import bgSignIn2 from "assets/images/backdrop2.jpg";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase"; // Your Firestore instance
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
 // Import initialized Firebase auth

// Create or update a user document in Firestore


function SignUp() {
 const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState(""); // Renaming for clarity
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState(null);
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [medications, setMedications] = useState("");
  const [allergies, setAllergies] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [dietary, setDietary] = useState("");
  const [sleep, setSleep] = useState("");
  const [country, setCountry] = useState(""); // Add missing field

  // Function to toggle remember me
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  // Function to save user data to Firestore
  const saveUserData = async (email, data) => {
    const userRef = doc(db, "users", email);
    
    try {
      // Update the document if it already exists, or create a new one
      await setDoc(userRef, data, { merge: true });
    } catch (error) {
      console.error("Error saving user data:", error);
      setError("Failed to save user data.");
    }
  };

  // Function to handle sign-up
  const handleSignUp = async () => {
    if (password !== verifyPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // Create the user with email and password
      await doCreateUserWithEmailAndPassword(email, password);

      // Save all user data to Firestore after sign-up
      await saveUserData(email, {
        email,
        name,
        password,
        gender,
        birthdate,
        phone,
        weight,
        height,
        medicalHistory,
        medications,
        allergies,
        dietary,
        sleep,
      });

      // Redirect to the dashboard after successful sign-up
      window.location.href = "/authentication/dashboard";
    } catch (error) {
      console.error("Sign-up error:", error);
      setError(error.message);
    }
  };

  // Function to handle form submission (for updating existing user data)
  const handleSubmit = async () => {
    const auth = getAuth();
    const user = auth.currentUser; // Get the currently logged-in user

    if (!user) {
      setError("User is not authenticated. Please log in.");
      return;
    }

    // Ensure no fields are left empty
    if (!phone || !country || !birthdate || !height || !weight) {
      setError("Please fill out all required fields.");
      return;
    }

    const formData = {
      gender,
      birthdate,
      phone,
      email: user.email, // Capture user's email
      medicalHistory,
      medications,
      allergies,
      dietary,
      sleep,
      weight,
      height,
    };

    try {
      // Save form data to Firestore
      await setDoc(doc(db, "users", user.uid), formData, { merge: true });

      // Navigate to the next step after successful submission
      navigate("/next-step");
    } catch (e) {
      console.error("Error submitting form:", e);
      setError("There was an error submitting your data. Please try again.");
    }
  };

  const dropdownStyle = {
    color: 'white',
    backgroundColor: 'rgb(19,21,54)', // Dark blue background
    '&:hover': {
      backgroundColor: 'rgba(19, 21, 54, 0.9)',
    },
    '& .Mui-selected': {
      backgroundColor: 'rgba(19, 21, 54, 0.9)', // Dark blue highlight
    },
  };

  // Modified GenderSelection Component
  const GenderSelection = ({ gender, setGender }) => { // Accept props
    return (
      <FormControl component="fieldset" sx={{ padding: 1 }}> {/* Add padding to the FormControl */}
        <Box display="flex" justifyContent="center" alignItems="center"> {/* Center the items */}
          <FormControlLabel
            control={
              <Radio
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)} // Use setGender from props
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
                onChange={(e) => setGender(e.target.value)} // Use setGender from props
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
        </Box>
      </FormControl>
    );
  };

  const SleepInput = () => {
    const handleSleep = (event) => {
      const input = event.target.value;
      const numericInput = input.replace(/\D/g, ''); // Filter out non-numeric characters
      setSleep(numericInput); // Update state with the filtered numeric input
    };

    return (
      <VuiBox mb={2}>
        {/* Label for the input */}
        <VuiBox mb={1} ml={0.5}>
          <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
            How many hours of sleep? (in hours)
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
            placeholder="Sleep Hours" // Placeholder text
            value={sleep} // Bind input to state
            onChange={handleSleep} // Update state on change
            sx={{
              color: 'white', // Make the text color white
              backgroundColor: '#0f143c', // Match the dark theme background
            }}
          />
        </GradientBorder>
      </VuiBox>
    );
  };

  const PhoneInput = () => {
    const handlePhoneChange = (event) => {
      const input = event.target.value;
      const numericInput = input.replace(/\D/g, ''); // Filter out non-numeric characters
      setPhone(numericInput); // Update state with the filtered numeric input
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
            type="name" // Set input type to phone
            placeholder="Phone Number" // Placeholder text
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

  const WeightInput = () => {
    const handleWeightChange = (event) => {
      const input = event.target.value;
      const numericInput = input.replace(/\D/g, ''); // Filter out non-numeric characters
      setWeight(numericInput); // Update state with the filtered numeric input
    };

    return (
      <VuiBox mb={2}>
        {/* Label for the input */}
        <VuiBox mb={1} ml={0.5}>
          <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
            Weight (in kg)
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
            type="name" // Set input type to number
            placeholder="Weight in kg" // Placeholder text
            value={weight} // Bind input to state
            onChange={handleWeightChange} // Update state on change
            sx={{
              color: 'white', // Make the text color white
              backgroundColor: '#0f143c', // Match the dark theme background
            }}
          />
        </GradientBorder>
      </VuiBox>
    );
  };

  const HeightInput = () => {
    const handleHeightChange = (event) => {
      const input = event.target.value;
      const numericInput = input.replace(/\D/g, ''); // Filter out non-numeric characters
      setHeight(numericInput); // Update state with the filtered numeric input
    };

    return (
      <VuiBox mb={2}>
        {/* Label for the input */}
        <VuiBox mb={1} ml={0.5}>
          <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
            Height (in cm)
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
            type="name" // Set input type to number
            placeholder="Height in cm" // Placeholder text
            value={height} // Bind input to state
            onChange={handleHeightChange} // Update state on change
            sx={{
              color: 'white', // Make the text color white
              backgroundColor: '#0f143c', // Match the dark theme background
            }}
          />
        </GradientBorder>
      </VuiBox>
    );
  };

  const Birthyear = () => {
    const handleBirthYearChange = (event) => {
      const input = event.target.value;
      const numericInput = input.replace(/\D/g, ''); // Filter out non-numeric characters
      setBirthdate(numericInput); // Update state with the filtered numeric input
    };

    return (
      <VuiBox mb={2}>
        {/* Label for the input */}
        <VuiBox mb={1} ml={0.5}>
          <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
           
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
            type="name" // Set input type to number
            placeholder="Birth Year" // Placeholder text
            value={birthdate} // Use birthdate here
            onChange={handleBirthYearChange} // Update state on change
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
      title="Welcome!"
      color="white"
      description="Join us for personalized health tips, wellness resources, and more. Sign up now!"
      image={bgSignIn}
      premotto="YOUR HEALTH LIKE AN ADMIN"
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
            Register Today
          </VuiTypography>
          <Stack mb="25px" justifyContent="center" alignItems="center" direction="row" spacing={2}>
            
            <GradientBorder borderRadius="xl">
             
                <IconButton
                  transition="all .25s ease"
                  justify="center"
                  align="center"
                  bg="rgb(19,21,54)"
                  borderradius="15px"
                  sx={({ palette: { secondary }, borders: { borderRadius } }) => ({
                    borderRadius: borderRadius.xl,
                    padding: "30px",
                    backgroundColor: secondary.focus,
                    "&:hover": {
                      backgroundColor: rgba(secondary.focus, 0.9),
                    },
                  })}
                >
                  <Icon
                    as={FaUser}
                    w="70px"
                    h="70px"
                    sx={({ palette: { white } }) => ({
                      color: white.focus,
                    })}
                  />
                </IconButton>
              
            </GradientBorder>
            
            
          </Stack>
          <VuiTypography
            color="text"
            fontWeight="bold"
            textAlign="center"
            mb="14px"
            sx={({ typography: { size } }) => ({ fontSize: size.lg })}
          >
            
          </VuiTypography>
          
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Name
              </VuiTypography>
            </VuiBox>
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
               type="name"
               placeholder="Your full name..."
               value={name}
               onChange={(e) => setName(e.target.value)}
               sx={({ typography: { size } }) => ({
                 fontSize: size.sm,
               })}
              />
            </GradientBorder>
          </VuiBox>
         
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Email
              </VuiTypography>
            </VuiBox>
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
                type="email"
                placeholder="Your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
              />
            </GradientBorder>
          </VuiBox>
          
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Password
              </VuiTypography>
            </VuiBox>
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
                type="password"
                placeholder="Your password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Verify Password
              </VuiTypography>
            </VuiBox>
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
                type="password"
                placeholder="Re-enter your password..."
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
              />
            </GradientBorder>
          </VuiBox>

          <VuiBox mb={0}>
          <VuiBox mb={0} ml={0.5}>
          <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Gender
              </VuiTypography>
          <GenderSelection gender={gender} setGender={setGender}></GenderSelection>
          </VuiBox>
          </VuiBox>
          <VuiBox mb={2}>
          <VuiBox mb={2} ml={0.5}>
          <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Birthdate
              </VuiTypography>
          <Birthyear></Birthyear>
          </VuiBox>
          </VuiBox>
          
         <PhoneInput></PhoneInput>
         <WeightInput></WeightInput>
         <HeightInput></HeightInput>
         <SleepInput></SleepInput>

         <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Previous Medical Conditions
              </VuiTypography>
            </VuiBox>
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
              <Select
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Medical History' }}
                sx={dropdownStyle}
                fullWidth
              >
                <MenuItem value="" disabled>
                  Any Chronic Conditions?
                </MenuItem>
                <MenuItem value="None">None</MenuItem>
                <MenuItem value="Diabetes">Diabetes</MenuItem>
                <MenuItem value="Hypertension">Hypertension</MenuItem>
                <MenuItem value="Asthma">Asthma</MenuItem>
                <MenuItem value="Arthritis">Arthritis</MenuItem>
              </Select>
            </GradientBorder>
          </VuiBox>

          {/* Current Medications */}
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Current Medications
              </VuiTypography>
            </VuiBox>
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
              <Select
                value={medications}
                onChange={(e) => setMedications(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Medications' }}
                sx={dropdownStyle}
                fullWidth
              >
                <MenuItem value="" disabled>
                  Select your medication
                </MenuItem>
                <MenuItem value="None">None</MenuItem>
                <MenuItem value="Metformin">Metformin</MenuItem>
                <MenuItem value="Amlodipine">Amlodipine</MenuItem>
                <MenuItem value="Insulin">Insulin</MenuItem>
              </Select>
            </GradientBorder>
          </VuiBox>

          {/* Allergies */}
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Allergies
              </VuiTypography>
            </VuiBox>
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
              <Select
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Allergies' }}
                sx={dropdownStyle}
                fullWidth
              >
                <MenuItem value="" disabled>
                  Select your allergies
                </MenuItem>
                <MenuItem value="None">None</MenuItem>
                <MenuItem value="Peanuts">Peanuts</MenuItem>
                <MenuItem value="Other Food Allergies">Other Food Allergies</MenuItem>
                <MenuItem value="Penicillin">Penicillin</MenuItem>
                <MenuItem value="Dust">Dust</MenuItem>
              </Select>
            </GradientBorder>
          </VuiBox>


          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Dietary Goals
              </VuiTypography>
            </VuiBox>
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
              <Select
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Dietary' }}
                sx={dropdownStyle}
                fullWidth
              >
                <MenuItem value="" disabled>
                  What are your dietary goals?
                </MenuItem>
                <MenuItem value="None">None</MenuItem>
                <MenuItem value="Weight Loss">Weight Loss</MenuItem>
                <MenuItem value="Muscle Gain">Muscle Gain</MenuItem>
                <MenuItem value="Overall Health and Wellness">Overall Health and Wellness</MenuItem>
                <MenuItem value="Special Dietary Needs">Special Dietary Needs</MenuItem>
              </Select>
            </GradientBorder>
          </VuiBox>
          
         
          <VuiBox mt={4} mb={1}>
            <VuiButton color="info" fullWidth onClick={handleSignUp}>
              SIGN UP
            </VuiButton>
          </VuiBox>
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="button" color="text" fontWeight="regular">
              Already have an account?{" "}
              <VuiTypography
                component={Link}
                to="/authentication/sign-in"
                variant="button"
                color="white"
                fontWeight="medium"
              >
                Sign in
              </VuiTypography>
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </GradientBorder>
    </CoverLayout>
  );
}

export default SignUp;
