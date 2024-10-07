
import { useState } from "react";
import { Link } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../../../firebase/auth";  // Import Firebase sign-in method

//   components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signInImage.png";
import bgSignIn2 from "assets/images/heartback.jpeg"

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSignIn = async () => {
    setError(null);  // Reset any previous errors
    setLoginSuccess(false);  // Reset login success state

    try {
      // Call Firebase auth function
      await doSignInWithEmailAndPassword(email, password);
      setLoginSuccess(true);  // Set login success message
      window.location.href = "/dashboard";

    } catch (error) {
      setError(error.message);  // Set error message
    }
  };

  return (
    <CoverLayout
      title="Nice to see you!"
      color="white"
      description="Enter your email and password to sign in"
      premotto="YOUR HEALTH LIKE AN ADMIN"
      motto="VIDA SPHERA"
      image={bgSignIn2}
    >
      <VuiBox component="form" role="form">
        {/* Email Input */}
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Email
            </VuiTypography>
          </VuiBox>
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
            <VuiInput
              type="email"
              placeholder="Your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // Capture email input
              fontWeight="500"
            />
          </GradientBorder>
        </VuiBox>

        {/* Password Input */}
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
              onChange={(e) => setPassword(e.target.value)}  // Capture password input
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}
            />
          </GradientBorder>
        </VuiBox>


        

       
        {error && (
          <VuiTypography color="error" fontWeight="bold" textAlign="center" mt={2}>
            {error}
          </VuiTypography>
        )}
        {loginSuccess && (
          <VuiTypography color="success" fontWeight="bold" textAlign="center" mt={2}>
            Login successful!
          </VuiTypography>
        )}

        {/* Sign In Button */}
        <VuiBox mt={4} mb={1}>
          <VuiButton color="info" fullWidth onClick={handleSignIn}>
            SIGN IN
          </VuiButton>
        </VuiBox>

        {/* Redirect to Sign Up */}
        <VuiBox mt={3} textAlign="center">
          <VuiTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <VuiTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="white"
              fontWeight="medium"
            >
              Sign up
            </VuiTypography>
          </VuiTypography>
        </VuiBox>
      </VuiBox>
    </CoverLayout>
  );
}

export default SignIn;