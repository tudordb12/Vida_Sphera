// React imports
import React, { useEffect, useState } from "react";
// Firebase Firestore and Auth imports
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, query, collection, where, getDocs } from "firebase/firestore"; // Firestore imports
// Firebase configuration

// MUI Material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Custom components (from your existing project)
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import ProfileInfoCard from "layouts/profile/ProfileInfoCard";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/profile/components/Header";
import Footer from "examples/Footer";
import Icon from "@mui/material/Icon";
// Images
import team1 from "assets/images/avatar1.png";
import team2 from "assets/images/avatar2.png";
import team3 from "assets/images/avatar3.png";
import team4 from "assets/images/avatar4.png";
import profile1 from "assets/images/profile-1.png";
import profile2 from "assets/images/profile-2.png";
import profile3 from "assets/images/profile-3.png";

import Welcome from "../profile/components/Welcome/index";
import MainProfile from "./components/MainProfile";
import axios from 'axios';

function Overview() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [geoInfo, setGeoInfo] = useState({});

  useEffect(() => {
    const getVisitorIPAndFetchInfo = async () => {
      try {
        // First, get the visitor's IP address
        const response = await fetch('https://api.ipify.org');
        const ip = await response.text();
        // Now use that IP to fetch location info
        const locationResponse = await axios.get(`https://ipwho.is/${ip}`);
        setGeoInfo(locationResponse.data);  // Update state with geo info
      } catch (error) {
        console.error('Failed to fetch IP or location info', error);
      }
    };
  
    getVisitorIPAndFetchInfo();  // Call the combined function
  }, []);

  // Fetch user data from Firestore when authenticated
  useEffect(() => {
    const auth = getAuth(); // Initialize Firebase Auth
    const db = getFirestore(); // Initialize Firestore

    const fetchUserData = async (userEmail) => {
      const userDocRef = doc(db, "users", userEmail);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setUserInfo(userDoc.data());
      } else {
        console.error("No such user!");
      }

      setLoading(false);
    };

    const fetchDoctors = async (city) => {
      const db = getFirestore();
      const doctorsQuery = query(collection(db, "doctors"), where("City", "==", city));
      const querySnapshot = await getDocs(doctorsQuery);
      const doctorsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDoctors(doctorsList);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.email); // Fetch Firestore document using user's email as document ID
        // Fetch doctors if geoInfo.city is available
        if (geoInfo.city) {
          fetchDoctors(geoInfo.city); // Fetch doctors based on user's city
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [geoInfo.city]); // Add geoInfo.city as a dependency to re-fetch when it changes

  if (loading) {
    return <div>Loading...</div>; // Show loading while fetching data
  }

  if (!userInfo) {
    return <div>No user information available</div>; // Handle case where no user data is found
  }
  

  return (
    <DashboardLayout>
      <Header />
      <VuiBox mt={5} mb={3}>
        <Grid
          container
          spacing={3}
          sx={({ breakpoints }) => ({
            [breakpoints.only("xl")]: {
              gridTemplateColumns: "repeat(2, 1fr)",
            },
          })}
        >
          <Grid
            item
            xs={12}
            xl={4}
            xxl={3}
            sx={({ breakpoints }) => ({
              minHeight: "400px",
              [breakpoints.only("xl")]: {
                gridArea: "1 / 1 / 2 / 2",
              },
            })}
          >
            <Welcome />
          </Grid>
          <Grid
            item
            xs={12}
            xl={5}
            xxl={6}
            sx={({ breakpoints }) => ({
              [breakpoints.only("xl")]: {
                gridArea: "2 / 1 / 3 / 3",
              },
            })}
          >
            <MainProfile />
          </Grid>
          <Grid
            item
            xs={12}
            xl={3}
            xxl={3}
            sx={({ breakpoints }) => ({
              [breakpoints.only("xl")]: {
                gridArea: "1 / 2 / 2 / 3",
              },
            })}
          >
           
            <ProfileInfoCard
              title="Profile Information"
              description={`Hi, ${userInfo.name}. Here you can find all of your stored health and personal related data. `}
              
              info={{
                fullName: userInfo.name,
                mobile: userInfo.phone,
                email: userInfo.email,
                birthyear: userInfo.birthdate,
                country: geoInfo.country || 'Loading...', // Using geoInfo for country
                city: geoInfo.city || 'Loading...', // You can replace this with user location if available
                height: `${userInfo.height} cm`,
                weight: `${userInfo.weight} kg`,
                allergies: userInfo.allergies,
                medications: userInfo.medications,
                dietaryPreferences: userInfo.dietary,
              }}
              social={[]}
            />

          </Grid>
        </Grid>
      </VuiBox>
      <Grid container spacing={3} mb="30px">
        
        <Grid item xs={12} xl={9}>
          <Card>
            <VuiBox display="flex" flexDirection="column" height="100%">
              <VuiBox display="flex" flexDirection="column" mb="24px">
                <VuiTypography color="white" variant="lg" fontWeight="bold" mb="6px">
                  Available VIDA SPHERA registered Professionals in your area
                </VuiTypography>
                <VuiTypography color="text" variant="button" fontWeight="regular">
                  Doctor Recommandations
                </VuiTypography>
              </VuiBox>
              <Grid container spacing={3}>
                {doctors.length > 0 ? (
                  doctors.map((doctor) => (
                    <Grid item xs={12} md={6} xl={4} key={doctor.id}>
                      <DefaultProjectCard
                        image={doctor.Image} // Use the image URL from the doctor document
                        label=""
                        title={doctor.Name} // Display doctor's name
                        description={doctor.Field} // Display doctor's field
                        action={{
                          type: "internal",
                          route: "",
                          color: "white",
                          label: doctor.Number, // Display phone number
                        }}
                      />
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <VuiTypography color="text" variant="button" fontWeight="regular">
                      No doctors available in your area.
                    </VuiTypography>
                  </Grid>
                )}
              </Grid>
            </VuiBox>
          </Card>
        </Grid>
      </Grid>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;