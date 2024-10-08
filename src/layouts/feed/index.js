import { useState, useEffect } from "react";
import { Card, Grid, Icon } from "@mui/material";
import { getAuth } from "firebase/auth";
import { collection, getFirestore, getDoc, doc, query, where, getDocs } from "firebase/firestore";

import VuiBox from "components/VuiBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import VuiTypography from "components/VuiTypography";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import articleimage from 'assets/images/avatar1.png';

import { FaNewspaper } from "react-icons/fa6";

// Firestore setup
const db = getFirestore();

// Reusable component to display a section of articles with a scrollable row
const ArticleSection = ({ title, description, articles }) => (
  <Grid item xs={12} xl={12}>
    <Card>
      <VuiBox display="flex" flexDirection="column" height="100%">
        <VuiBox display="flex" flexDirection="column" mb="24px">
          <VuiTypography color="white" variant="lg" fontWeight="bold" mb="6px">
            {title}
          </VuiTypography>
          <VuiTypography color="text" variant="button" fontWeight="regular">
            {description}
          </VuiTypography>
        </VuiBox>
        <HorizontalScrollContainer>
          {articles.map((article, index) => (
            <DefaultProjectCard
              key={index}
              image={article.Image || articleimage}
              label=""
              title={article.Title}
              description={article.Description}
              action={{
                type: external,
                route: article.Link,
                color: "white",
                label: "READ MORE",
              }}
              authors={[]}
            />
          ))}
        </HorizontalScrollContainer>
      </VuiBox>
    </Card>
  </Grid>
);

// Horizontal scrolling wrapper for article rows
const HorizontalScrollContainer = ({ children }) => (
  <div style={{ display: 'flex', overflowX: 'auto', gap: '20px', padding: '10px' }}>
    {children}
  </div>
);

const NewsFeed = () => {
  const [dietaryArticles, setDietaryArticles] = useState([]);
  const [medicalArticles, setMedicalArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
    const fetchArticlesForUser = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userDoc = await getUserDoc(user.email);
        if (userDoc) {
          const { medicalHistory, dietary } = userDoc;
          await Promise.all([
            fetchArticles("Dietary", dietary, setDietaryArticles),
            fetchArticles("Chronical", medicalHistory, setMedicalArticles),
          ]);
        }
      }
      // Fetch all available articles
      await fetchAllArticles();
    };

    fetchArticlesForUser();
  }, []);

  // Utility function to fetch user document from Firestore
  const getUserDoc = async (email) => {
    const userDoc = await getDoc(doc(db, "users", email));
    return userDoc.exists() ? userDoc.data() : null;
  };

  // Fetch personalized articles based on the field and user preference
  const fetchArticles = async (field, preference, setState) => {
    try {
      let articleQuery = query(collection(db, "articles"), where("Field", "==", field));
      if (preference && preference !== "None" && preference !== "Overall Health and Wellness") {
        articleQuery = query(articleQuery, where("Personalized", "==", preference));
      }
      const snapshot = await getDocs(articleQuery);
      setState(snapshot.docs.map(doc => doc.data()));
    } catch (error) {
      console.error(`Error fetching ${field} articles:`, error);
    }
  };

  // Fetch all available articles
  const fetchAllArticles = async () => {
    try {
      const allQuery = query(collection(db, "articles"));
      const allSnapshot = await getDocs(allQuery);
      setAllArticles(allSnapshot.docs.map(doc => doc.data()));
    } catch (error) {
      console.error("Error fetching all articles:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3} mb="30px">
          
          <VuiTypography
            color="white"
            variant="h1"
            fontWeight="normal"
            mb="12px"
          >
          Your Personal News Flow
          </VuiTypography>
            {/* Dietary News Section */}
            <ArticleSection
              title="Latest Diet and Nutrition News"
              description="Articles tailored to your preferences."
              articles={dietaryArticles}
            />

            {/* Medical Conditions News Section */}
            <ArticleSection
              title="Latest Articles on Medical Conditions"
              description="Articles tailored to your preferences."
              articles={medicalArticles}
            />

            {/* All Available Health Articles */}
            <ArticleSection
              title="All Available Health Articles"
              description="All of our articles."
              articles={allArticles}
            />
          </Grid>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
};

export default NewsFeed;